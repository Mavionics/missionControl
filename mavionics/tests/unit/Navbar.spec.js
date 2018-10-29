import Vuex from "vuex"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import { expect } from 'chai'
import Navbar from '@/components/Navbar.vue'

import Router from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

const stubs = 
{
  RouterLink: RouterLinkStub
}

function createStore(name)
{
  return new Vuex.Store({
    getters:{
      currentUser: ()=>name,
      isAuthenticated: ()=>name != null
    }
  })
}

function createMount(store, props)
{
  return shallowMount(Navbar, { 
    store, 
    localVue,
    stubs, 
    propsData: props
  })
}

let store = createStore("Ana");

describe('Navbar.vue', () => {
  it("Hide logout if not logged in", () => {
    let store = createStore();
    const wrapper = createMount(store);
    expect(wrapper.find("router-link-stub[name='Logout']").isVisible()).to.be.false
  }),
  
  it("show logout if logged in", () => {
    const wrapper = createMount(store);
    expect(wrapper.find("router-link-stub[name='Logout']").isVisible()).to.be.true
  }),

  it("Hide controlroom if not logged in", () => {
    let store = createStore();
    const wrapper = createMount(store);
    expect(wrapper.find("router-link-stub[name='ControlRoom']").isVisible()).to.be.false
  }),
  
  it("show controlroom if logged in", () => {
    const wrapper = createMount(store);
    expect(wrapper.find("router-link-stub[name='ControlRoom']").isVisible()).to.be.true
  }),

  it('hide logo based on prop', () => {
    const wrapper = createMount(store, { showBrand : false });
    expect(wrapper.contains('#navbar-brand-img')).to.equal(false)
  }),

  it('show logo based on prop', () => {
    const wrapper = createMount(store, { showBrand : true });
    expect(wrapper.contains('#navbar-brand-img')).to.equal(true)
  })
})
