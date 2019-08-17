import { shallowMount, createLocalVue } from "@vue/test-utils";
import { expect } from "chai";
import Navbar from "@/components/Navbar.vue";
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

function createMount() {
  return shallowMount(Navbar, {
    localVue,
    stubs: ["font-awesome-icon"]
  });
}

describe("Navbar.vue", () => {
  it("Hide user menu if logged in", () => {
    const wrapper = createMount();
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper.find("[name='User']").exists()).to.be.false;
    expect(wrapper.find("[name='Logout']").exists()).to.be.false;
  })


  it("Show user menu if logged in", () => {
    const wrapper = createMount();
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find("[name='User']").exists()).to.be.true;
    expect(wrapper.find("[name='Logout']").exists()).to.be.true;
  })

  it("Hide controlroom if not logged in", () => {
    const wrapper = createMount();
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper.vm.isAuthenticated).to.be.false;
    expect(wrapper.exists("[name=ControlRoom]")).to.be.true;
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
