// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage' ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCluz8uhpE5p9SkH24sImzfUEStqKo9UfQ",
  authDomain: "sticky-notes-wall.firebaseapp.com",
  projectId: "sticky-notes-wall",
  storageBucket: "sticky-notes-wall.appspot.com",
  messagingSenderId: "488282584459",
  appId: "1:488282584459:web:be8520896d6edc10d6eb8e",
  measurementId: "G-S83EY3E947"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {firestore , analytics , auth , storage} 