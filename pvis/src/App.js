import React from "react";
import Grid from "./Grid/Grid";
import "./index.css" 
import { useState } from "react";

function App() {

  const [Sx, setX] = useState(0);
  const [Sy, setY] = useState(0);

  const [Tx, setTX] = useState(0);
  const [Ty, setTY] = useState(0);

  console.log(Sx, Sy)

  return (
    <div className="app">
      <div className='screen'>
        <div className='Sx input'>
            <label>Choose x value for the start (0-59)</label>
            <input
                type='number'
                min={0}
                max={59}
                defaultValue={0}
                onChange={(e) =>{
                    setX(e.target.value);
                    if(Sx > 59){
                        setX(59);
                    }
                    if(Sx < 0){
                        setX(0);
                    }
                }}
            />
        </div>
        
        <div className='Sy input'>
            <label>Choose y value for the start (0-59)</label>
            <input
                type='number'
                min={0}
                max={59}
                defaultValue={0}
                onChange={(e) =>{
                    setY(e.target.value);
                    if(Sy > 59){
                        setY(59);
                    }
                    if(Sy < 0){
                        setY(0);
                    }
                }}
            />
        </div>

        <div className='Tx input'>
            <label>Choose x value for the target (0-59)</label>
            <input
                type='number'
                min={0}
                max={59}
                defaultValue={0}
                onChange={(e) =>{
                    setTX(e.target.value);
                    setTY(e.target.value)
                    if(Tx > 59){
                        setX(59);
                    }
                    if(Tx < 0){
                        setX(0);
                    }
                }}
            />
        </div>
        
        <div className='Ty input'>
            <label>Choose y value for the target (0-59)</label>
            <input
                type='number'
                min={0}
                max={59}
                defaultValue={0}
                onChange={(e) =>{
                    setTY(e.target.value);
                    if(Ty > 59){
                        setY(59);
                    }
                    if(Ty < 0){
                        setY(0);
                    }
                    
                }}
            />
        </div>
    </div>
      <Grid sX = {Sx} sY = {Sy} tX = {Tx} tY = {Ty}/>
    </div>
  );
}

export default App;
