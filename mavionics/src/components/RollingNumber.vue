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
    step: Number,
    fontsize: { type: Number, default: 16 }
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

    this.stripLength = 12 * this.fontsize;
    this.stripCanvas = new OffscreenCanvas(20, this.stripLength);
    const ctx = this.stripCanvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.font = this.fontsize + "px sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i < 13; i++) {
      ctx.fillText((21 - i) % 10, 20, i * this.fontsize - 2);
    }
    // ctx.rect(0, 0, 20, this.stripLength);
    // ctx.stroke();
    this.render();

    TweenLite.ticker.addEventListener("tick", this.render);
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldVal) {
        TweenLite.to(this.$data, 0.5, { tweenedValue: newValue });
      }
    }
  },
  computed: {
    animatedNumber: function() {
      return this.tweenedValue;
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
      // const rollingDigits = 2;
      // const step = Math.pow(10, rollingDigits);

      // Split number into parts:
      //  * Fix: Not rolling (spd 10ths)
      //  * Roll: Rolling part (single)

      let v = this.animatedNumber;

      ctx.save();
      // // Draw box
      // // Clip a rectangular area
      ctx.clearRect(0, 0, width + padding, height + 2 * padding);
      ctx.beginPath();
      ctx.rect(0, 0, width + padding, height);
      ctx.clip();
      let digits = Math.floor(v)
        .toString()
        .split("")
        .map(Number);

      let rollY = v % 1;
      for (let i = 0; i < digits.length; i++) {
        // Start with least significant
        const element = digits[digits.length - i - 1];

        ctx.drawImage(
          this.stripCanvas,
          width - i * 10 - 50,
          this.fontsize * (element + 2 + rollY) - this.stripLength + rollY
        );
        if (element != 9) {
          rollY = 0;
        } else if (element == 9 && i == digits.length - 1) {
          ctx.drawImage(
            this.stripCanvas,
            width - (i + 1) * 10 - 50,
            this.fontsize * (2 + rollY) - this.stripLength + rollY
          );
        }
      }
      ctx.restore();
    }
  }
};
</script>
