<template>
  <nb-container :style="{flex:1, backgroundColor: '#fff'}">
    <nb-header>
      <nb-body>
        <nb-title>Flight</nb-title>
      </nb-body>
      <nb-right/>
    </nb-header>
    <view class="container">
      <RTCView :streamURL="videoURL" class="video"/>
      <text class="title">{{videoURL}}</text>
    </view>
    <view class="container">
      <text class="title">{{activeVehicle.name}}</text>
      <text class="title">latitude: {{latitude}}</text>
      <text class="title">longitude: {{longitude}}</text>
      <text class="title">altitude: {{altitude}}</text>
      <text class="title">time: {{activeVehicle.timestamp.seconds}}</text>
    </view>
  </nb-container>
</template>

<script>
import React from "react";
import { Dimensions } from "react-native";
import store from "../store";
import RtcModule from "../modules/RtcModule";
import { createTimestamp } from "../modules/Timestamp";
// import { RTCView } from "react-native-webrtc";

var WebRTC = require("react-native-webrtc");
var {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia
} = WebRTC;

const SCREEN_WIDTH = Dimensions.get("window").width;

export default {
  computed: {
    activeVehicle() {
      return store.state.activeVehicle;
    },
    activeVehicleRef() {
      return store.state.activeVehicleRef;
    },
    coords() {
      if (
        store.state.activeVehicle != null &&
        store.state.activeVehicle.position != null &&
        store.state.activeVehicle.position.coords != null
      ) {
        return store.state.activeVehicle.position.coords;
      }
    },
    latitude() {
      if (
        store.state.activeVehicle != null &&
        store.state.activeVehicle.position != null &&
        store.state.activeVehicle.position.coords != null &&
        store.state.activeVehicle.position.coords.latitude != null
      ) {
        return store.state.activeVehicle.position.coords.latitude;
      }
    },
    longitude() {
      if (
        store.state.activeVehicle != null &&
        store.state.activeVehicle.position != null &&
        store.state.activeVehicle.position.coords != null &&
        store.state.activeVehicle.position.coords.longitude != null
      ) {
        return store.state.activeVehicle.position.coords.longitude;
      }
    },
    altitude() {
      if (
        store.state.activeVehicle != null &&
        store.state.activeVehicle.position != null &&
        store.state.activeVehicle.position.coords != null &&
        store.state.activeVehicle.position.coords.altitude != null
      ) {
        return store.state.activeVehicle.position.coords.altitude;
      }
    }
  },
  props: {
    navigation: Object,
    watchId: Object,
    rtc: Object,
    videoURL: null,
    streams: []
  },
  created() {
    this.updateActiveVehicle();
    this.getLocalStream(true, this.initWebRTC);
    this.watchPosition();
  },
  methods: {
    watchPosition() {
      console.log("flight.vue, getPositionContinous");
      this.watchId = navigator.geolocation.watchPosition(
        position => {
          console.log("flight.vue, watchPosition");
          store.dispatch("SET_POSITION", position);
        },
        error => {
          console.log(
            "flight.vue, getPositionContinous error: ",
            JSON.stringify(error)
          )},
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      );
    },
    updateActiveVehicle() {
      console.log("flight.vue, updateActiveVehicle");

      // Update database
      setInterval(() => {
        store.dispatch("UPDATE_ACTIVE_VEHICLE");
      }, 3000);

      // Update RTC
      setInterval(() => {
        if (this.rtc != null && this.rtc != undefined) {
          this.rtc.sendMessage(this.packData(store.state));
        }
      }, 300);
    },
    packData(state) {
      console.log("flight.vue, packData" + JSON.stringify(state.position));
      if (
        state.position.coords == null ||
        state.position.coords === undefined
      ) {
        return {};
      } else
        return {
          altitude: state.position.coords.altitude, // The altitude in meters above the mean sea level. MSL = WGS84 Geoid height?
          verticalSpeed: null, // The altitude change rate in meters per second
          speed: state.position.coords.speed, // The ground speed in meters per second
          acceleration: null, // The rate of change of ground speed in meters per second^2
          heading: state.position.coords.heading, // The heading as degrees clockwise from North (True North)
          turnRate: null,
          longitude: state.position.coords.longitude, // The longitude as a decimal number
          latitude: state.position.coords.latitude, // The latitude as a decimal number
          accuracy: state.position.coords.accuracy, //	The accuracy of position
          altitudeAccuracy: state.position.coords.altitudeAccuracy, //	The altitude accuracy of position
          timestamp: state.activeVehicle.timestamp
        };
    },
    initWebRTC(stream) {
      this.videoURL = stream.toURL();
      this.rtc = new RtcModule(this.activeVehicleRef, true, stream);

      this.rtc.onMessage = msg => {
        console.log("flight.vue:  rtc.onMessage, ", msg);
      };

      this.rtc.connect().then(() => {
        console.log("flight.vue: Sim will start sending");
      });
    },
    getLocalStream(isFront, callback) {
      MediaStreamTrack.getSources(sourceInfos => {
        console.log("flight.vue, MediaStreamTrack.getSources: " + sourceInfos);
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (
            sourceInfo.kind == "video" &&
            sourceInfo.facing == (isFront ? "front" : "back")
          ) {
            videoSourceId = sourceInfo.id;
          }
        }
        getUserMedia(
          {
            audio: true,
            video: {
              mandatory: {
                minWidth: 500, // Provide your own width, height and frame rate here
                minHeight: 300,
                minFrameRate: 30
              },
              facingMode: isFront ? "user" : "environment",
              optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
            }
          },
          function(stream) {
            console.log("flight.vue, function (stream): ", stream);
            callback(stream);
          },
          error => console.log("flight.vue, getUserMedia error: " + error)
        );
      });
    }
  },
  components: { RTCView }
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
.video {
  width: 200;
  height: 150;
  background-color: #6666ff;
}
</style>