import { db } from "@/store/actions.js";
import firebase from "firebase/app";

class SignalingModule {
  constructor(avId, initiator) {
    this.dbRef = db.doc(`/vehicles/${avId}`);
    this.initiator = initiator;
    this.onMessage = () => { };
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
    if (this.initiator) {
      await Promise.all([
        this.clearCollection(this.inMessages),
        this.clearCollection(this.outMessages)
      ]);
    }

    if (this.signalListnerUnsubscribe) this.signalListnerUnsubscribe();

    this.signalListnerUnsubscribe = this.inMessages.onSnapshot(
      querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            console.debug("onMessage: ", change.doc.data());
            this.onMessage(change.doc.data())
          }
        });
      }
    );

    await this.dbRef.update({ status: "offer" });
  }

  async setConnected() {
    if (this.initiator) {
      await this.dbRef.update({ status: "connected" });
    }
  }

  async sendMessage(data) {
    this.outMessages.add(data);
  }

  async sendHeartBeat(data) {
    this.dbRef.update({
      timestamp: firebase.firestore.Timestamp.fromMillis(data.timestamp),
      position: new firebase.firestore.GeoPoint(data.latitude, data.longitude)
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default SignalingModule;
