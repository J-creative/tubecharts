import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBQ4HoKB5aAx2vV5RgW97v-qflPqY_dH64",
    authDomain: "tube-charts.firebaseapp.com",
    projectId: "tube-charts",
    storageBucket: "tube-charts.appspot.com",
    messagingSenderId: "512758390722",
    appId: "1:512758390722:web:995a325a0046ee44ae405b",
    measurementId: "G-6XZGF76345"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const ana = firebase.analytics();
const db = firebase.firestore();

export { ana, db };