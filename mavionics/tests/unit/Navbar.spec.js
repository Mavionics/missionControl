import { shallowMount, createLocalVue } from "@vue/test-utils";
import { expect } from "chai";
import Navbar from "@/components/Navbar.vue";
import BootstrapVue from 'bootstrap-vue'
import Router from "vue-router";

const localVue = createLocalVue();
localVue.use(Router);
localVue.use(BootstrapVue);

function createMount() {
  return shallowMount(Navbar, {
    localVue,
    stubs: ["router-link", "font-awesome-icon"]
  });
}

describe("Navbar.vue", () => {
  it("Hide logout if not logged in", () => {
    const wrapper = createMount();
    expect(wrapper.find("[name='Logout']").isVisible()).to.be.false;
  })

  it("Show logout if logged in", () => {
    const wrapper = createMount();
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find("[name='Logout']").isVisible()).to.be.true;
  })

  it("Hide controlroom if not logged in", () => {
    const wrapper = createMount();
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper.find("[name='ControlRoom']").isVisible()).to.be.false;
  })

  it("Show controlroom if logged in", () => {
    const wrapper = createMount();
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find("[name='ControlRoom']").isVisible()).to.be.true;
  })

  it("Hide logo based on prop", () => {
    const wrapper = createMount();
    wrapper.setProps({ showBrand: false });
    expect(wrapper.contains("#navbar-brand-img")).to.equal(false);
  })

  it("Show logo based on prop", () => {
    const wrapper = createMount();
    wrapper.setProps({ showBrand: true });
    expect(wrapper.contains("#navbar-brand-img")).to.equal(true);
  });
});
