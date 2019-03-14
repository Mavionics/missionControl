import { storiesOf } from "@storybook/vue";

import { withKnobs, number } from "@storybook/addon-knobs";
import RollingNumber from "../../src/components/RollingNumber.vue";

let templateString =
  "<RollingNumber :value='speed' :step='10' style='height:18px;'/>";
storiesOf("RollingNumber", module)
  .addDecorator(withKnobs)
  .add("Value 20", () => ({
    components: { RollingNumber },
    template: templateString,
    data() {
      return { speed: 20 };
    }
  }))
  .add("Value 20.1", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 20.1) }
    },
    template: templateString
  }))
  .add("Value 20.5", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 20.5) }
    },
    template: templateString
  }))
  .add("Value 20.9", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 20.9) }
    },
    template: templateString
  }))
  .add("Value 21", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 21) }
    },
    template: templateString
  }))
  .add("Value 29", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 29) }
    },
    template: templateString
  }))
  .add("Value 29.2", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 29.2) }
    },
    template: templateString
  }))
  .add("Value 29.5", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 29.5) }
    },
    template: templateString
  }))
  .add("Value 29.8", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 29.8) }
    },
    template: templateString
  }))
  .add("Value 99.8", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", 99.8) }
    },
    template: templateString
  }))
  .add("Value -5.0", () => ({
    components: { RollingNumber },
    props: {
      speed: { type: Number, default: number("speed", -5.0) }
    },
    template: templateString
  }))

  .add("No Value", () => ({
    components: { RollingNumber },
    data: () => {
      return { speed: undefined };
    },
    template: templateString
  }))
  .add("Value Change", () => ({
    components: { RollingNumber },
    template:
      "<div>" +
      templateString +
      "<button @click='runDown()'>Down</button><button @click='stop()'>Stop</button><button @click='runUp()'>Up</button></div>",
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
