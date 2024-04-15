import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDTHDV__dW8v7x2H7H6IVvZ_4Cl19RDzOA",
  authDomain: "tomato-game-b7281.firebaseapp.com",
  databaseURL: "https://tomato-game-b7281-default-rtdb.firebaseio.com",
  projectId: "tomato-game-b7281",
  storageBucket: "tomato-game-b7281.appspot.com",
  messagingSenderId: "178393927012",
  appId: "1:178393927012:web:e4d5a7a2f28ecab9f0be71",
  measurementId: "G-7HTTX7C0F8",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to fetch high scores from the database
const fetchHighScores = async () => {
  const highScoresRef = ref(database, 'highScores');
  const snapshot = await get(highScoresRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};

export { fetchHighScores };