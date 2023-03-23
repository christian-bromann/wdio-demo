<script lang="ts">
import { login } from './api.js'

let email = ''
let password = ''
let isSubmitValid

async function onSubmitHandler (ev) {
    ev.preventDefault()

    if (!email || !password) {
        isSubmitValid = false
        return
    }

    const res = await login({ email, password })
    isSubmitValid = !Boolean(res.error)
}

function handleInputChange (ev) {
    ev.preventDefault()
    const target = ev.target
    if (target.name === 'email') email = target.value
    if (target.name === 'password') password = target.value
}
</script>

<main id="root" class="login-dark">
    <form on:submit={onSubmitHandler} class={typeof isSubmitValid === 'boolean' && isSubmitValid ? 'was-validated' : ''}>
        <h2 class="sr-only">Login Form</h2>
        <div class="illustration">
            <i class="icon ion-ios-locked-outline"></i>
        </div>
        <div class="form-group">
            <input
                class={'form-control' + (typeof isSubmitValid === 'boolean' && !isSubmitValid ? ' is-invalid' : '')}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                on:change={handleInputChange}
            />
        </div>
        <div class="form-group">
            <input
                class={'form-control' + (typeof isSubmitValid === 'boolean' && !isSubmitValid ? ' is-invalid' : '')}
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                on:change={handleInputChange}
            />
        </div>
        <div class="form-group">
            <button class="btn btn-primary btn-block">Log In</button>
        </div>
        <a class="forgot" href="#">Forgot your email or password?</a>
    </form>
</main>

<style>
@import url("./Login.css");
</style>
