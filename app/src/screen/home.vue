<template>
  <nb-container :style="{flex:1, backgroundColor: '#fff'}">
    <nb-header>
      <nb-left>
        <nb-button transparent :on-press="() => navigation.navigate('DrawerOpen')">
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Vehicles</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content>
      <nb-list v-if="!loading">
        <item v-for="(itemType, types) in items" v-bind:key="itemType.id" :data="itemType" />
      </nb-list>
    </nb-content>
    <nb-fab :onPress="handleFabIconPress" position="bottomRight">
      <nb-icon-nb name="md-add"></nb-icon-nb>
    </nb-fab>
  </nb-container>
</template>

<script>
import React from "react";
import Item from "../components/item";
import { Dimensions } from "react-native";
import store from "../store";
import { Toast } from "native-base";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default {
  computed: {
    items() {
      // Items sorted with non-sims first
      return store.state.vehicles.sort((a, b) =>
        a.isSim === b.isSim ? 0 : a.isSim ? 1 : -1
      );
    }
  },
  props: {
    navigation: Object
  },
  created() {
    this.fetchVehicles();
    this.requestPermissions();
  },
  methods: {
    fetchVehicles() {
      return store.dispatch("FETCH_VEHICLES", {
        user: store.state.user,
        navigate: this.navigation.navigate
      });
    },
    requestPermissions() {
      return store.dispatch("REQUEST_ALL_PERMISSIONS");
    },
    handleFabIconPress() {
      Toast.show({
        text: "This will show a Add Vehicle Dialog!",
        buttonText: "Okay",
        duration: 3000
      });
    }
  },
  components: {
    Item
  }
};
</script>