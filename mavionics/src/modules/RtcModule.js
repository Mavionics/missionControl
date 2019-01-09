/* eslint-disable no-console */

class RtcModule {
  constructor(dbRef, isTX) {
    console.log("Loaded RtcModule");
    this.isTX = isTX;
    this.dbRef = dbRef;
    this.onMessage = () => {};
    this.onStream = () => {};
    if (this.isTX) {
      this.outMsgs = this.dbRef.collection("toRX");
      this.inMsgs = this.dbRef.collection("toTX");
    } else {
      this.outMsgs = this.dbRef.collection("toTX");
      this.inMsgs = this.dbRef.collection("toRX");
    }

    this.outMsgs.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });

    // this.inMsgs.get().then(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     doc.ref.delete();
    //   });
    // });

    this.pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "testtest",
          username: "alex.o.poole@gmail.com"
        }
      ]
    });

    this.pc.onicecandidate = event =>
      event.candidate
        ? this._sendICE({ ice: JSON.stringify(event.candidate) })
        : console.log("Sent All Ice");

    this.pc.onaddstream = event => this.onStream(event);

    this.dbRef.onSnapshot(doc => {
      if (!this.isTX && doc.data().status === "offer") {
        let off = JSON.parse(doc.data().offer);
        this.pc
          .setRemoteDescription(new RTCSessionDescription(off.sdp))
          .then(() => this.pc.createAnswer())
          .then(answer => this.pc.setLocalDescription(answer))
          .then(() => {
            this.dbRef.update({
              answer: JSON.stringify({ sdp: this.pc.localDescription }),
              status: "answer"
            });
          });
      } else if (this.isTX && doc.data().status === "answer") {
        let ans = JSON.parse(doc.data().answer);
        this.pc
          .setRemoteDescription(new RTCSessionDescription(ans.sdp))
          .then(() => {
            this.dbRef.update({ status: "ICE" });
          });
      } else if (doc.data().status == "ICE") {
        this.inMsgs.onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            let d = doc.data();
            if (d.message === undefined) return;
            let msg = d.message;
            console.log(msg);

            this.pc.addIceCandidate(new RTCIceCandidate(JSON.parse(msg.ice)));
            doc.ref.delete();
          });
        });
      }
    });
  }

  addStream(stream) {
    this.pc.addStream(stream);
  }

  sendMessage() {}

  sendAnswer() {
    return this.pc.createOffer();
  }

  sendOffer() {
    return this.pc
      .createOffer()
      .then(offer => this.pc.setLocalDescription(offer))
      .then(() => {
        // this.dbRef.collection("iceOffer").delete();
        this.dbRef.update({
          status: "offer",
          offer: JSON.stringify({ sdp: this.pc.localDescription }),
          answer: null
        });
      });
  }

  inAwhile(msg) {
    window.setTimeout(() => {
      this.onMessage(msg);
    }, 5000);
  }

  _sendICE(data) {
    this.outMsgs.add({ message: data });
  }
}

export default RtcModule;
