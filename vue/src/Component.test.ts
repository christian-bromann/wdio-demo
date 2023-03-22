
import { $, expect } from '@wdio/globals'
import { render, fireEvent } from '@testing-library/vue'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import ExampleComponent from './Component.vue'
import './Component.css'

describe('Vue Component Testing', () => {
    
    it('should test component with Testing Library', async () => {
        // The render method returns a collection of utilities to query your component.
        const { getByText } = render(ExampleComponent, {
            props: { msg: 'WebdriverIO Component Testing' }
        })

        const component = getByText(/count is 0/i)
        expect(component).toBeInTheDocument()

        await fireEvent.click(component)
        await fireEvent.click(component)

        expect(getByText(/count is 2/i)).toBeInTheDocument()
    })
    

    it('should test component with WebdriverIO', async () => {
        render(ExampleComponent, { props: { msg: 'WebdriverIO Component Testing' } })

        const component = await $('button*=count is')
        await expect(component).toBePresent()
        await expect(component).toHaveText('count is 0')

        await component.click()
        await component.click()

        await expect(component).toHaveText('count is 2')
    })
})
