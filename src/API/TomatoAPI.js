import React, { useState, useEffect } from "react";
import "../style/TomatoAPI.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import GameOver from "../components/GameOver";

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

const TomatoAPI = ({ username }) => {
  const [heart, setHeart] = useState(5);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState(-1);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [restartButtonText, setRestartButtonText] = useState("Start Game");
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);
  // Write to firebase database
  const scoreData = {
    username: username,
    score: score,
  };

  const fetchData = async () => {
    try {
      // Fetch data from the Tomato API endpoint
      const response = await fetch("https://marcconrad.com/uob/tomato/api.php");

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parse the response data as JSON
      const data = await response.json();

      // Log the fetched question and solution to the console
      console.log("API - Question =", data.question);
      console.log("API - Solution =", data.solution);

      // Set the fetched question and solution in the component's state
      setQuestion(data.question);
      setSolution(data.solution);

      // Reset user input
      setUserInput("");

      // Start the timer
      startTimer();
    } catch (error) {
      // Handle errors if any
      setError(error.message);
      console.error("Error:", error);
    }
  };

  const startTimer = () => {
    setTimerRunning(true);
    setTime(0);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const checkAnswer = () => {
    if (Number(userInput) === solution) {
      setScore(score + 10);
      alert("Correct!");
      fetchData();
      // restartGame();
    } else {
      const newHeart = heart - 1;
      setHeart(newHeart);
      // alert(`Incorrect. Try again! \n You have left ${newHeart} lives more`);

      // Reset user input
      setUserInput("");

      if (newHeart <= 0) {
        console.log(username + " is Game Over!");
        setGameOver(true);
        firebase.database().ref("scores").push(scoreData);
        // GameOver();
        stopTimer();
      }
    }
  };

  const restartGame = () => {
    setRestartButtonText("New Game");
    setGameOver(false);
    setHeart(5);
    setScore(0);
    stopTimer();
    fetchData();
  };

  const handleNumberClick = (number) => {
    setUserInput((prevUserInput) => {
      if (prevUserInput.length < 1) {
        // Allowing only single-digit input
        return number.toString();
      }
      return prevUserInput;
    });
  };

  const handleStartGame = () => {
    setStartGame(true);
    fetchData();
  };

  console.log("scoreData saved successfully!");

  return (
    <div className="container">
      {!startGame ? (
        <>
          <h1>🍅Welcome to the Tomato Game! Here are the rules:🍅</h1>
          <p>
            🍅Hidden Equations: You'll be presented with mathematical equations,
            and some numbers will be cleverly hidden within tomatos.
          </p>
          <p>
            🍅Find the Numbers: Your task is to identify the hidden numbers
            within the tomatoes.
          </p>
          <p>
            🍅Hearts System: You start with 5 hearts. You'll lose a heart if you
            fail to provide a correct answer.
          </p>
          <p>
            🍅Losing Hearts: Losing all hearts ends the challenge. Accuracy and
            speed are crucial to maintaining your hearts.
          </p>
          <p>
            🍅HighScoreboard: Successfully complete challenges to earn a spot on
            the highScoreboard. Complete with others and showcase your
            tomato-solving skills.
          </p>
          <p>
            🍅Logout:You can logout anytime using the "Logout" option in the
            navigation menu.
          </p>
          <p>
            🍅Play the Game:Click "Start Game"to begin your Tomato game
            adventure.
          </p>
          <button className="sign-button" onClick={handleStartGame}>
            Start Game
          </button>
        </>
      ) : (
        <>
          {gameOver ? (
            <>
              <h1>Game Over</h1>
              <h3>
                {username}'s Score is {score}
              </h3>
              <button
                className="sign-button"
                style={{ width: "250px" }}
                onClick={restartGame}
              >
                New Game
              </button>
              {/* <GameOver /> */}
            </>
          ) : (
            <>
              {error && <div className="error">Error: {error}</div>}
              <div className="timer">Time: {time} seconds</div>
              <div className="heart-icons">
                {[...Array(heart)].map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faHeart} />
                ))}
              </div>
              <div className="question-container">
                <img src={question} alt="Question" />
              </div>
              <div className="number-buttons">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <button
                    key={number}
                    onClick={() => handleNumberClick(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <div className="answer">
                Answer:
                <input
                  type="number"
                  className="inp-ans"
                  value={userInput}
                  readOnly
                />
                <button
                  className="sign-button"
                  style={{
                    width: "150px",
                  }}
                  onClick={checkAnswer}
                  disabled={userInput.length === 0}
                >
                  Check
                </button>
              </div>

              <button className="sign-button" onClick={restartGame}>
                New Game
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TomatoAPI;
