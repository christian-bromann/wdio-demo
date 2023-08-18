import { Component, State, h } from '@stencil/core'
import { login } from './api.js'

@Component({
    tag: 'app-login',
    styleUrl: 'Login.css',
    shadow: true
})
export class AppLogin {
    @State() email: string
    @State() password: string
    @State() isSubmitValid: boolean | undefined

    async onSubmitHandler (ev) {
        ev.preventDefault()
    
        if (!this.email || !this.password) {
            this.isSubmitValid = false
            return
        }
    
        const res = await login({ email: this.email, password: this.password })
        this.isSubmitValid = !Boolean(res.error)
    }

    handleInputChange (ev) {
        ev.preventDefault()
        const target = ev.target
        if (target.name === 'email') this.email = target.value
        if (target.name === 'password') this.password = target.value
    }
  
    render() {
        return (
            <div id="root" class="login-dark">
                <form
                    onSubmit={this.onSubmitHandler.bind(this)}
                    class={typeof this.isSubmitValid === 'boolean' && this.isSubmitValid ? 'was-validated' : ''}
                >
                    <h2 class="sr-only">Login Form</h2>
                    <div class="illustration">
                        <i class="icon ion-ios-locked-outline"></i>
                    </div>
                    <div class="form-group">
                        <input
                            class={`form-control ${typeof this.isSubmitValid === 'boolean' && !this.isSubmitValid ? 'is-invalid' : ''}`}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.email}
                            onChange={this.handleInputChange.bind(this)}
                        />
                    </div>
                    <div class="form-group">
                        <input
                            class={`form-control ${typeof this.isSubmitValid === 'boolean' && !this.isSubmitValid ? 'is-invalid' : ''}`}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.password}
                            onChange={this.handleInputChange.bind(this)}
                        />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block">Log In</button>
                    </div>
                    <a class="forgot" href="#">Forgot your email or password?</a>
                </form>
            </div>
        )
    }
}
