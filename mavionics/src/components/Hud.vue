<template>
  <div>
    <RollingNumber id="speed" :value="vehicle.speed"/>
    <RollingNumber id="altitude" :value="vehicle.altitude"/>
    <Tape id="speedTape" :value="vehicle.speed"></Tape>
    <AltitudeTape id="altitudeTape" :value="vehicle.altitude"></AltitudeTape>
  </div>
</template>

<script>
import RollingNumber from "../../src/components/RollingNumber.vue";
import Tape from "../../src/components/Tape.vue";
import AltitudeTape from "../../src/components/AltitudeTape.vue";
export default {
  name: "hud",
  components: { RollingNumber, Tape, AltitudeTape },
  props: {
    vehicle: Object
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
  top: 10%;
  height: 18px;
  width: 65px;
  position: absolute;
}
#speedTape {
  left: 20%;
  top: 15%;
  height: 60%;
  width: 65px;
  position: absolute;
}
#altitudeTape {
  left: 80%;
  top: 15%;
  height: 60%;
  width: 65px;
  position: absolute;
}
</style>