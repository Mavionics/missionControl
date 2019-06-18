import VehicleList from "@/components/VehicleList";
import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import { expect } from "chai";
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("VehicleList.vue", () => {
  const timestamp = 1542049200;
  const vehicleData = [{
    name: "Fly-thing",
    owner: "c6pGDLQ7GNbNjBh5HGPYRq7X8B53",
    position: { latitude: 58, longitude: 15.2 },
    timestamp: { seconds: timestamp, nanoseconds: 0 },
    status: "online"
  }];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(VehicleList, {
      localVue,
      propsData: {
        vehicles: vehicleData
      },
      components: {
        "router-link": RouterLinkStub
      },
      stubs: ["AddVehicleForm", "b-modal", "b-button", "font-awesome-icon"],
      methods: {
        updateTime() {
          this.currentTime = timestamp;
        }
      }
    });
  });

  it("Loads", () => {
    expect(wrapper.find("[data-testid=vehicleList]").isVisible()).to.be.true;
  });

  it("Has correct name of vehicle", () => {
    expect(wrapper.find("[data-testid=vehicleName]").text()).to.equal(vehicleData[0].name);
  });

  it("Is live if timestamp is less than 10 seconds old", () => {
    wrapper.setData({ currentTime: timestamp + 9 });
    expect(wrapper.vm.isLive(vehicleData[0])).to.be.true;
    expect(wrapper.vm.getStatus(vehicleData[0])).to.eq("online");
    expect(wrapper.find("[data-testid=vehicleStatus]").text()).to.equal(
      "online"
    );
  });

  it("Is not live if timestamp is more than 10 seconds old", () => {
    wrapper.setData({ currentTime: timestamp + 11 });
    expect(wrapper.vm.isLive(vehicleData[0])).to.be.false;
    expect(wrapper.vm.getStatus(vehicleData[0])).to.eq("Offline");
    expect(wrapper.find("[data-testid=vehicleStatus]").text()).to.equal(
      "Offline"
    );
  });
});
