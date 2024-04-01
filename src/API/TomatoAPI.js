import React, { useState, useEffect } from "react";
import "../style/TomatoAPI.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import GameOver from "../components/GameOver";

function TomatoAPI() {
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
        console.log("Game Over!");
        setGameOver(true);
        GameOver();
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

  // const GameOver = () => {
  //   const Confettiful = function (el) {
  //     this.el = el;
  //     this.containerEl = null;

  //     this.confettiFrequency = 3;
  //     this.confettiColors = [
  //       "#EF2964",
  //       "#00C09D",
  //       "#2D87B0",
  //       "#48485E",
  //       "#EFFF1D",
  //     ];
  //     this.confettiAnimations = ["slow", "medium", "fast"];

  //     this._setupElements();
  //     this._renderConfetti();
  //   };

  //   Confettiful.prototype._setupElements = function () {
  //     const containerEl = document.createElement("div");
  //     const elPosition = this.el.style.position;

  //     if (elPosition !== "relative" || elPosition !== "absolute") {
  //       this.el.style.position = "relative";
  //     }

  //     containerEl.classList.add("confetti-container");

  //     this.el.appendChild(containerEl);

  //     this.containerEl = containerEl;
  //   };

  //   Confettiful.prototype._renderConfetti = function () {
  //     this.confettiInterval = setInterval(() => {
  //       const confettiEl = document.createElement("div");
  //       const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
  //       const confettiBackground =
  //         this.confettiColors[
  //           Math.floor(Math.random() * this.confettiColors.length)
  //         ];
  //       const confettiLeft =
  //         Math.floor(Math.random() * this.el.offsetWidth) + "px";
  //       const confettiAnimation =
  //         this.confettiAnimations[
  //           Math.floor(Math.random() * this.confettiAnimations.length)
  //         ];

  //       confettiEl.classList.add(
  //         "confetti",
  //         "confetti--animation-" + confettiAnimation
  //       );
  //       confettiEl.style.left = confettiLeft;
  //       confettiEl.style.width = confettiSize;
  //       confettiEl.style.height = confettiSize;
  //       confettiEl.style.backgroundColor = confettiBackground;

  //       confettiEl.removeTimeout = setTimeout(function () {
  //         confettiEl.parentNode.removeChild(confettiEl);
  //       }, 3000);

  //       this.containerEl.appendChild(confettiEl);
  //     }, 25);
  //   };

  //   // Stop the confetti animation after 5 seconds
  //   setTimeout(() => {
  //     clearInterval(window.confettiful.confettiInterval);
  //   }, 5000);

  //   const confettiful = new Confettiful(document.querySelector(".container"));
  // };

  return (
    <div className="container">
      {!startGame ? (
        <button className="sign-button" onClick={handleStartGame}>
          Start Game
        </button>
      ) : (
        <>
          {gameOver ? (
            <>
              <h1>Game Over</h1>
              <h3>Your Score is {score}</h3>
              <button
                className="sign-button"
                style={{ width: "250px" }}
                onClick={restartGame}
              >
                New Game
              </button>
              {/* <GameOver finalScore={score} /> */}
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
}

export default TomatoAPI;
