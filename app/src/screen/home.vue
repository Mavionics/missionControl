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
                <nb-title>Vehicles</nb-title>
            </nb-body>
            <nb-right />
        </nb-header>
        <nb-content>
            <nb-list>
                <item
                    v-if="!loading"
                    v-for="(itemType, types) in items"
                    :data="itemType" />
            </nb-list>
        </nb-content>
    </nb-container>
</template>

<script>
import React from 'react';
import Item from '../components/item';
import { Dimensions } from 'react-native';
import {PermissionNotification} from '../components/permissions'
import store from '../store';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  computed: {
    items () {
      return store.state.vehicles;
    }
  },
  props: {
      navigation: Object
  },
  created () {
    this.fetchVehicles();
    this.requestPermissions();
  },
  methods: {
    fetchVehicles(){
        return store.dispatch('FETCH_VEHICLES',
        {user: store.state.user,
        navigate: this.navigation.navigate});
    },
    requestPermissions(){
        PermissionNotification.requestCameraPermission();
        PermissionNotification.requestFineLocationPermission();
        PermissionNotification.requestCoarseLocationPermission();
        PermissionNotification.requestRecordAudioPermission();
    }
  },
  components: {
      Item
  }
};
</script>