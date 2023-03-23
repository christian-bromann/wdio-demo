import { createSignal } from 'solid-js'

import './Login.css'
import { login, type Credentials } from './api.js'

export default function LoginComponent () {
    const [credentials, setCredentials] = createSignal<Credentials>({ email: '', password: '' })
    const [submitValid, setSubmitValid] = createSignal<boolean | undefined>()
    
    const onSubmitHandler = async (ev) => {
        ev.preventDefault()
        
        console.log('YOO', credentials())
        
        if (!credentials().email || !credentials().password) {
            return setSubmitValid(false)
        }

        const res = await login(credentials())
        setSubmitValid(!Boolean(res.error))
    }

    function handleInputChange (ev) {
        ev.preventDefault()
        const target = ev.target
        setCredentials({
            ...credentials(),
            [target.name]: target.value
        })
    }

    return (
        <div class="login-dark">
            <form onSubmit={onSubmitHandler} class={typeof submitValid() === 'boolean' && submitValid() ? 'was-validated' : ''}>
                <h2 class="sr-only">Login Form</h2>
                <div class="illustration">
                    <i class="icon ion-ios-locked-outline"></i>
                </div>
                <div class="form-group">
                    <input
                        class={'form-control' + (typeof submitValid() === 'boolean' && !submitValid() ? ' is-invalid' : '')}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials().email}
                        onChange={handleInputChange}
                    />
                </div>
                <div class="form-group">
                    <input
                        class={'form-control' + (typeof submitValid() === 'boolean' && !submitValid() ? ' is-invalid' : '')}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials().password}
                        onChange={handleInputChange}
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
