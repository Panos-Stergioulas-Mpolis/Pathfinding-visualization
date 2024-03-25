import React from "react";
import Grid from "./Grid/Grid";
import "./index.css";
import Stats from "./Stats/Stats";
import { useState } from "react";

function App() {
  const [speed, setSpeed] = useState(100);

  const [Sx, setX] = useState(15);
  const [Sy, setY] = useState(9);

  const [Tx, setTX] = useState(35);
  const [Ty, setTY] = useState(9);

  const [shouldVis, setShouldVis] = useState(false);
  const [clear, setCLear] = useState(false);

  const [alg, setAlg] = useState("A*");

  const [totalNodes, setTOtalNodes] = useState(0);
  const [pathLenght, setPathLength] = useState(0);
  const [time, setTime] = useState("0");

  const handleVisualizeClick = () => {
    setShouldVis(true);
    handleStats(0, 0, 0);
  };

  const handleClearClick = () => {
    setCLear(true);
  };

  const handleStats = (x, y, t) => {
    setTOtalNodes(x);
    setPathLength(y);
    setTime(t);
  };

  return (
    <div className="app">
      <div className="screen">
        <div className="buttons">
          <div className="btn vis" onClick={handleVisualizeClick}>
            Visualize
          </div>
          <div className="btn clear" onClick={handleClearClick}>
            Clear Board
          </div>
          <div className="algorithm">
            <select
              id="algorithm"
              onChange={(e) => {
                setAlg(e.target.value);
                setShouldVis(false);
                handleStats(0, 0, 0);
              }}
            >
              <option>A*</option>
              <option>BFS</option>
              <option>DFS</option>
            </select>
          </div>
          <div className="selec speed">
            <select
              id="speed"
              onChange={(e) => {
                if (e.target.value === "Slow") {
                  setSpeed(100);
                } else if (e.target.value === "Medium") {
                  setSpeed(50);
                } else if (e.target.value === "Fast") {
                  setSpeed(10);
                }
                handleStats(0, 0, 0);
                setShouldVis(false);
              }}
            >
              <option>Slow</option>
              <option>Medium</option>
              <option>Fast</option>
            </select>
          </div>
        </div>
        <Stats visNodes={totalNodes} path={pathLenght} time={time} />
      </div>
      <div className="gridAndStats">
        <Grid
          sX={Sx}
          sY={Sy}
          tX={Tx}
          tY={Ty}
          StartVis={shouldVis}
          clearBoard={clear}
          alg={alg}
          Stats={handleStats}
          changeVis={setShouldVis}
          clear={clear}
          shouldClear={setCLear}
          speed={speed}
        />
      </div>
    </div>
  );
}

export default App;
