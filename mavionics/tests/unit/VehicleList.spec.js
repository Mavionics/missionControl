import VehicleList from "@/components/VehicleList"

import { shallowMount } from "@vue/test-utils"
import { expect } from 'chai'
// import sinon from 'sinon'

describe('VehicleList.vue', () => {
  // let clock;

  const vehicleData = [{ "name": "Fly-thing", "owner": "c6pGDLQ7GNbNjBh5HGPYRq7X8B53", "position": { "_lat": 58, "_long": 15.2 }, "timestamp": { "seconds": 1542049200, "nanoseconds": 0 } }];

//   beforeEach(() => {
    
//     const wrapper = shallowMount(VehicleList, {sync: false})
//     console.log(Date)
//     clock = sinon.useFakeTimers(1542049200);
//     vehicleData.timestamp = clock.now;
//     console.log(vehicleData.timestamp)
//   });
  
  
// afterEach(function () {
//   clock.restore();
// });

  it("Loads", () => {
    const wrapper = shallowMount(VehicleList)
    expect(wrapper.find("table").isVisible()).to.be.true;
  }),

  it("Has correct vehicle name", () => {
    const wrapper = shallowMount(VehicleList,
      {
        propsData: {
          vehicles: vehicleData
        }
      })
    expect(wrapper.find('[data-testid=vehicleName]').text()).to.equal("Fly-thing");
  }),

  it("Has status live if timestamp is less than 10 seconds old", () => {
    const wrapper = shallowMount(VehicleList,
      {
        propsData: {
          vehicles: vehicleData
        }
      })

    expect(wrapper.find('[data-testid=vehicleStatus]').text()).to.equal("Live");

  })

})
