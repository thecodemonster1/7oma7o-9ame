import React, { useEffect, useState } from "react";
import "../style/GameOver.css";

const GameOver = () => {
  const [isContainerReady, setIsContainerReady] = useState(false);

  useEffect(() => {
    setIsContainerReady(true);
  }, []);

  useEffect(() => {
    if (!isContainerReady) return; // Exit if element not ready

    const confettiContainer = document.querySelector(".confetti-container");
    if (!confettiContainer) return; // Exit if element not found

    const confettiColors = [
      "#EF2964",
      "#00C09D",
      "#2D87B0",
      "#48485E",
      "#EFFF1D",
    ];
    const confettiAnimations = [
      "confetti--animation-slow",
      "confetti--animation-medium",
      "confetti--animation-fast",
    ];

    const createConfettiPiece = () => {
      const confettiEl = document.createElement("div");
      const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
      const confettiBackground =
        confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const confettiLeft =
        Math.floor(Math.random() * confettiContainer.offsetWidth) + "px";
      const confettiAnimation =
        confettiAnimations[
          Math.floor(Math.random() * confettiAnimations.length)
        ];

      confettiEl.classList.add("confetti", confettiAnimation);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);

      confettiContainer.appendChild(confettiEl);
    };

    const interval = setInterval(createConfettiPiece, 25);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [isContainerReady]);

  return (
    <div className="container">
      {isContainerReady && <div className="confetti-container"></div>}
      {/* <h1>Game Over</h1>
      <h3>Your Score is {finalScore}</h3>
      <button
        className="sign-button"
        style={{ width: "250px" }}
        // onClick={handleRestartGame} // Use the passed-in prop for restart
      >
        New Game
      </button> */}
    </div>
  );
};

export default GameOver;
