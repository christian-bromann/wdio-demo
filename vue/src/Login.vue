<script setup lang="ts">
import { ref } from 'vue'
import { login } from './api.js'

let email: string
let password: string
let isSubmitValid = ref<boolean | undefined>(undefined)

async function onSubmitHandler (ev) {
    ev.preventDefault()

    if (!email || !password) {
        isSubmitValid.value = false
        return
    }

    const res = await login({ email: email, password: password })
    console.log(123, email, password, !Boolean(res.error))
    isSubmitValid.value = !Boolean(res.error)
}

function handleInputChange (ev) {
    ev.preventDefault()
    const target = ev.target
    if (target.name === 'email') email = target.value
    if (target.name === 'password') password = target.value
}
</script>

<template>
    <div id="root" class="login-dark">
        <form
            @submit="onSubmitHandler"
            v-bind:class="{'was-validated': typeof isSubmitValid === 'boolean' && isSubmitValid}"
        >
            <h2 class="sr-only">Login Form</h2>
            <div class="illustration">
                <i class="icon ion-ios-locked-outline"></i>
            </div>
            <div class="form-group">
                <input
                    class="form-control"
                    v-bind:class="{'is-invalid': typeof isSubmitValid === 'boolean' && !isSubmitValid}"
                    type="email"
                    name="email"
                    placeholder="Email"
                    :value="email"
                    @change="handleInputChange"
                />
            </div>
            <div class="form-group">
                <input
                    class="form-control"
                    v-bind:class="{'is-invalid': typeof isSubmitValid === 'boolean' && !isSubmitValid}"
                    type="password"
                    name="password"
                    placeholder="Password"
                    :value="password"
                    @change="handleInputChange"
                />
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block">Log In</button>
            </div>
            <a class="forgot" href="#">Forgot your email or password?</a>
        </form>
    </div>
</template>

<style scoped>
@import url("./Login.css");
</style>
