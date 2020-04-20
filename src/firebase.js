import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB3-1Nomjuy1ZHpgdLiM8Aei1BgxBZQwvk",
  authDomain: "asate-task.firebaseapp.com",
  databaseURL: "https://asate-task.firebaseio.com",
  projectId: "asate-task",
  storageBucket: "asate-task.appspot.com",
  messagingSenderId: "263423588946",
  appId: "1:263423588946:web:613fbfc2e4ca4aedad3d8b"
});

const db = firebaseApp.firestore();

export { db };
