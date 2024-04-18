import React from "react";
import imageUrl from "./images/main7.jpg";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import TomatoAPI from "./API/TomatoAPI.js";
import HighScoreBoard from "./pages/HighScoreBoard.js";
//*import './App.css';*/ // Import the CSS file

const MainPage = () => {

  // const location = useLocation();
  // var username = null;

  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Center content vertically
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "65px",
          marginBottom: "2rem",
          textAlign: "right",
          color: "white",
          marginLeft: "5rem",
        }}
      >
        🍅Tomato Game🍅
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          className="sign-button"
          style={{
            fontSize: "20px",
            padding: "24px 48px",
            marginBottom: "1rem",
            width: "75%",
          }}
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          className="sign-button"
          style={{
            fontSize: "20px",
            padding: "24px 48px",
            marginBottom: "1rem",
            width: "75%",
          }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/HighScoreBoard" element={<HighScoreBoard />} />
        <Route path="/TomatoAPI" element={<TomatoAPI />} />
      </Routes>
    </div>
  );
};

export default App;
