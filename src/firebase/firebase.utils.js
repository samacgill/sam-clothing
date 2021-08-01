import firebase from "firebase/app";
// import these separately as quite large
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBsOge-xY3cEx6HjD2L5KXlG3CfhGH-Ixg",
  authDomain: "sam-shopping-db.firebaseapp.com",
  projectId: "sam-shopping-db",
  storageBucket: "sam-shopping-db.appspot.com",
  messagingSenderId: "876316879215",
  appId: "1:876316879215:web:42082ee97c2a1889d3e09a",
  measurementId: "G-BPV82LR26Y",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
