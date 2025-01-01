import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyD3ekVBwSwozkTwAfcsaQV70xH6ieN5c5E",
  authDomain: "netflix-model.firebaseapp.com",
  databaseURL: "https://netflix-model-default-rtdb.firebaseio.com",
  projectId: "netflix-model",
  storageBucket: "netflix-model.appspot.com",
  messagingSenderId: "691164101098",
  appId: "1:691164101098:web:c9006dcc179b07edf61a93",
  measurementId: "G-CCESRZG7TK"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};
