<template>
  <div>
    <canvas ref="my-canvas"></canvas>
  </div>
</template>

<script>
import { TweenLite } from "gsap";
export default {
  name: "CanvasBase",
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
    },
    render() {
      // Since the parent canvas has to mount first, it's *possible* that the context may not be
      // injected by the time this render function runs the first time.
      if (!this.context) return;
      const ctx = this.context;

      ctx.save();
      ctx.restore();
    }
  }
};
</script>
