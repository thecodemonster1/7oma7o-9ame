import React, { useState, useEffect } from "react";
import "../style/TomatoAPI.css";

function TomatoAPI() {
  const [score, setScore] = useState(5);
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
      alert("Correct!");
      restartGame();
    } else {
      const newScore = score - 1;
      setScore(newScore);
      alert(`Incorrect. Try again! \n Score: ${newScore}`);

      // Reset user input
      setUserInput("");

      if (newScore <= 0) {
        console.log("Game Over!");
        setGameOver(true);
        stopTimer();
      }
    }
  };

  const restartGame = () => {
    setRestartButtonText("New Game");
    setGameOver(false);
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
              <button className="sign-button" onClick={restartGame}>
                New Game
              </button>
            </>
          ) : (
            <>
              {error && <div className="error">Error: {error}</div>}
              <div className="timer">Time: {time} seconds</div>
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
