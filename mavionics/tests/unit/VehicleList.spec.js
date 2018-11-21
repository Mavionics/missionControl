import VehicleList from "@/components/VehicleList"
import VehicleListItem from "@/components/VehicleListItem"
import { mount, RouterLinkStub } from "@vue/test-utils"
import { expect } from 'chai'

describe('VehicleList.vue', () => {
  const timestamp = 1542049200;
  const vehicleData = [{ "name": "Fly-thing", "owner": "c6pGDLQ7GNbNjBh5HGPYRq7X8B53", "position": { "_lat": 58, "_long": 15.2 }, "timestamp": { "seconds": timestamp, "nanoseconds": 0 } }];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(VehicleList,
      {
        propsData: {
          vehicles: vehicleData
        },
        components: {
          'router-link': RouterLinkStub
        },
        methods: {
          updateTime() {
            this.currentTime = timestamp;
          }
        }
      });
  });

  it("Loads", () => {
    expect(wrapper.find("table").isVisible()).to.be.true;
  })
})

describe('VehicleListItem.vue', () => {
  let vehicleData;
  let wrapper;
  const timestamp = 3000

  beforeEach(() => {
    vehicleData = { "name": "Fly-thing", "owner": "c6pGDLQ7GNbNjBh5HGPYRq7X8B53", "position": { "_lat": 58, "_long": 15.2 }, "timestamp": { "seconds": timestamp, "nanoseconds": 0 } };
    wrapper = mount(VehicleListItem,
      {
        propsData: {
          vehicle: vehicleData
        },
        components: {
          'router-link': RouterLinkStub
        },
        methods: {
          updateTime() {
            this.currentTime = timestamp;
          }
        }
      });
  });

  it("Loads", () => {
    expect(wrapper.find("tr").isVisible()).to.be.true;
  }),
  it("Has correct name of vehicle", ()=>{
    expect(wrapper.find('[data-testid=vehicleName]').text()).to.equal("Fly-thing");
  })
    it("Is live if timestamp is less than 10 seconds old", () => {
      wrapper.setData({ currentTime: 3000 + 9 })
      expect(wrapper.vm.isLive).to.be.true;
      expect(wrapper.vm.status).to.eq("Live");
      expect(wrapper.find('[data-testid=vehicleStatus]').text()).to.equal("Live");
    }),
    it("Is not live if timestamp is more than 10 seconds old", () => {
      wrapper.setData({ currentTime: 3000 + 11 });
      expect(wrapper.vm.isLive).to.be.false;
      expect(wrapper.vm.status).to.eq("Offline");
      expect(wrapper.find('[data-testid=vehicleStatus]').text()).to.equal("Offline");
    })
});
