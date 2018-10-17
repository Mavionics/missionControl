import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'

describe('Navbar.vue', () => {
  it('hide logo based on prop', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Navbar, {
      propsData: { showBrand : false }
    })
    expect(wrapper.contains('#navbar-brand-img')).to.equal(false)
  }),
  it('show logo based on prop', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Navbar, {
      propsData: { showBrand : true }
    })
    expect(wrapper.contains('#navbar-brand-img')).to.equal(true)
  })
})
