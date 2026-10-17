// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCuL55CCuuA9bIrJGhrQbc94Eh8B4vrnxM",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "otp-loulou-boutiqaat.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "otp-loulou-boutiqaat",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "otp-loulou-boutiqaat.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "333782417263",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:333782417263:web:7e53f6d906106109af329a",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-T4FWCDG1NW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
export default auth;