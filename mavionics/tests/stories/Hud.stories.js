import { storiesOf } from "@storybook/vue";

import { withKnobs, number } from "@storybook/addon-knobs";
import Hud from "../../src/components/Hud";
import RollingNumber from "../../src/components/RollingNumber.vue";
// knobs (customaziable props)
const speedKnobOptions = {
  range: true,
  min: 0,
  max: 250,
  step: 1
};
let templateString =
  '<div style="height:650px"><Hud :vehicle="veh" class="bg-clouds" style="min-height:100%" /></div>';
storiesOf("HUD", module)
  .addDecorator(withKnobs)
  .add("Value 20", () => ({
    data() {
      return {
        veh: {
          speed: number("speed", 20.1, speedKnobOptions),
          altitude: number("altitude", 2000)
        }
      };
    },
    components: { Hud, RollingNumber },
    template: templateString
  }))
  .add("Speed sim", () => ({
    data() {
      return {
        veh: {
          speed: number("speed", 20.1, speedKnobOptions),
          altitude: number("altitude", 2000)
        }
      };
    },
    components: { Hud, RollingNumber },
    template:
      "<div>" +
      templateString +
      "<button @click='runDown()'>Down</button><button @click='stop()'>Stop</button><button @click='runUp()'>Up</button></div>",

    methods: {
      runUp() {
        clearInterval(this.timer);
        this.timer = setInterval(() => (this.veh.speed += 2), 500);
      },
      runDown() {
        clearInterval(this.timer);
        this.timer = setInterval(() => (this.veh.speed -= 2), 500);
      },
      stop() {
        clearInterval(this.timer);
      }
    }
  }));
