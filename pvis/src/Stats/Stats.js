import React from "react";
import "../Stats/stats.css";

function stats(props) {
  return (
    <div className="stats">
      <span>
        Searched Nodes: <span className="statsData">{props.visNodes}</span>
      </span>
      <span>
        Time: <span className="statsData">{props.time} </span>Seconds
      </span>
      <span>
        Path Length: <span className="statsData">{props.path}</span>
      </span>
    </div>
  );
}

export default stats;
