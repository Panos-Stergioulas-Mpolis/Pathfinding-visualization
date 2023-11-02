import React from "react";
import Grid from "./Grid/Grid";
import "./index.css" 
import { useState } from "react";

function App() {

  const [Sx, setX] = useState(0);
  const [Sy, setY] = useState(0);

  const [Tx, setTX] = useState(84);
  const [Ty, setTY] = useState(29);

  const [shouldVis, setShouldVis] = useState(false);

  const [clear, setCLear] = useState(false);

  const [alg, setAlg] = useState("A*")

  const handleVisualizeClick = () => {
    setShouldVis(true);
  };

  const handleClearClick = () => {
    setCLear(true);
  }

  return (
    <div className="app">
      <div className='screen'>
        <div className='Sx input'>
            <label>Choose start(x): </label>
            <input
                type='number'
                min={0}
                max={84}
                defaultValue={Sx}
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
                defaultValue={Sy}
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
                defaultValue={Tx}
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
                defaultValue={Ty}
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
          <select id="algorithm" onChange={(e)=>setAlg(e.target.value)}>
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
        <button className="btn" onClick={handleVisualizeClick}>
          Visualize
        </button>

        <button className="btn" onClick={()=>window.location.reload(false)}>
          Reset
        </button>

        <button className="btn" onClick={handleClearClick}>
          Clear Board
        </button>
    </div>
      <Grid sX = {Sx} sY = {Sy} tX = {Tx} tY = {Ty} StastVis={shouldVis} clearBoard={clear} alg = {alg}/>
    </div>
  );
}

export default App;
