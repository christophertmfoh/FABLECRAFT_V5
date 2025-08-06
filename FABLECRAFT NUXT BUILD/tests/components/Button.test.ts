import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '~/components/atoms/Button.vue'

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary',
        size: 'md',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders with correct text when label is provided', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary',
        size: 'md',
        label: 'Test Button',
      },
    })

    expect(wrapper.text()).toContain('Test Button')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary',
        size: 'md',
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
