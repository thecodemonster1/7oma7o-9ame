import React from "react";
import "../style/Description.css";
import TomatoAPI from '../API/TomatoAPI.js' ;

import { useNavigate } from "react-router-dom";


const Description = () => {
  const navigate = useNavigate();
  return (
    <div className="description-container">
      <h1>🍅Welcome to the Tomato Game! Here are the rules:🍅</h1>
      <p>
      🍅Hidden Equations: You'll be presented with mathematical equations, and some
        numbers will be cleverly hidden within tomatos.
      </p>
      <p>
      🍅Find the Numbers: Your task is to identify the hidden numbers within the
        tomatoes.
      </p>
      <p>
      🍅Hearts System: You start with 5 hearts. You'll lose a heart if you fail to
        provide a correct answer.
      </p>
      <p>
      🍅Losing Hearts: Losing all hearts ends the challenge. Accuracy and speed are
        crucial to maintaining your hearts.
      </p>
      <p>
      🍅HighScoreboard: Successfully complete challenges to earn a spot on the
        highScoreboard. Complete with others and showcase your tomato-solving skills.
      </p>
      <p>
      🍅Logout:You can logout anytime using the "Logout" option in the navigation menu.
      </p>
      <p>
      🍅Play the Game:Click "Play the Game"to begin your Tomato game adventure.
      </p>
      <button className="play-button" onClick={() => navigate("/TomatoAPI")}>
        Play the Game
      </button>
    </div>
  );
};

export default Description;