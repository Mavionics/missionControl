import { storiesOf } from "@storybook/vue";

import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import RollingNumber from "../../src/components/RollingNumber.vue";

storiesOf("RollingNumber", module)
  .addDecorator(withKnobs)
  .add("Value 20", () => ({
    components: { RollingNumber },
    template: "<RollingNumber :value='20' :step='10' />",
    data() {
      return { speed: 20 };
    }
  }))
  .add("Value 20.1", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 20.1) }
    },
    template: "<RollingNumber :value='speed' :step='10' />"
  }))
  .add("Value 20.5", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 20.5) }
    },
    template: "<RollingNumber :value='speed' :step='10' />"
  }))
  .add("Value 20.9", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 20.9) }
    },
    template: "<RollingNumber :value='speed' :step='10' />"
  }))
  .add("Value 21", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 21) }
    },
    template: "<RollingNumber :value='speed' :step='10' />"
  }))
  .add("Value 29", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 29) }
    },
    template: "<RollingNumber :value='speed' :step='10' />"
  }))
  .add("Value 29.2", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 29.2) }
    },
    template: "<RollingNumber :value='speed' :step='10' />"
  }))
  .add("Value 29.5", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 29.5) }
    },
    template: "<RollingNumber :value='speed' :step='10' />"
  }))
  .add("Value 29.8", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 29.8) }
    },
    template: "<RollingNumber :value='speed' :step='10' />"
  }))
  .add("Value 99.8", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 99.8) }
    },
    template: "<RollingNumber :value='speed' :step='10' />"
  }))
  .add("Value Change", () => ({
    components: { RollingNumber },
    template:
      "<div><RollingNumber :value='speed' :step='10' /><button @click='runDown()'>Down</button><button @click='stop()'>Stop</button><button @click='runUp()'>Up</button></div>",
    data: () => {
      return { speed: 0, timer: null };
    },
    methods: {
      runUp() {
        clearInterval(this.timer);
        this.timer = setInterval(() => (this.speed += 1), 600);
      },
      runDown() {
        clearInterval(this.timer);
        this.timer = setInterval(() => (this.speed -= 1), 600);
      },
      stop() {
        clearInterval(this.timer);
      }
    }
  }));
// .add("Rolling data", () => {
//   let spd = 0;
//   setInterval(() => {
//     console.log(spd);
//     spd += 1;
//   }, 1000);
//   return {
//     components: { RollingNumber },
//     template: "<RollingNumber :value='speed' :step='10' />",
//     data() {
//       return { speed: spd };
//     }
//   };
// });
