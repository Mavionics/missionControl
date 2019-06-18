<template>
  <div class="text-center">
    <b-spinner class="m-5 align-middle large" variant="primary" type="grow"></b-spinner>
    <div class="modal-backdrop"></div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style>
.large {
  width: 50vh;
  height: 50vh;
}
</style>
