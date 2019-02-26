/* eslint-disable no-console */
import Peer from "simple-peer";
import WebRTC from "react-native-webrtc";

class RtcModule {
  constructor(dbRef, initiator, stream) {
    console.log("RtcModule.js constructor");
    this.initiator = initiator;
    this.dbRef = dbRef;
    this.stream = stream;
    this.onMessage = () => {};
    this.onStream = () => {};

    if (initiator) {
      this.inMessages = this.dbRef.collection("sig_responder");
      this.outMessages = this.dbRef.collection("sig_offerer");
    } else {
      this.inMessages = this.dbRef.collection("sig_offerer");
      this.outMessages = this.dbRef.collection("sig_responder");
    }
  }

  async clearCollection(collectionRef) {
    return collectionRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }

  async connect() {
    console.log("RtcModule.js connect");
    if (this.initiator) {
      await Promise.all([
        this.clearCollection(this.inMessages),
        this.clearCollection(this.outMessages)
      ]);
      await this.dbRef.update({ status: "offer" });
    }

    console.log("RtcModule.js connect, create new peer");
    this.peer = new Peer({
      initiator: this.initiator,
      wrtc: WebRTC,
      trickle: false,
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
      },
      stream: this.stream
    });

    this.peer._debug = (msg, par1, par2) =>
      console.log("RtcModule.js SIMPLE_PEER", msg, par1, par2);

    if (this.signalListnerUnsubscribe) this.signalListnerUnsubscribe();
    this.signalListnerUnsubscribe = this.inMessages.onSnapshot(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log("RtcModule.js new inMessage: ", doc.data());
          this.peer.signal(doc.data());
        });
        // querySnapshot.docChanges().forEach(change => {
        //   if (change.type === "added") {
        //     this.peer.signal(change.doc.data());
        //   }
        // });
      }
    );

    this.peer.on("signal", data => this.outMessages.add(data));
    this.peer.on("stream", this.onStream);
    this.peer.on("data", data => {
      console.log("RtcModule.js on data: " + data);
      this.onMessage(JSON.parse(data));
    });

    return new Promise((resolve, reject) => {
      this.peer.on("error", function(err) {
        console.log("RtcModule.js peer error: ", err);
        reject(err);
      });

      this.peer.on("connect", () => {
        console.log("RtcModule.js SIMPLE_PEER: CONNECTED");
        if (this.initiator) {
          this.dbRef.update({ status: "connected" });
        }
        resolve();
      });
    });
  }

  sendMessage(data) {
    console.log("RtcModule.js sendMessage ", JSON.stringify(data));
    if (this.peer !== null || this.peer != undefined){
      this.peer.send(JSON.stringify(data));
    }
  }

  disconnect() {
    console.log("RtcModule.js sendMessdisconnectge ");
    if (this.signalListnerUnsubscribe) this.signalListnerUnsubscribe();
    this.peer.destroy();
  }

  isConnected() {
    console.log("RtcModule.js isConnected");
    return this.peer && this.peer.connected;
  }
}

export default RtcModule;
