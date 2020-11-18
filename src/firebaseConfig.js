import firebase from "firebase/app"
import 'firebase/analytics';
import "firebase/firestore"


const config = {
  apiKey: "AIzaSyD-Suaxu6RSIxfs2bzXMtDgWyo23QavNKg",
  authDomain: "one-local-host.firebaseapp.com",
  databaseURL: "https://one-local-host.firebaseio.com",
  projectId: "one-local-host",
  storageBucket: "one-local-host.appspot.com",
  messagingSenderId: "966167877884",
  appId: "1:966167877884:web:1530a1312baa09fc439f79",
  measurementId: "G-F4B0EVKM39"
};

firebase.initializeApp(config)
firebase.analytics();
export default firebase
export const firestore = firebase.firestore()
