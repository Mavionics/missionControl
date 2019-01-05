import PhySim from "@/sim/simPhysics";
import { firestore } from "firebase";

class SimController {
  constructor(firebaseDocument) {
    this.physics = new PhySim(Date.now());
    this.timer = 0;
    this.doc = firebaseDocument;
  }

  start() {
    console.log("Started");
    this.timer = setInterval(() => {
      this.physics.step(1);
      console.log(this.physics.getState());
      let simState = this.physics.getState();
      this.doc
        .update({
          timestamp: firestore.Timestamp.fromMillis(this.physics.getTime()),
          position: new firestore.GeoPoint(
            simState.latitude,
            simState.longitude
          ),
          status: "online"
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(err => {
          // eslint-disable-next-line
          log.error(err);
        });
    }, 1000);
  }

  stop() {
    console.log("Stoped at " + this.physics.getState().timestamp);
    clearInterval(this.timer);
  }
}

export default SimController;
