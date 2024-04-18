import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../style/SignUp.css"; // Import your CSS file
import firebase from "firebase/compat/app"; 
import "firebase/compat/database"; 
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

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

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handleSave = async () => {
    // Check if any of the input fields are empty
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return; // Exit the function early
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return; // Exit the function early
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds


    // Write to firebase database
    const userData = {
      username: username,
      email: email,
      password: hashedPassword,
      // password: password,
    };

    firebase.database().ref("users").push(userData);
    console.log("User data saved successfully!");

    // Redirect to Login page
    navigate("/Login");
  };
  return (
    <div className="login-page">
      <h1>🍅SignUp Page🍅</h1>
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
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <br />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <br />
          <button
            type="button"
            className="sign-button"
            style={{
              width: "50%",
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
