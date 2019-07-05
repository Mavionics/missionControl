/* eslint-disable no-console */
import Peer from "simple-peer";
import SignalingModule from "@/modules/Signaling"

class RtcModule {
  constructor(avId, initiator, stream) {
    this.initiator = initiator;
    this.avId = avId;
    this.stream = stream;
    this.onMessage = () => { };
    this.onStream = () => { };
    this.signal = new SignalingModule(avId, initiator)
  }

  async connect() {
    await this.signal.connect();

    this.p = new Peer({
      initiator: this.initiator,
      objectMode: true,
      config: {
        iceServers: [
          { urls: "stun:stun.services.mozilla.com" },
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:numb.viagenie.ca",
            credential: "testtest",
            username: "alex.o.poole@gmail.com"
          }
        ]
      }
    });

    this.p._debug = (msg, par1, par2) =>
      console.log("SIMPLE_PEER", msg, par1, par2);

    // Message from other side
    this.signal.onMessage = (data) => {
      console.debug("Signal Message: ", data);
      this.p.signal(data);
    }

    // Message from this side
    this.p.on("signal", data => {
      console.debug("Achtung! Outgoing ", data);
      this.signal.sendMessage(data);
    });
    this.p.on('stream', stream => {
      console.debug("RtcModule.js stream: ", stream);
      this.onStream(stream);
    })

    this.p.on("data", data => {
      console.debug("RtcModule.js data: ", data);
      this.onMessage(JSON.parse(data));
    });

    return new Promise((resolve, reject) => {
      this.p.on("error", function (err) {
        console.log("error", err);
        reject(err);
      });

      this.p.on("connect", () => {
        this.signal.setConnected();
        resolve();
      });
    });
  }

  sendMessage(data) {
    if (this.p !== null)
      this.p.send(JSON.stringify(data));
  }

  sendHeartBeat(data) {
    this.signal.sendHeartBeat(data);
  }

  disconnect() {
    this.p.destroy();
  }

  isConnected() {
    return this.p && this.p.connected;
  }
}

export default RtcModule;
