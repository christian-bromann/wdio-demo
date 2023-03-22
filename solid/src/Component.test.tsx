
import { expect, $ } from '@wdio/globals'
import { cleanup, render, screen, fireEvent } from 'solid-testing-library'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import ExampleComponent from './Component'

describe('Preact Component Tests', () => {
    
    afterEach(cleanup)

    it('should test component with Testing Library', async () => {
        render(() => <ExampleComponent />)
        const component = screen.getByText(/count is 0/i)
        expect(component).toBeInTheDocument()

        await fireEvent.click(component)
        await fireEvent.click(component)

        expect(screen.getByText(/count is 2/i)).toBeInTheDocument()
    })
    

    it('should test component with WebdriverIO', async () => {
        render(() => <ExampleComponent />)

        const component = await $('button*=count is')
        await expect(component).toBePresent()
        await expect(component).toHaveText('count is 0')

        await component.click()
        await component.click()

        await expect(component).toHaveText('count is 2')
    })
})
