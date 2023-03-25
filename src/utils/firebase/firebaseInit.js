// Import Firebase Configuration file
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBeba7CB9IVJ-cLTYp6FmAkliUJmzt_Rhc",
  authDomain: "dopot-a8409.firebaseapp.com",
  projectId: "dopot-a8409",
  storageBucket: "dopot-a8409.appspot.com",
  messagingSenderId: "402856554024",
  appId: "1:402856554024:web:50a0a71d1aa5ff0e694f1d",
  measurementId: "G-MTEEVBM5YW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);