// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {collection, addDoc, getDocs, setDoc, getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpyhG32gVhZ0fNEHBsQiDytT1Q1Fareno",
  authDomain: "daytrip-79e2b.firebaseapp.com",
  projectId: "daytrip-79e2b",
  storageBucket: "daytrip-79e2b.appspot.com",
  messagingSenderId: "134289424194",
  appId: "1:134289424194:web:a5a018f97932a12f4152db",
  measurementId: "G-BK303MD88W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default db;