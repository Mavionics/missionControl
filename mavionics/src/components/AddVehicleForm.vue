<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Vehicle</p>
      </header>
      <section class="modal-card-body">
        <b-field label="User">
          <p>{{currentUser}}</p>
        </b-field>

        <b-field label="Vehicle Name" type="is-success" message="This name is available">
          <b-input value="Simulator" maxlength="30"></b-input>
        </b-field>

        <b-field>
          <b-input type="textarea" minlength="10" maxlength="100" placeholder="Description"></b-input>
        </b-field>

        <b-checkbox disabled v-model="isSim">Simulator</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary">Add</button>
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
    // mix the getters into computed with object spread operator
    ...mapGetters(["currentUser"])
  },
  data: () => {
    return {
      // user: "Test Testarsson",
      isSim: true
    };
  }
};
</script>

