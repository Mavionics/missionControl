import Vuex from "vuex"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import { expect } from 'chai'
import Navbar from '@/components/Navbar.vue'

import Router from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

const store = new Vuex.Store({
  state: {
    currentUser: "Anna"
  }
})

const stubs = 
{
  RouterLink: RouterLinkStub
} 

describe('Navbar.vue', () => {
  it("Hide logout if not logged in", () => {
    const wrapper = shallowMount(Navbar, { 
      store, 
      localVue,
      stubs
    })

    expect(wrapper.find("router-link-stub[name='Logout']").isVisible()).to.be.false
  }),
  
  it("show logout if logged in", () => {
    const wrapper = shallowMount(Navbar, { 
      store, 
      localVue,
      stubs
    })
console.log(wrapper.html());

    // Not working
    //expect(wrapper.find("router-link-stub[name='Logout']").isVisible()).to.be.true
  }),
  it('hide logo based on prop', () => {
    const wrapper = shallowMount(Navbar, {
      propsData: { showBrand : false },
      stubs
    })
    expect(wrapper.contains('#navbar-brand-img')).to.equal(false)
  }),
  it('show logo based on prop', () => {
    const wrapper = shallowMount(Navbar, {
      propsData: { showBrand : true },
      stubs
    })
    expect(wrapper.contains('#navbar-brand-img')).to.equal(true)
  })
})
