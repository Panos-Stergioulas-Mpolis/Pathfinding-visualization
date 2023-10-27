import React from "react";
import Grid from "./Grid/Grid";
import "./index.css"
import SecScreen from "./Selection Screen/SecScreen";
import { useState } from "react";

function App() {

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [targetX, setTargetX] = useState(59);
    const [targetY, setTargetY] = useState(59);

  function passStartValues(x, y){
    setStartX(x);
    setStartY(y);
    console.log(x, y)
  }

  function passTargetValues(x, y){
    setTargetX(x);
    setTargetY(y);
  }

  return (
    <div className="app">
      <SecScreen changeStart = {passStartValues} changeTarget ={passTargetValues}/>
      <Grid sX = {startX} sY = {startY} tX = {targetX} tY = {targetY}/>
    </div>
  );
}

export default App;
