import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Assuming your main component is named App
import { BrowserRouter } from "react-router-dom";
// import GameOver from "./components/GameOver";
// import HighScoreBoard from "./components/HighScoreBoard";
import './style/index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
