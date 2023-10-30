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
            <label>Choose start(x): </label>
            <input
                type='number'
                min={0}
                max={84}
                defaultValue={0}
                onChange={(e) =>{
                    setX(e.target.value);
                    if(e.target.value > 84){
                        setX(84);
                    }
                    if(e.target.value < 0){
                        setX(0);
                    }
                }}
            />
        </div>
        
        <div className='Sy input'>
            <label>Choose start(y): </label>
            <input 
                type='number'
                min={0}
                max={29}
                defaultValue={0}
                onChange={(e) =>{
                    setY(e.target.value);
                    if(e.target.value > 29){
                        setY(29);
                    }
                    if(e.target.value < 0){
                        setY(0);
                    }
                }}
            />
        </div>

        <div className='Tx input'>
            <label>Choose target(x): </label>
            <input
                type='number'
                min={0}
                max={84}
                defaultValue={84}
                onChange={(e) =>{
                    setTX(e.target.value);
                    if(e.target.value > 84){
                        setTX(84);
                    }
                    if(e.target.value < 0){
                        setTX(0);
                    }
                }}
            />
        </div>
        
        <div className='Ty input'>
            <label>Choose target(y): </label>
            <input
                type='number'
                min={0}
                max={29}
                defaultValue={29}
                onChange={(e) =>{
                    setTY(e.target.value);
                    if(e.target.value > 29){
                        setTY(29);
                    }
                    if(e.target.value < 0){
                        setTY(0);
                    }
                    
                }}
            />
        </div>

        <div className="algorithm">
          <label>Algorithm: </label>
          <select>
            <option>A*</option>
            <option>Dijkstra</option>
            <option>BFS</option>
            <option>DFS</option>
          </select>
        </div>
        <div>
           Press D to start and stop drawing
        </div>
        <div>
           Press E to start and stop erasing
        </div>
        <button className="btn">
          Visualize
        </button>

        <button className="btn" onClick={()=>window.location.reload(false)}>
          Reset
        </button>
    </div>
      <Grid sX = {Sx} sY = {Sy} tX = {Tx} tY = {Ty}/>
    </div>
  );
}

export default App;
