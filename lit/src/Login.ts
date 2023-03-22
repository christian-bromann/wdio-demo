import { LitElement, css, unsafeCSS, html } from 'lit'
import { customElement } from 'lit/decorators.js'

// @ts-expect-error css imports are not typed
import loginCSS from './Login.css' assert { type: 'css' }
import { login } from './api.js'

async function importCSS (url: string) {
    const res = await fetch(url)
    return unsafeCSS(await res.text())
}
const tb = await importCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css')
const ionicons = await importCSS('https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css')

@customElement('app-login')
export class Login extends LitElement {
    #email = ''
    #password = ''
    #isSubmitValid?: boolean

    static styles = [
        tb,
        ionicons,
        unsafeCSS(loginCSS)
    ]
    
    async #onSubmitHandler (ev) {
        ev.preventDefault()

        if (!this.#email || !this.#password) {
            this.#isSubmitValid = false
            return this.requestUpdate()
        }

        const res = await login({ email: this.#email, password: this.#password })
        this.#isSubmitValid = !Boolean(res.error)
        this.requestUpdate()
    }

    #handleInputChange (ev) {
        ev.preventDefault()
        const target = ev.target
        if (target.name === 'email') this.#email = target.value
        if (target.name === 'password') this.#password = target.value
    }

    render() {
        return html`
        <div class="login-dark">
            <form @submit=${this.#onSubmitHandler.bind(this)} class=${this.#isSubmitValid ? 'was-validated' : ''}>
                <h2 class="sr-only">Login Form</h2>
                <div class="illustration">
                    <i class="icon ion-ios-locked-outline"></i>
                </div>
                <div class="form-group">
                    <input
                        class=${'form-control' + (typeof this.#isSubmitValid === 'boolean' && !this.#isSubmitValid ? ' is-invalid' : '')}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value=${this.#email}
                        @change=${this.#handleInputChange.bind(this)}
                    />
                </div>
                <div class="form-group">
                    <input
                        class=${'form-control' + (typeof this.#isSubmitValid === 'boolean' && !this.#isSubmitValid ? ' is-invalid' : '')}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value=${this.#password}
                        @change=${this.#handleInputChange.bind(this)}
                    />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Log In</button>
                </div>
                <a class="forgot" href="#">Forgot your email or password?</a>
            </form>
        </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'app-login': Login
    }
}