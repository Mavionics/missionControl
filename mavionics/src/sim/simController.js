/* eslint-disable no-console */
import PhySim from "@/sim/simPhysics";
import { firestore } from "firebase";
import RtcModule from "@/modules/RtcModule";

class SimController {
  constructor(firebaseDocument) {
    this.physics = new PhySim(Date.now());
    this.timer = 0;
    this.doc = firebaseDocument;

    // this.canvas = new Canvas(100, 1);
    let canvas = document.createElement("canvas");

    canvas.id = "SimCanvas";
    canvas.width = 300;
    canvas.height = 200;
    canvas.style.zIndex = 8;
    canvas.style.top = 0;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    this.canvas = canvas;

    this.stream = this.canvas.captureStream(25);
  }

  start() {
    let rtc = new RtcModule(this.doc, true);
    rtc.addStream(this.stream);

    // rtc.onMessage = msg => {
    //   console.log(msg);
    // };
    // rtc.inAwhile("Hello");

    rtc.sendOffer().then(() => {});

    this.timer = setInterval(() => {
      this.physics.step(1);
      let simState = this.physics.getState();
      console.log(simState);
      this.updateVideo(simState);
    }, 1000);

    this.timerDb = setInterval(() => {
      let simState = this.physics.getState();
      this.updateDb(simState);
    }, 5000);
  }

  updateDb(simState) {
    this.doc
      .update({
        timestamp: firestore.Timestamp.fromMillis(simState.timestamp),
        position: new firestore.GeoPoint(simState.latitude, simState.longitude)
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateVideo(simState) {
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1, "blue");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, 1);
    ctx.font = "30px Arial";
    ctx.fillText(simState.timestamp.toFixed(0), 10, 50);
  }

  stop() {
    console.log("Stoped at " + this.physics.getState().timestamp);
    clearInterval(this.timer);
  }
}

export default SimController;
