import React, { useState, type ChangeEvent, type FormEvent } from 'react'

import './Login.css'
import { login, type Credentials } from './api.js'

export default function LoginComponent() {
    const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' })
    const [submitValid, setSubmitValid] = useState<boolean | undefined>()
    
    const onSubmitHandler = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        
        if (!credentials.email || !credentials.password) {
            return setSubmitValid(false)
        }

        const res = await login(credentials)
        setSubmitValid(!Boolean(res.error))
    }

    function handleInputChange (ev: ChangeEvent<HTMLInputElement>) {
        ev.preventDefault()
        const target = ev.target
        setCredentials({
            ...credentials,
            [target.name]: target.value
        })
    }

    return (
        <div className="login-dark">
            <form onSubmit={onSubmitHandler} className={submitValid ? 'was-validated' : ''}>
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration">
                    <i className="icon ion-ios-locked-outline"></i>
                </div>
                <div className="form-group">
                    <input
                        className={'form-control' + (typeof submitValid === 'boolean' && !submitValid ? ' is-invalid' : '')}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        className={'form-control' + (typeof submitValid === 'boolean' && !submitValid ? ' is-invalid' : '')}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block">Log In</button>
                </div>
                <a className="forgot" href="#">Forgot your email or password?</a>
            </form>
        </div>
    )
}
