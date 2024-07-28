"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCuL55CCuuA9bIrJGhrQbc94Eh8B4vrnxM",
  authDomain: "otp-loulou-boutiqaat.firebaseapp.com",
  projectId: "otp-loulou-boutiqaat",
  storageBucket: "otp-loulou-boutiqaat.appspot.com",
  messagingSenderId: "333782417263",
  appId: "1:333782417263:web:7e53f6d906106109af329a",
  measurementId: "G-T4FWCDG1NW"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)(app);
var _default = auth;
exports["default"] = _default;