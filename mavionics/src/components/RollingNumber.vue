<template>
  <div>
    <canvas ref="my-canvas"></canvas>
  </div>
</template>

<script>
import { TweenLite } from "gsap";
const padding = 2;

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
    this.resize();
    // ctx.rect(0, 0, 20, this.stripLength);
    // ctx.stroke();
    this.render();

    TweenLite.ticker.addEventListener("tick", this.render);
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        TweenLite.to(this.$data, 1, { tweenedValue: newValue });
      }
    }
  },
  computed: {
    animatedNumber: function() {
      return this.tweenedValue;
    }
  },
  methods: {
    resize() {
      // We can't access the rendering context until the canvas is mounted to the DOM.
      // Once we have it, provide it to all child components.
      // Resize the canvas to fit its parent's width.
      // Normally you'd use a more flexible resize system.
      this.$refs["my-canvas"].width = this.$refs[
        "my-canvas"
      ].parentElement.clientWidth;
      this.$refs["my-canvas"].height = this.$refs[
        "my-canvas"
      ].parentElement.clientHeight;
      this.context = this.$refs["my-canvas"].getContext("2d");
      this.width = this.$refs["my-canvas"].width;
      this.height = this.$refs["my-canvas"].height;
      this.fontsize = this.height - 2 * padding;
      this.stripLength = 12 * this.fontsize;
      this.stripCanvas = new OffscreenCanvas(20, this.stripLength);
      const ctx = this.stripCanvas.getContext("2d");
      ctx.fillStyle = "#000";
      ctx.font = this.fontsize + "px sans-serif";
      ctx.textAlign = "right";

      for (let i = 0; i < 13; i++) {
        ctx.fillText((21 - i) % 10, 20, i * this.fontsize - 2);
      }
    },
    render() {
      // Since the parent canvas has to mount first, it's *possible* that the context may not be
      // injected by the time this render function runs the first time.
      if (!this.context) return;
      const ctx = this.context;
      // const rollingDigits = 2;
      // const step = Math.pow(10, rollingDigits);

      // Split number into parts:
      //  * Fix: Not rolling (spd 10ths)
      //  * Roll: Rolling part (single)

      let v = this.animatedNumber;

      ctx.save();
      // // Draw box
      // // Clip a rectangular area
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.beginPath();
      ctx.rect(0, 0, this.width, this.height);
      ctx.clip();

      let x = this.width - 10 - padding;

      if (this.value === undefined || this.value == null) {
        ctx.beginPath();
        const h = this.height / 2 - 1;
        ctx.moveTo(x + 10, h);
        ctx.lineTo(x, h);
        ctx.moveTo(x - 2, h);
        ctx.lineTo(x - 12, h);
        ctx.moveTo(x - 14, h);
        ctx.lineTo(x - 24, h);
        ctx.stroke();

        ctx.restore();
        return;
      }

      let digits = Math.floor(v)
        .toString()
        .split("")
        .map(Number);
      let rollY = (v % 1) * Math.sign(v);
      for (let i = 0; i < digits.length; i++) {
        // Start with least significant
        const element = digits[digits.length - i - 1];
        x -= 10;

        ctx.drawImage(
          this.stripCanvas,
          x,
          this.fontsize * (element + 2 + rollY) -
            this.stripLength +
            rollY +
            padding
        );
        if (element != 9) {
          rollY = 0;
        } else if (element == 9 && i == digits.length - 1) {
          x -= 10;
          ctx.drawImage(
            this.stripCanvas,
            x,
            this.fontsize * (2 + rollY) - this.stripLength + rollY + padding
          );
        }
      }

      if (v < 0) {
        x -= 10;
        ctx.beginPath();
        ctx.moveTo(x, this.height / 2);
        ctx.lineTo(x + 8, this.height / 2);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
};
</script>
