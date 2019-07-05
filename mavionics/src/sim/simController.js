/* eslint-disable no-console */
import PhySim from "@/sim/simPhysics";
import RtcModule from "@/modules/RtcModule";

class SimController {
  constructor(avId) {
    this.physics = new PhySim(Date.now());
    this.timer = 0;
    this.avid = avId;

    // this.canvas = new Canvas(100, 1);
    let canvas = document.createElement("canvas");

    canvas.id = "SimCanvas";
    canvas.width = 240;
    canvas.height = 160;
    canvas.style.zIndex = 8;
    canvas.style.top = 30;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    this.canvas = canvas;

    this.stream = this.canvas.captureStream(25);
  }

  start() {
    this.rtc = new RtcModule(this.avid, true, this.stream);

    this.rtc.onMessage = msg => {
      console.log("Sim got: ", msg);
    };

    this.rtc.connect().then(() => {
      //this.rtc.sendMessage("Sim will start sending");
    });

    this.timer = setInterval(() => {
      this.physics.stepTo(Date.now());
      let simState = this.physics.getState();
      // console.log(simState);
      this.updateVideo(simState);
    }, 1000);

    this.timerDb = setInterval(() => {
      let simState = this.physics.getState();
      this.rtc.sendHeartBeat(simState);
    }, 5000);

    this.timerDc = setInterval(() => {
      let simState = this.physics.getState();
      if (this.rtc && this.rtc.isConnected()) this.rtc.sendMessage(simState);
    }, 1000);
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
    this.rtc.disconnect();
    this.rtc = null;
    clearInterval(this.timer);
  }
}

export default SimController;
