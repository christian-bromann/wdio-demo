
import { $, expect } from '@wdio/globals'
import { render } from '@testing-library/svelte'
import { fn, mocked } from '@wdio/browser-runner'

import LoginComponent from './Login.svelte'
import './Login.css'

describe('LoginComponent with mocked fetch', () => {
    before(() => { window.fetch = fn() })

    it('does not log in if input is empty', async () => {
        render(LoginComponent)
        await $('aria/Log In').click()
        await expect($('aria/Email')).toHaveElementClass('is-invalid')
        await expect($('aria/Password')).toHaveElementClass('is-invalid')
    })

    it('failed log in with wrong credentials', async () => {
        render(LoginComponent)
        mocked(window.fetch).mockResolvedValue({ json: fn().mockResolvedValue({ error: 'Invalid credentials' }) } as any)

        await $('aria/Email').setValue('invalid@email.com')
        await $('aria/Password').setValue('wrong-password')
        await $('aria/Log In').click()
        await expect($('aria/Email')).toHaveElementClass('is-invalid')
        await expect($('aria/Password')).toHaveElementClass('is-invalid')
    })

    it('can log in with valid credentials', async () => {
        render(LoginComponent)
        mocked(window.fetch).mockResolvedValue({ json: fn().mockResolvedValue({ success: true }) } as any)

        await $('aria/Email').setValue('eve.holt@reqres.in')
        await $('aria/Password').setValue('correct-password')
        await $('aria/Log In').click()
        await expect($('aria/Email')).not.toHaveElementClass('is-invalid')
        await expect($('aria/Password')).not.toHaveElementClass('is-invalid')
    })
})
