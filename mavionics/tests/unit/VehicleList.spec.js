import VehicleList from "@/components/VehicleList"
import VehicleListItem from "@/components/VehicleListItem"
import { mount, RouterLinkStub } from "@vue/test-utils"
import { expect } from 'chai'
// import sinon from 'sinon'

const originalDateNow = Date.now;

function fakeDate(offset) {
  Date.now = () => { return Date.parse('01 Jan 2019 00:00:00 GMT') + (offset | 0)}
}

function unfakeDate() {
  Date.now = originalDateNow
}

describe('VehicleList.vue', () => {
  // let clock;

  const vehicleData = [{ "name": "Fly-thing", "owner": "c6pGDLQ7GNbNjBh5HGPYRq7X8B53", "position": { "_lat": 58, "_long": 15.2 }, "timestamp": { "seconds": 1542049200, "nanoseconds": 0 } }];

  beforeEach(() => {
    fakeDate();
    //     const wrapper = shallowMount(VehicleList, {sync: false})
    //     console.log(Date)
    //     clock = sinon.useFakeTimers(1542049200);
    //     vehicleData.timestamp = clock.now;
    //     console.log(vehicleData.timestamp)
  });

  afterEach(function () {
    unfakeDate();
    //   clock.restore();
  });

  it("Loads", () => {
    const wrapper = mount(VehicleList)
    expect(wrapper.find("table").isVisible()).to.be.true;
  }),

    it("Has correct vehicle name", () => {
      const wrapper = mount(VehicleList,
        {
          propsData: {
            vehicles: vehicleData
          },
          components: {
            'router-link': RouterLinkStub
          }
        })
      expect(wrapper.find('[data-testid=vehicleName]').text()).to.equal("Fly-thing");
    }),

    it("Has status live if timestamp is less than 10 seconds old", () => {
      vehicleData[0].timestamp.seconds = Date.now()-2000;
      const wrapper = mount(VehicleList,
        {
          propsData: {
            vehicles: vehicleData
          },
          components: {
            'router-link': RouterLinkStub
          }
        });
      // expect(wrapper.vm.isLive).to.be.true
      expect(wrapper.find('[data-testid=vehicleStatus]').text()).to.equal("Live");
    })
})

describe('VehicleListItem.vue', () => {
  // let clock;

  let vehicleData;
  let wrapper;

  beforeEach(() => {
    fakeDate();
    vehicleData = { "name": "Fly-thing", "owner": "c6pGDLQ7GNbNjBh5HGPYRq7X8B53", "position": { "_lat": 58, "_long": 15.2 }, "timestamp": { "seconds": Date.now() / 1000, "nanoseconds": 0 } };
    wrapper = mount(VehicleListItem,
      {
        propsData: {
          vehicle: vehicleData
        },
        components: {
          'router-link': RouterLinkStub
        }
      });
  });

  afterEach(function () {
    unfakeDate();
  });

  it("Loads", () => {
    expect(wrapper.find("tr").isVisible()).to.be.true;
  }),
  it("Is live if timestamp is less than 10 seconds old", () => {
    vehicleData.timestamp.seconds -= 9;
    expect(VehicleListItem.computed.isLive.call({vehicle:vehicleData}))
      .to.be.true;
  }),
  it("Is not live if timestamp is more than 10 seconds old", () => {
    vehicleData.timestamp.seconds -= 11;
    expect(VehicleListItem.computed.isLive.call({vehicle:vehicleData}))
      .to.be.false;
  }),
  
  it("Has status live if timestamp is less than 10 seconds old", () => {
    vehicleData.timestamp.seconds -= 9;
    expect(VehicleListItem.computed.status.call({isLive: true}))
      .to.eq("Live");
  }),
  it("Has status offline if timestamp is more than 10 seconds old", () => {
    vehicleData.timestamp.seconds -= 11;
    expect(VehicleListItem.computed.status.call({isLive: false}))
      .to.eq("Offline");
  })
});
