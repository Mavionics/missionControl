<template>
  <form action @submit.prevent="validateBeforeSubmit">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Vehicle</p>
      </header>
      <section class="modal-card-body">
        <b-field label="User">
          <p>{{currentUser.displayName}}</p>
        </b-field>

        <b-field
          :type="{'is-danger': errors.has('vehicleName')}"
          :message="errors.first('vehicleName')"
        >
          <b-input
            v-model="vehicleName"
            name="vehicleName"
            maxlength="30"
            v-validate="'required'"
            placeholder="Vehicle Name"
          ></b-input>
        </b-field>

        <b-field>
          <b-input type="textarea" maxlength="100" placeholder="Description" name="Description"></b-input>
        </b-field>

        <b-checkbox disabled v-model="isSim">Simulator</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button
          class="button is-primary"
          type="submit"
          @click="addVehicle"
          data-testid="addVehicleModal-submit"
        >Add</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AddVehicleForm",
  components: {},
  props: ["user"],
  computed: {
    isAvailable() {
      return this.vehicleName.length;
    },

    // mix the getters into computed with object spread operator
    ...mapGetters(["currentUser"])
  },
  data: () => {
    return {
      vehicleName: "",
      description: "",
      isSim: true
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("addVehicle", {
              name: this.vehicleName,
              description: this.description,
              isSim: this.isSim
            })
            .then(() => this.$parent.close());
          return;
        }
        this.$toast.open({
          message: "Form is not valid! Please check the fields.",
          type: "is-danger",
          position: "is-bottom"
        });
      });
    },
    addVehicle() {}
  }
};
</script>

