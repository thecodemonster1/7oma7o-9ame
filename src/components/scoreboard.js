import React, { useState, useEffect } from "react";
import { fetchHighScores } from "../components/firebase.js";
import "../style/HighScoreBoard.css";
import firebase from "firebase/compat/app";
import "firebase/compat/database";


const HighScoreBoard = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scores = await fetchHighScores();
      console.log("High Scores:", scores); // Check scores in console
      setHighScores(scores);
    };
    fetchScores();
  }, []);

  return (
    <div className="container">
      <h1>High Score Board</h1>
      <table className="highscores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {highScores && highScores.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighScoreBoard;