// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAty-hf0q_hcAWfoVe5NLrA-oZVsibJz0U",
  authDomain: "chatfliix.firebaseapp.com",
  projectId: "chatfliix",
  storageBucket: "chatfliix.appspot.com",
  messagingSenderId: "495162901579",
  appId: "1:495162901579:web:7dc0d5a1b80841f86179ce",
  measurementId: "G-X5R3B1XFG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()