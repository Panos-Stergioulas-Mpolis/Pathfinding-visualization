import React from "react";
import Grid from "./Grid/Grid";
import "./index.css";
import Stats from "./Stats/Stats";
import { useState } from "react";

function App() {
  const [Sx, setX] = useState(0);
  const [Sy, setY] = useState(0);

  const [Tx, setTX] = useState(10);
  const [Ty, setTY] = useState(10);

  const [shouldVis, setShouldVis] = useState(false);
  const [clear, setCLear] = useState(false);

  const [alg, setAlg] = useState("A*");

  const [totalNodes, setTOtalNodes] = useState(0);
  const [pathLenght, setPathLength] = useState(0);
  const [time, setTime] = useState("0");

  const handleVisualizeClick = () => {
    setShouldVis(true);
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
        <div className="algorithm">
          <select
            id="algorithm"
            onChange={(e) => {
              setAlg(e.target.value);
              setShouldVis(false);
            }}
          >
            <option>A*</option>
            <option>BFS</option>
            <option>DFS</option>
          </select>
        </div>
        <div className="btn vis" onClick={handleVisualizeClick}>
          Visualize
        </div>
        <div className="btn" onClick={handleClearClick}>
          Clear Board
        </div>
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
        />
        <Stats visNodes={totalNodes} path={pathLenght} time={time} />
      </div>
    </div>
  );
}

export default App;
