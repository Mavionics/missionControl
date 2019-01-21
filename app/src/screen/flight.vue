<template>
    <nb-container :style="{flex:1, backgroundColor: '#fff'}">
        <nb-header>
            <nb-body>
                <nb-title>Flight</nb-title>
            </nb-body>
            <nb-right />
        </nb-header>
        <view class="container">
            <text class="title">{{activeVehicle.name}}</text>
            <text class="title">latitude: {{activeVehicle.position.latitude}}</text>
            <text class="title">longitude: {{activeVehicle.position.longitude}}</text>
            <text class="title">{{activeVehicle.timestamp}}</text>
        </view>
</template>

<script>
import React from 'react';
import { Dimensions } from 'react-native';
import store from '../store';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  computed: {
    activeVehicle () {
      return store.state.activeVehicle;
    }
  },
  props: {
      navigation: Object,
      watchId: Object,
  },
  created () {
    this.watchPosition();
  },
  methods: {
    watchPosition(){
      console.log("flight.vue, getPositionContinous")
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        store.dispatch('SET_POSITION', position);
      },
      (error) => console.log("flight.vue, getPositionContinous error: " + error),
      {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
      },
    );
    }
  },
  components: {
  }
};
</script>

<style>
  .container {
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  .title {
    color: #333;
    font-size: 14;
  }
</style>