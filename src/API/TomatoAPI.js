import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/TomatoAPI.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import HighScoreBoard from "../pages/HighScoreBoard";
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import loss from "../sounds/loss.wav";
import won from "../sounds/won.wav";

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

const TomatoAPI = () => {
  const [heart, setHeart] = useState(5);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState(-1);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState(20);
  const [timerRunning, setTimerRunning] = useState(false);
  const [pauseButtonText, setPauseButtonText] = useState("Pause");
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  let wonAudio = new Audio(won);
  let lossAudio = new Audio(loss);

  const navigate = useNavigate();
  const location = useLocation();
  var username = location.state?.username;

  const scoreData = {
    username: location.state?.username,
    score: score,
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/tomato/api.php");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setQuestion(data.question);
      setSolution(data.solution);

      setUserInput("");
      startTimer();
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const heartCountDec = () => {
    setHeart((prevHeart) => {
      lossAudio.play();
      if (prevHeart > 1) {
        prevHeart -= 1;
      } else {
          setGameOver(true);
          stopTimer();
      }
      return prevHeart;
    });
  };
  
  useEffect(() => {
    if (!username) {
      navigate("/");
      return; // Return to prevent further execution of the useEffect hook
    }
  
    // Check if the game is over and push score data to Firebase
    if (gameOver) {
      firebase.database().ref("scores").push(scoreData);
    }
  
    // Timer logic
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            heartCountDec();
            setTime(20);
          }
          return prevTime > 0 ? prevTime - 1 : prevTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [username, navigate, gameOver, timerRunning]);
  

  const checkAnswer = () => {
    if (Number(userInput) === solution) {
      wonAudio.play();
      confetti();
      setScore((score) => score + 10);
      setTime(20);
      fetchData();
    } else {
      heartCountDec();
    }
    clearAnswer();
  };

  const clearAnswer = () => {
    setUserInput("");
  };

  const restartGame = () => {
    setGameOver(false);
    setHeart(5);
    setScore(0);
    stopTimer();
    setTime(20);
    fetchData();
  };

  if (heart === 0) {
    setGameOver(true);
  }

  const handleNumberClick = (number) => {
    setUserInput((prevUserInput) => {
      if (prevUserInput.length < 1) {
        return number.toString();
      }
      return prevUserInput;
    });
  };

  const handleStartGame = () => {
    setStartGame(true);
    fetchData();
  };

  const goToScoreboard = () => {
    navigate("/HighScoreBoard", { state: { username } });
  };

  const pauseGame = () => {
    if (!isPaused) {
      stopTimer();
      setPauseButtonText("Resume Game");
    } else {
      startTimer();
      setPauseButtonText("Pause Game");
    }
    setIsPaused(!isPaused);
  };

  const goLogout = () => {
    navigate("/", { state: { username: null } });
  };

  return (
    <div className="container">
      {!startGame ? (
        <>
          <h1>🍅Welcome to the Tomato Game! Here are the rules:🍅</h1>
          <p>
            🍅Hidden Equations: You'll be presented with mathematical equations,
            and some numbers will be cleverly hidden within tomatoes.
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
            🍅Logout: You can logout anytime using the "Logout" option in the
            navigation menu.
          </p>
          <p>
            🍅Play the Game: Click "Start Game" to begin your Tomato game
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
              <button
                className="sign-button"
                style={{ width: "250px" }}
                onClick={goToScoreboard}
              >
                Scoreboard
              </button>
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
                Answer:{" "}
                <input
                  type="number"
                  className="inp-ans"
                  value={userInput}
                  readOnly
                />
                <button
                  className="sign-button"
                  style={{ width: "150px" }}
                  onClick={checkAnswer}
                  disabled={userInput.length === 0}
                >
                  Check
                </button>
                <button
                  className="sign-button"
                  style={{ width: "150px" }}
                  onClick={clearAnswer}
                >
                  Clear
                </button>
              </div>
              <div className="other-buttons">
                <button className="sign-button" onClick={pauseGame}>
                  {pauseButtonText}
                </button>
                <button className="sign-button" onClick={restartGame}>
                  New Game
                </button>
                <button className="sign-button" onClick={goLogout}>
                  Logout
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TomatoAPI;
