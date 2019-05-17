<template>
  <div>
    <div id="background">
      <canvas ref="my-canvas"></canvas>
      <RollingNumber id="text" class="vertical-center" :value="value"/>
    </div>
  </div>
</template>

<script>
import { TweenLite } from "gsap";
import RollingNumber from "../../src/components/RollingNumber.vue";

export default {
  name: "Tape",
  components: { RollingNumber },
  props: {
    value: Number,
    resolution: {
      //Px per unit
      type: Number,
      default: 3
    },
    maxValue: {
      type: Number,
      default: 250
    },
    minValue: {
      type: Number,
      default: 0
    }
  },
  data: () => {
    return { tweenedValue: 0 };
  },
  mounted() {
    this.resize();
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

      this.stripLength = this.resolution * (this.maxValue - this.minValue); // px = u*px/u
      this.stripCanvas = new OffscreenCanvas(this.width, this.stripLength);
      const ctx = this.stripCanvas.getContext("2d");

      // ctx.rect(this.width-2,0, 2 , this.stripLength);
      // ctx.stroke();

      ctx.beginPath();
      const step = 10;
      const fontsize = 14;
      const linelength = 10;
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.font = fontsize + "px sans-serif";
      const xline = this.width - linelength - 2;
      for (let value = this.minValue; value < this.maxValue; value += step) {
        const y = this.stripLength - value * this.resolution;
        ctx.moveTo(xline, y);
        ctx.lineTo(this.width - 2, y);
        ctx.fillText(value, xline - 2, y + 1);
      }
      ctx.stroke();
    },
    render() {
      // Since the parent canvas has to mount first, it's *possible* that the context may not be
      // injected by the time this render function runs the first time.
      if (!this.context) return;
      const ctx = this.context;
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.beginPath();
      ctx.rect(0, 0, this.width, this.height / 2 - 10);
      ctx.rect(0, this.height / 2 + 10, this.width, this.height / 2 - 10);
      ctx.clip();
      let v = this.animatedNumber;
      const x = 10;

      ctx.save();
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
      } else {
        // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        const y = Math.round(
          this.stripLength - this.height / 2 - v * this.resolution
        );
        ctx.drawImage(
          this.stripCanvas,
          0,
          y,
          this.width,
          this.height,
          0,
          0,
          this.width,
          this.height
        );
      }
      ctx.restore();
    },
    toPosition(value) {
      return this.height / 2 - value * this.resolution;
    }
  }
};
</script>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
#text {
  height: 20px;
  left: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.3);
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.fill {
  margin: 0;
  position: relative;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>