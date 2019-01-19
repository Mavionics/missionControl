<template>
    <nb-container :style="{flex:1, backgroundColor: '#fff'}">
        <nb-header>
            <nb-body>
                <nb-title>Flight</nb-title>
            </nb-body>
            <nb-right />
        </nb-header>
        <view class="text-container">
        <text>{{activeVehicle.name}}</text>
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
      navigation: Object
  },
  created () {
  },
  methods: {
  },
  components: {
  }
};
</script>