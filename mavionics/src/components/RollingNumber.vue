<template>
  <div>
    <canvas ref="my-canvas"></canvas>
  </div>
</template>

<script>
import { TweenLite } from "gsap";
export default {
  name: "RollingNumber",
  props: {
    value: Number,
    step: Number
  },
  data: () => {
    return { tweenedValue: 0 };
  },
  mounted() {
    // We can't access the rendering context until the canvas is mounted to the DOM.
    // Once we have it, provide it to all child components.
    this.context = this.$refs["my-canvas"].getContext("2d");
    // Resize the canvas to fit its parent's width.
    // Normally you'd use a more flexible resize system.
    this.$refs["my-canvas"].width = this.$refs[
      "my-canvas"
    ].parentElement.clientWidth;
    this.$refs["my-canvas"].height = this.$refs[
      "my-canvas"
    ].parentElement.clientHeight;
    this.render();
    TweenLite.ticker.addEventListener("tick", this.render);
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldVal) {
        console.log("Value change", newValue, this.value);
        // this.tweenedValue = this.value;
        TweenLite.to(this.$data, 0.5, { tweenedValue: newValue });
        // this.render();
      }
    }
  },
  computed: {
    animatedNumber: function() {
      return this.tweenedValue; //.toFixed(0);
    }
  },
  methods: {
    render() {
      // Since the parent canvas has to mount first, it's *possible* that the context may not be
      // injected by the time this render function runs the first time.
      if (!this.context) return;
      const ctx = this.context;
      const width = 200;
      const height = 16;
      const padding = 3;
      const rollingDigits = 1;
      const step = Math.pow(10, rollingDigits);
      const rollingWidth = 10;

      // Split number into 3 parts:
      //  * Fix: Not rolling (spd 10ths)
      //  * Roll: Rolling part (single)

      let roll = this.animatedNumber % step;
      let fix = this.animatedNumber - roll;
      let fixStr = Math.trunc(fix / step);

      ctx.save();
      // Draw box
      // Clip a rectangular area
      ctx.beginPath();
      ctx.clearRect(0, 0, width + padding, height + 2 * padding);
      ctx.rect(0, 0, width + padding, height + 2 * padding);
      ctx.stroke();
      ctx.clip();

      // Draw the text
      ctx.fillStyle = "#000";
      ctx.font = height.toString() + "px sans-serif";
      ctx.textAlign = "right";
      let rollY = height * (roll % 1);
      if (roll + 1 >= step) {
        ctx.fillText(fixStr + 1, width - rollingWidth, rollY);
        ctx.fillText(fixStr, width - rollingWidth, rollY + height);
      } else {
        ctx.fillText(fixStr, width - rollingWidth, height);
      }
      ctx.fillText(Math.trunc(roll), width, rollY + height);
      ctx.fillText(Math.trunc((roll + 1) % step), width, rollY);
      //   newBox.x + newBox.w / 2,
      //   newBox.y - 14
      // );
      ctx.restore();
    }
  }
};
</script>
