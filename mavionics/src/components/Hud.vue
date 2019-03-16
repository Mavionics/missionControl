<template>
  <div>
    <RollingNumber id="speed" :value="speed"/>
    <br>
    <RollingNumber id="altitude" :value="vehicle.altitude"/>
    <br>
    <Tape id="speedTape" :value="speed"></Tape>
  </div>
</template>

<script>
import RollingNumber from "../../src/components/RollingNumber.vue";
import Tape from "../../src/components/Tape.vue";
export default {
  name: "hud",
  components: { RollingNumber, Tape },
  props: {
    vehicle: Object
  },
  computed: {
    speed() {
      return this.vehicle.speed;
    }
  }
};
</script>

<style scoped>
#speed {
  left: 20%;
  top: 10%;
  height: 18px;
  width: 65px;
  position: absolute;
}
#altitude {
  left: 80%;
  top: 50%;
  height: 18px;
  width: 10%;
  position: absolute;
}
#speedTape {
  left: 20%;
  top: 15%;
  height: 60%;
  width: 65px;
  position: absolute;
}
</style>