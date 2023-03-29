import React, { useState, useRef, type ChangeEvent, type FormEvent } from 'react'

import './Login.css'
import { login, type Credentials } from './api.js'

export default function LoginComponent() {
    const inputEmail = useRef<HTMLInputElement>()
    const inputPassword = useRef<HTMLInputElement>()
    const [submitValid, setSubmitValid] = useState<boolean>(false)
    
    const onSubmitHandler = async (ev: FormEvent<HTMLFormElement>) => {
        console.log('OK', inputEmail.current.value, inputPassword.current.value);
        
        ev.preventDefault()
        setSubmitValid(true)
        
        if (!inputEmail.current.value) {
            inputEmail.current.setCustomValidity('Missing Email')
        } 
        if (!inputPassword.current.value) {
            inputPassword.current.setCustomValidity('Missing Password')
        }
        if (!inputEmail.current.value || !inputPassword.current.value) {
            inputEmail.current.reportValidity()
            inputPassword.current.reportValidity()
            return
        }

        const res = await login({
            email: inputEmail.current.value,
            password: inputPassword.current.value
        })

        if (res.error) {
            inputEmail.current.setCustomValidity(res.error)
            inputPassword.current.setCustomValidity(res.error)
        }
        inputEmail.current.reportValidity()
        inputPassword.current.reportValidity()
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
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        ref={inputEmail}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        ref={inputPassword}
                    />
                </div>
                <div className="form-group">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={() => setSubmitValid(true)}
                    >
                        Log In
                    </button>
                </div>
                <a className="forgot" href="#">Forgot your email or password?</a>
            </form>
        </div>
    )
}
