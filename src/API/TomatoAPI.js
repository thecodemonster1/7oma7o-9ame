// import React, { useState, useEffect } from "react";
// import "../style/TomatoAPI.css"; // Import your CSS file

// function TomatoAPI() {
//   const [question, setQuestion] = useState("");
//   const [APIsolution, setAPIsolution] = useState("");
//   const [userInput, setUserInput] = useState("");
//   const [error, setError] = useState("");
//   const [time, setTime] = useState(0);
//   const [timerRunning, setTimerRunning] = useState(false);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();
//       console.log("API - Question = " + data.question);
//       console.log("API - Solution = " + data.solution);
//       setQuestion(data.question);
//       setAPIsolution(data.solution);
//       startTimer(); // Start the timer when new question is fetched
//     } catch (error) {
//       setError(error);
//       console.error("Error:", error);
//     }
//   };

//   const startTimer = () => {
//     setTimerRunning(true);
//     setTime(0);
//   };

//   const stopTimer = () => {
//     setTimerRunning(false);
//   };

//   useEffect(() => {
//     let interval;
//     if (timerRunning) {
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [timerRunning]);

//   const restartGame = () => {
//     stopTimer();
//     fetchData();
//   };

//   const handleAnswerClick = (answer) => {
//     setUserInput((prevUserInput) => prevUserInput + answer);
//   };

//   return (
//     <div className="container">
//       <div className="timer">Time: {time} seconds</div>
//       <div className="question-container">
//         <img src={question} alt="Question" />
//       </div>
//       <div className="number-buttons">
//         {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
//           <button key={number} onClick={() => handleAnswerClick(number)}>
//             {number}
//           </button>
//         ))}
//       </div>
//       <div className="answer">Answer: {userInput}</div>
//       <button className="restart-button" onClick={restartGame}>Restart Game</button>
//     </div>
//   );
// }

// export default TomatoAPI;

import React, { useState, useEffect } from "react";
import "../style/TomatoAPI.css";

function TomatoAPI() {
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState(-1);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

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
      alert("Correct! ");
      restartGame();
    } else {
      alert("Incorrect. Try again!");
    }
  };

  const restartGame = () => {
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

  return (
    <div className="container">
      {error && <div className="error">Error: {error}</div>}
      <div className="timer">Time: {time} seconds</div>
      <div className="question-container">
        <img src={question} alt="Question" />
      </div>
      <div className="number-buttons">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
      </div>
      <div className="answer">
        Answer:
        <input type="number" value={userInput} readOnly />
        <button
          className="check-button"
          onClick={checkAnswer}
          disabled={userInput.length === 0}
        >
          Check Answer
        </button>
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

export default TomatoAPI;
