<template>
    <nb-container :style="{flex:1, backgroundColor: '#fff'}">
        <nb-header>
          <nb-left>
            <nb-button
              transparent
              :on-press="() => navigation.navigate('DrawerOpen')"
            >
            <nb-icon name="menu" />
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-title>Flight</nb-title>
            </nb-body>
            <nb-right />
        </nb-header>
</template>

<script>
import React from 'react';
import Item from '../components/item';
import { Dimensions } from 'react-native';
import store from '../store';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  computed: {
    items () {
      return store.state.vehicles;
    },
    loading () {
        return false;
    }
  },
  props: {
      navigation: Object
  },
  created () {
    this.fetchVehicles();
  },
  methods: {
    fetchVehicles(){
        return store.dispatch('FETCH_VEHICLES', store.state.user);
    }
  },
  components: {
      Item
  }
};
</script>