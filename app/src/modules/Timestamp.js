import firebase from "firebase/app";
import "firebase/firestore";

export function createTimestamp(){
  return new new firebase.firestore.Timestamp.now();
}