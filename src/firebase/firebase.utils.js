import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDPQaNGPC2f15v_2u8cD7OjwLeLZDaZtlc",
  authDomain: "crwn-db-bbc45.firebaseapp.com",
  projectId: "crwn-db-bbc45",
  storageBucket: "crwn-db-bbc45.appspot.com",
  messagingSenderId: "573867666647",
  appId: "1:573867666647:web:8f8bddbc07de334d78d492",
  measurementId: "G-SXZ7LYMJJ6",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
