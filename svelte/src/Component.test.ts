
import { $, expect } from '@wdio/globals'
import { render, fireEvent } from '@testing-library/svelte'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import ExampleComponent from './Component.svelte'
import './Component.css'

describe('Svelte Component Testing', () => {
    
    it('should test component with Testing Library', async () => {
        const { getByText } = render(ExampleComponent)

        const component = getByText(/count is 0/i)
        expect(component).toBeInTheDocument()

        await fireEvent.click(component)
        await fireEvent.click(component)

        expect(getByText(/count is 2/i)).toBeInTheDocument()
    })
    

    it('should test component with WebdriverIO', async () => {
        render(ExampleComponent)

        const component = await $('button*=count is')
        await expect(component).toBePresent()
        await expect(component).toHaveText('count is 0')

        await component.click()
        await component.click()

        await expect(component).toHaveText('count is 2')
    })
})
