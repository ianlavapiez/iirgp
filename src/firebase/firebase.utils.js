import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBYcyXjkcfn78vMGy3poxDnfhRah9JRl_s",
  authDomain: "iirgp-41fb4.firebaseapp.com",
  projectId: "iirgp-41fb4",
  storageBucket: "iirgp-41fb4.appspot.com",
  messagingSenderId: "371996118238",
  appId: "1:371996118238:web:6ef7b3181f6fb6c8de464f",
  measurementId: "G-ZGYZ254PCF",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
