import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useNavigate, useLocation } from "react-router-dom";
import "firebase/compat/database";
import "../style/HighScoreBoard.css";

// Initialize Firebase with your configuration
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

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to fetch high scores from the database
const fetchHighScores = async () => {
  const scoresRef = database.ref("scores");
  const snapshot = await scoresRef.orderByChild("score").limitToLast(10).once("value");
  const scores = snapshot.val();
  return scores ? Object.values(scores).sort((a, b) => b.score - a.score) : [];
};

const HighScoreBoard = () => {
  const navigate = useNavigate();
  const [highScores, setHighScores] = useState([]);

  const location = useLocation();
  var username = location.state?.username;

  useEffect(() => {
    const fetchScores = async () => {
      const scores = await fetchHighScores();
      setHighScores(scores);
    };
    fetchScores();
  }, []);


  const goNewGame = () => {
    navigate("/TomatoAPI", { state: { username } });
  }

  return (
    <div className="container2">
      
      <h1>Scoreboard</h1>
      <table className="highscores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/><br/>
      <button
        className="sign-button"
        style={{ width: "250px" }}
        onClick={goNewGame}
      >
        New Game
      </button>
    </div>
  );
};

export default HighScoreBoard;
