<template>
  <b-modal
    id="modal-add-vehicle"
    ref="modal"
    title="Add Vehicle"
    ok-title="Add"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    :ok-disabled="!nameValidation"
  >
    <b-form @submit.stop.prevent="handleSubmit" ref="form">
      <b-row>
        <b-form-text>{{user.displayName}}</b-form-text>
      </b-row>

      <b-form-group
        :state="nameValidation"
        label-for="vehicleName"
        invalid-feedback="Must be 4-30 characters long."
      >
        <b-form-input
          v-model="vehicleName"
          placeholder="Vehicle Name"
          :state="nameValidation"
          id="vehicleName"
          maxlength="30"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label-for="description">
        <b-form-textarea
          maxlength="100"
          rows="3"
          max-rows="3"
          placeholder="Description"
          name="description"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label-for="simulator" description="Only Simulators can be added at this time.">
        <b-form-checkbox v-model="isSim" switch disabled name="simulator">Simulator</b-form-checkbox>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "AddVehicleForm",
  components: {},
  props: ["user"],
  computed: {
    isAvailable() {
      return this.vehicleName.length;
    },
    nameValidation() {
      return this.vehicleName.length > 3 && this.vehicleName.length < 30;
    }
  },
  data: () => {
    return {
      vehicleName: "",
      description: "",
      isSim: true
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    resetModal() {
      this.vehicleName = "";
      this.description = "";
      this.isSim = true;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Add to database
      this.$store.dispatch("addVehicle", {
        name: this.vehicleName,
        description: this.description,
        isSim: this.isSim
      });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  }
};
</script>

