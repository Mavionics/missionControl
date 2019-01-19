<template>
    <nb-container :style="{flex:1, backgroundColor: '#fff'}">
        <nb-header>
            <nb-body>
                <nb-title>Flight</nb-title>
            </nb-body>
            <nb-right />
        </nb-header>
</template>

<script>
import React from 'react';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  computed: {
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