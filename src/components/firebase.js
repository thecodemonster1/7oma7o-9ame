// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getdatabase }  from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTHDV__dW8v7x2H7H6IVvZ_4Cl19RDzOA",
  authDomain: "tomato-game-b7281.firebaseapp.com",
  databaseURL: "https://tomato-game-b7281-default-rtdb.firebaseio.com",
  projectId: "tomato-game-b7281",
  storageBucket: "tomato-game-b7281.appspot.com",
  messagingSenderId: "178393927012",
  appId: "1:178393927012:web:e4d5a7a2f28ecab9f0be71",
  measurementId: "G-7HTTX7C0F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);