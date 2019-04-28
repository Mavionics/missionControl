import { storiesOf } from "@storybook/vue";
import Map from "../../src/components/Map.vue";
import TestKeys from "../../tests/testkey";

const data = {
  cesiumKey: TestKeys.CesiumKey,
  myPosition: {
    longitude: 14,
    latitude: 52
  },
  avPosition: {
    longitude: 14,
    latitude: 52,
    heading: 0,
    altitude: 1000
  },
  timer: (() => {
    return setInterval(() => {
      data.myPosition.longitude += 0.0001;
      data.myPosition.latitude += 0.00001;
      data.avPosition.longitude += 0.0002;
      data.avPosition.latitude += 0.00002;
      data.avPosition.heading += 0.5;
      data.avPosition.altitude += 1;
    }, 300);
  })()
};

storiesOf("Map", module)
  .add("Nothing", () => ({
    components: { Map },
    template: "<Map />"
  }))
  .add("Key", () => ({
    components: { Map },
    template: "<Map :cesiumKey='cesiumKey' />",
    data() {
      return data;
    }
  }))
  .add("userPosition", () => ({
    components: { Map },
    template: "<Map :cesiumKey='cesiumKey' :userPosition='myPosition' />",
    data() {
      return data;
    }
  }))
  .add("userPosition Change", () => ({
    components: { Map },
    template:
      "<div><Map :cesiumKey='cesiumKey' :userPosition='myPosition' /></div>",
    data() {
      return data;
    }
  }))
  .add("Vehicle Position Change", () => ({
    components: { Map },
    template:
      "<div><Map :cesiumKey='cesiumKey' :userPosition='myPosition' :vehicle='avPosition' /></div>",
    data() {
      return data;
    }
  }));
