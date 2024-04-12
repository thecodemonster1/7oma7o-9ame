import React from "react";
import "../style/Description.css";
import TomatoAPI from '../API/TomatoAPI.js' ;

import { useNavigate } from "react-router-dom";


const Description = ({username}) => {
  const navigate = useNavigate();
  return (
    <TomatoAPI />
  );
};

export default Description;
