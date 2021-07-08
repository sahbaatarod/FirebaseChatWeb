import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDCkByR9z676xctbnJux6f7yl7wIpvGYCc",
  authDomain: "fir-friendlychat-76733.firebaseapp.com",
  databaseURL: "https://fir-friendlychat-76733-default-rtdb.firebaseio.com",
  projectId: "fir-friendlychat-76733",
  storageBucket: "fir-friendlychat-76733.appspot.com",
  messagingSenderId: "215750187141",
  appId: "1:215750187141:web:1182849f28aba25eb031ec",
  measurementId: "G-HQBWYF90RM",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const realDb = firebase.database();
export { db, auth, firebaseApp, realDb };
