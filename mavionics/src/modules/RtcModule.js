/* eslint-disable no-console */
import Peer from "simple-peer";

class RtcModule {
  constructor(dbRef, initiator, stream) {
    this.initiator = initiator;
    this.dbRef = dbRef;
    this.stream = stream;
    this.onMessage = () => {};
    this.onStream = () => {};

    if (initiator) {
      this.inMessages = this.dbRef.collection("sig_offerer");
      this.outMessages = this.dbRef.collection("sig_responder");
    } else {
      this.inMessages = this.dbRef.collection("sig_responder");
      this.outMessages = this.dbRef.collection("sig_offerer");
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
    if (this.initiator) {
      await Promise.all([
        this.clearCollection(this.inMessages),
        this.clearCollection(this.outMessages)
      ]);

      await this.dbRef.update({ status: "offer" });
    }

    this.p = new Peer({
      initiator: this.initiator,
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

    this.inMessages.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.p.signal(doc.data());
      });
    });

    this.p.on("signal", data => this.outMessages.add(data));
    this.p.on("stream", this.onStream);
    this.p.on("data", this.onMessage);

    return new Promise((resolve, reject) => {
      this.p.on("error", function(err) {
        console.log("error", err);
        reject(err);
      });

      this.p.on("connect", () => {
        this.dbRef.update({ status: "connected" });
        resolve();
      });
    });
  }

  sendMessage(data) {
    if (this.p !== null) this.p.send(data);
  }

  disconnect() {
    this.p.disconnect();
  }
}

export default RtcModule;
