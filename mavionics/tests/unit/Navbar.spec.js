import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import { expect } from "chai";
import Navbar from "@/components/Navbar.vue";

import Router from "vue-router";

const localVue = createLocalVue();
localVue.use(Router);

const stubs = {
  RouterLink: RouterLinkStub
};

function createMount() {
  return shallowMount(Navbar, {
    localVue,
    stubs
  });
}

describe("Navbar.vue", () => {
  it("Hide logout if not logged in", () => {
    const wrapper = createMount();
    expect(wrapper.find("router-link-stub[name='Logout']").isVisible()).to.be
      .false;
  }),
    it("show logout if logged in", () => {
      const wrapper = createMount();
      wrapper.setProps({ isAuthenticated: true });
      expect(wrapper.find("router-link-stub[name='Logout']").isVisible()).to.be
        .true;
    }),
    it("Hide controlroom if not logged in", () => {
      const wrapper = createMount();
      expect(wrapper.find("router-link-stub[name='ControlRoom']").isVisible())
        .to.be.false;
    }),
    it("show controlroom if logged in", () => {
      const wrapper = createMount();
      wrapper.setProps({ isAuthenticated: true });
      expect(wrapper.find("router-link-stub[name='ControlRoom']").isVisible())
        .to.be.true;
    }),
    it("hide logo based on prop", () => {
      const wrapper = createMount();
      wrapper.setProps({ showBrand: false });
      expect(wrapper.contains("#navbar-brand-img")).to.equal(false);
    }),
    it("show logo based on prop", () => {
      const wrapper = createMount();
      wrapper.setProps({ showBrand: true });
      expect(wrapper.contains("#navbar-brand-img")).to.equal(true);
    });
});
