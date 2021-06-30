import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// setup our firestore config to connect to our db. apiKey is public and protected by google. no need to hid it via .env file
const config = {
  apiKey: "AIzaSyDPQaNGPC2f15v_2u8cD7OjwLeLZDaZtlc",
  authDomain: "crwn-db-bbc45.firebaseapp.com",
  projectId: "crwn-db-bbc45",
  storageBucket: "crwn-db-bbc45.appspot.com",
  messagingSenderId: "573867666647",
  appId: "1:573867666647:web:8f8bddbc07de334d78d492",
  measurementId: "G-SXZ7LYMJJ6",
};

// Grab the userAuth object from the sign-in with google to create a document in our Firestore db.
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // when a user signs out, the userAuth object is null. In this case, the function will exit.
  if (!userAuth) return;

  // query firestore with .doc and the userId(uid) to create our queryReference. Which will lead us to our snapShot
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // use our queryReference to create a snapShot using firestore CRUD methods
  const snapShot = await userRef.get();

  // the snapShot provides an exists property that will be true or false depending on if the account exists in our firestore
  // if the snapShot does not exist, then create a new user in our db using the user's google account information
  if(!snapShot.exists) {
    // destructure our userAuth object
    const { displayName, email } = userAuth;
    // log when the account was created
    const createdAt = new Date();

    // try/catch to either create a new user in our firestore db or throw an error
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  // return our userRef so we can use it in our App.js to display user specific info. Will most likely edit this later on.
  return userRef;
}

// intialize our firebase db using our config object
firebase.initializeApp(config);

// setup our exports to our App.js file to have access to firebase methods
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setup our google signin via firebase
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
