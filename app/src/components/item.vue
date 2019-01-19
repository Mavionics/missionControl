<template>
  <nb-list-item>
    <touchable-opacity class="container" :active-opacity="0.5">
      <view class="detail">
        <text class="title">{{data.name}}</text>
      </view>
    <button
        :on-press="connectToVehicle"
        title="Fly!"
        color="#841584"
        accessibility-label="Vehicle ready for flight"
    />
    </touchable-opacity>
  </nb-list-item>
</template>
<script>

import store from '../store';

export default {
  props: {
    data: Object
  },
    computed: {
  },
    methods: {
    connectToVehicle(avId) {
      store.dispatch('SET_ACTIVE_VEHICLE', this.data);
      this.data.navigate('Flight');
    }
  }
};
</script>

<style>
  .container {
    flex: 1;
    flex-direction: row;
    padding: 16;
  }
  .score {
    width: 40;
    height: 40;
    background-color: #fff;
    border-radius: 20;
    justify-content: center;
    align-items: center;
    margin-right: 16;
  }
  .score-text {
    color: #ff6600;
    font-weight: bold;
  }
  .detail {
    flex: 1
  }
  .name {
    color: #666;
    font-size: 12;
    margin-bottom: 6;
  }
  .title {
    color: #333;
    font-size: 14;
  }
</style>