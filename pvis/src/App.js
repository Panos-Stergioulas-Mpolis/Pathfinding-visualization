import React from "react";
import Grid from "./Grid/Grid";
import "./index.css";
import { useState } from "react";

function App() {
  const [Sx, setX] = useState(0);
  const [Sy, setY] = useState(0);

  const [Tx, setTX] = useState(49);
  const [Ty, setTY] = useState(14);

  const [shouldVis, setShouldVis] = useState(false);

  const [clear, setCLear] = useState(false);

  const [alg, setAlg] = useState("A*");

  const [totalNodes, setTOtalNodes] = useState(0);
  const [pathLenght, setPathLength] = useState(0);

  const handleVisualizeClick = () => {
    setShouldVis(true);
  };

  const handleClearClick = () => {
    setCLear(true);
  };

  const handleStats = (x, y) => {
    setTOtalNodes(x);
    setPathLength(y);
  };

  return (
    <div className="app">
      <div className="screen">
        <div className="algorithm">
          <select
            id="algorithm"
            onChange={(e) => {
              setAlg(e.target.value);
              setShouldVis(false);
            }}
          >
            <option>A*</option>
            <option>Dijkstra</option>
            <option>BFS</option>
            <option>DFS</option>
          </select>
        </div>

        <div className="btn" onClick={() => window.location.reload(false)}>
          Reset
        </div>

        <div className="btn" onClick={handleClearClick}>
          Clear Board
        </div>
        <div className="btn vis" onClick={handleVisualizeClick}>
          Visualize
        </div>
        <span className="stats">Total Nodes Visited: {totalNodes}</span>

        <span className="stats">Total Path Length: {pathLenght}</span>
      </div>
      <Grid
        sX={Sx}
        sY={Sy}
        tX={Tx}
        tY={Ty}
        StastVis={shouldVis}
        clearBoard={clear}
        alg={alg}
        Stats={handleStats}
      />
    </div>
  );
}

export default App;
