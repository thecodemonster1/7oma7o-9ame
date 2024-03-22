import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../style/Login.css";
import firebase from "firebase/compat/app"; // Import the Firebase module
import "firebase/compat/database"; // Import the Firebase Realtime Database module
import { useNavigate } from "react-router-dom";

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
const database = firebase.database(); // Initialize the database

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const logInfun = async () => {
    try {
      // Fetch user data for the entered username
      const snapshot = await database.ref("users").orderByChild("username").equalTo(username).once("value");
      const userData = snapshot.val();

      if (!userData) {
        alert("User not found. Please sign up.");
        return;
      }

      // Check if the entered password matches the database password
      if (userData[Object.keys(userData)[0]].password !== password) {
        alert("Incorrect password. Please try again.");
        return;
      }

      // Redirect to the description page if the username and password are correct
      navigate("/description");
    } catch (error) {
      console.log("Error logging in:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  const redirectToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <h1>
        <span role="img" aria-label="tomato">🍅</span>Login Page
        <span role="img" aria-label="tomato">🍅</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <br />
          <p className="register-text">
            Don't have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={redirectToSignUp}
            >
              Register here
            </span>
          </p>
          <button type="submit" className="sign-button" onClick={logInfun}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
