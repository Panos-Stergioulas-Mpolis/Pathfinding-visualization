import React from "react";
import Grid from "./Grid/Grid";
import "./index.css" 
import { useState } from "react";

function App() {

  const [Sx, setX] = useState(0);
  const [Sy, setY] = useState(0);

  const [Tx, setTX] = useState(84);
  const [Ty, setTY] = useState(29);

  console.log(Sx, Sy)

  return (
    <div className="app">
      <div className='screen'>
        <div className='Sx input'>
            <label>Choose x value for the start (0-84)</label>
            <input
                type='number'
                min={0}
                max={84}
                defaultValue={0}
                onChange={(e) =>{
                    setX(e.target.value);
                    if(Sx > 84){
                        setX(84);
                    }
                    if(Sx < 0){
                        setX(0);
                    }
                }}
            />
        </div>
        
        <div className='Sy input'>
            <label>Choose y value for the start (0-29)</label>
            <input
                type='number'
                min={0}
                max={29}
                defaultValue={0}
                onChange={(e) =>{
                    setY(e.target.value);
                    if(Sy > 29){
                        setY(29);
                    }
                    if(Sy < 0){
                        setY(0);
                    }
                }}
            />
        </div>

        <div className='Tx input'>
            <label>Choose x value for the target (0-84)</label>
            <input
                type='number'
                min={0}
                max={84}
                defaultValue={84}
                onChange={(e) =>{
                    setTX(e.target.value);
                    if(Tx > 84){
                        setTX(84);
                    }
                    if(Tx < 0){
                        setTX(0);
                    }
                }}
            />
        </div>
        
        <div className='Ty input'>
            <label>Choose y value for the target (0-29)</label>
            <input
                type='number'
                min={0}
                max={29}
                defaultValue={29}
                onChange={(e) =>{
                    setTY(e.target.value);
                    if(Ty > 29){
                        setTY(29);
                    }
                    if(Ty < 0){
                        setTY(0);
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
