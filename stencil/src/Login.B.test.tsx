import { h } from '@stencil/core'
import { $, expect } from '@wdio/globals'
import { fn, mocked } from '@wdio/browser-runner'
import { render } from '@wdio/browser-runner/stencil'

import { AppLogin } from './Login.js'

describe('LoginComponent with mocked fetch', () => {
    let component: WebdriverIO.Element

    before(() => { window.fetch = fn() })
    
    beforeEach(async () => {
        render({
            components: [AppLogin],
            template: () => <app-login />,
            autoApplyChanges: true
        })
        component = await $('>>> .login-dark')
    })

    it('does not log in if input is empty', async () => {
        await component.$('aria/Log In').click()
        await expect(component.$('aria/Email')).toHaveElementClass('is-invalid')
        await expect(component.$('aria/Password')).toHaveElementClass('is-invalid')
    })

    it('failed log in with wrong credentials', async () => {
        mocked(window.fetch).mockResolvedValue({
            json: fn().mockResolvedValue({ error: 'Invalid credentials' })
        } as any)

        await component.$('aria/Email').setValue('invalid@email.com')
        await component.$('aria/Password').setValue('wrong-password')
        await component.$('aria/Log In').click()
        await expect(component.$('aria/Email')).toHaveElementClass('is-invalid')
        await expect(component.$('aria/Password')).toHaveElementClass('is-invalid')
    })

    it('can log in with valid credentials', async () => {
        mocked(window.fetch).mockResolvedValue({ json: fn().mockResolvedValue({ success: true }) } as any)

        await component.$('aria/Email').setValue('eve.holt@reqres.in')
        await component.$('aria/Password').setValue('correct-password')
        await component.$('aria/Log In').click()
        await expect(component.$('aria/Email')).not.toHaveElementClass('is-invalid')
        await expect(component.$('aria/Password')).not.toHaveElementClass('is-invalid')
    })
})
