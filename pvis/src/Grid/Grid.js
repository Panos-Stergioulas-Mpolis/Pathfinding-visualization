import React from "react";
import { useState } from "react";
import "./grid.css";
import { useEffect } from "react";

class Node {
  constructor(x, y, prev = null, tg, th, tf, neighbors) {
    this.x = x;
    this.y = y;
    this.prev = prev;
    this.tg = tg;
    this.th = th;
    this.tf = tf;
    this.neighbors = [];
  }
}

class Algos {
  BFS(sx, sy, tx, ty, visitedNodes) {
    let nodesVisited = 0;
    let endNode = null;
    let startNode = new Node(Number(sx), Number(sy));
    let queue = [];
    queue.push(startNode);
    let node = null;

    while (queue.length > 0) {
      node = queue.shift();
      visitedNodes[node.x][node.y] = true;
      nodesVisited++;
      document.getElementById(`${node.x},${node.y}`).style.backgroundColor =
        "lightgreen";
      if (Number(node.x) === Number(tx) && Number(node.y) === Number(ty)) {
        endNode = node;
        break;
      }

      tryToPushNode(node, 0, -1);
      tryToPushNode(node, 1, 0);
      tryToPushNode(node, 0, 1);
      tryToPushNode(node, -1, 0);
      tryToPushNode(node, 1, -1);
      tryToPushNode(node, 1, 1);
      tryToPushNode(node, -1, 1);
      tryToPushNode(node, -1, -1);
    }
    function tryToPushNode(node, dx, dy) {
      if (
        Number(node.x + dx) <= 49 &&
        Number(node.x + dx) >= 0 &&
        Number(node.y + dy) <= 14 &&
        Number(node.y + dy) >= 0
      ) {
        if (
          document.getElementById(`${node.x + dx},${node.y + dy}`).style
            .backgroundColor !== "black"
        ) {
          if (visitedNodes[node.x + dx][node.y + dy] === false) {
            let nodeChild = new Node(node.x + dx, node.y + dy, node);
            queue.push(nodeChild);
            visitedNodes[node.x + dx][node.y + dy] = true;
            document.getElementById(
              `${node.x + dx},${node.y + dy}`
            ).style.backgroundColor = "lightgreen";
          }
        }
      }
    }
    return [endNode, nodesVisited];
  }

  DFS(sx, sy, tx, ty, visitedNodes) {
    let endNode = null;
    let totalNodesVisited = 0;
    let node = new Node(sx, sy, null);

    function search(node) {
      // Check if endNode is already found
      if (endNode !== null) {
        return;
      }

      visitedNodes[node.x][node.y] = true;
      const list = [];
      totalNodesVisited++;
      document.getElementById(`${node.x},${node.y}`).style.backgroundColor =
        "#ff007f";
      if (node.x === Number(tx) && node.y === Number(ty)) {
        endNode = node;
        return; // Stop the search when the endNode is found
      }

      function tryToPushNode(dx, dy) {
        if (
          Number(node.x + dx) <= 49 &&
          Number(node.x + dx) >= 0 &&
          Number(node.y + dy) <= 14 &&
          Number(node.y + dy) >= 0
        ) {
          if (
            document.getElementById(`${node.x + dx},${node.y + dy}`).style
              .backgroundColor !== "black"
          ) {
            if (!visitedNodes[node.x + dx][node.y + dy]) {
              list.push(new Node(node.x + dx, node.y + dy, node));
            }
          }
        }
      }

      tryToPushNode(0, -1);
      tryToPushNode(1, 0);
      tryToPushNode(0, 1);
      tryToPushNode(-1, 0);
      tryToPushNode(1, -1);
      tryToPushNode(1, 1);
      tryToPushNode(-1, 1);
      tryToPushNode(-1, -1);

      while (list.length > 0) {
        search(list.shift());
      }
    }

    search(node);
    return [endNode, totalNodesVisited];
  }

  ASTAR(sx, sy, tx, ty, visitedNodes) {
    let endNode = null;
    let totalNodesVisited = 0;

    let curreNode = new Node(Number(sx), Number(sy), null, 0);

    let curreNodeTh = heuretic(
      Number(curreNode.x),
      Number(curreNode.y),
      Number(tx),
      Number(ty)
    );
    curreNode.th = curreNodeTh;

    curreNode.tf = curreNode.th + 0;

    let toSearch = [];
    toSearch.push(curreNode);

    while (toSearch.length > 0) {
      let currentBestNode = toSearch[0];
      let indexToremove = 0;

      for (let i = 1; i < toSearch.length; i++) {
        const currentNode = toSearch[i];

        if (
          currentNode.tf < currentBestNode.tf ||
          (currentNode.tf === currentBestNode.tf &&
            currentNode.th < currentBestNode.th)
        ) {
          currentBestNode = currentNode;
          indexToremove = i;
        }
      }

      curreNode = currentBestNode;

      visitedNodes[curreNode.x][curreNode.y] = true;
      document.getElementById(
        `${curreNode.x},${curreNode.y}`
      ).style.backgroundColor = "rgb(46, 180, 180)";
      totalNodesVisited++;

      toSearch.splice(indexToremove, 1);

      if (curreNode.x === Number(tx) && curreNode.y === Number(ty)) {
        endNode = curreNode;
        break;
      }

      addNeighbors(curreNode, 0, -1);
      addNeighbors(curreNode, 1, 0);
      addNeighbors(curreNode, 0, 1);
      addNeighbors(curreNode, -1, 0);
      addNeighbors(curreNode, 1, -1);
      addNeighbors(curreNode, 1, 1);
      addNeighbors(curreNode, -1, 1);
      addNeighbors(curreNode, -1, -1);

      for (let j = 0; j < curreNode.neighbors.length; j++) {
        let pass = true;

        for (let i = 0; i < toSearch.length; i++) {
          if (
            curreNode.neighbors[j].x === toSearch[i].x &&
            curreNode.neighbors[j].y === toSearch[i].y
          ) {
            if (toSearch[i].tg > curreNode.neighbors[j].tg) {
              // Update the neighbor in toSearch

              toSearch[i] = curreNode.neighbors[j];
            }
            pass = false;
            break;
          }
        }

        if (pass) {
          toSearch.push(curreNode.neighbors[j]);
        }
      }

      curreNode.neighbors = [];
    }

    function addNeighbors(node, dx, dy) {
      if (
        Number(node.x + dx) <= 49 &&
        Number(node.x + dx) <= 49 &&
        Number(node.x + dx) >= 0 &&
        Number(node.y + dy) <= 14 &&
        Number(node.y + dy) >= 0
      ) {
        if (
          document.getElementById(`${node.x + dx},${node.y + dy}`).style
            .backgroundColor !== "black"
        ) {
          if (!visitedNodes[node.x + dx][node.y + dy]) {
            let nNode = new Node(node.x + dx, node.y + dy, node);

            let nNodeTg = node.tg + 1;

            let nNodeTh = heuretic(
              Number(nNode.x),
              Number(nNode.y),
              Number(tx),
              Number(ty)
            );
            let nNodeTf = nNodeTg + nNodeTh;

            nNode.tg = nNodeTg;
            nNode.th = nNodeTh;
            nNode.tf = nNodeTf;

            node.neighbors.push(nNode);
          }
        }
      }
    }

    function heuretic(curX, curY, targetX, targetY) {
      let distX = Math.ceil(Math.abs(curX - targetX));
      let distY = Math.ceil(Math.abs(curY - targetY));

      return Math.max(distX, distY);
    }

    return [endNode, totalNodesVisited];
  }
}

const Grid = (props) => {
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(15);

  const [startX, setStartX] = useState(props.sX);
  const [startY, setStartY] = useState(props.sY);
  const [targetX, setTargetX] = useState(props.tX);
  const [targetY, setTargetY] = useState(props.tY);

  const [draw, setDraw] = useState(false);
  const [erase, setErase] = useState(false);

  const arrayOfNodes = [];
  const visitedNodes = [];

  function block(i, j) {
    if (
      draw === true &&
      !(j === props.sY && i === props.sX) &&
      !(j === props.tY && i === props.tX)
    ) {
      document.getElementById(`${i},${j}`).style.backgroundColor = "black";
    }
    if (
      erase === true &&
      !(j === props.sY && i === props.sX) &&
      !(j === props.tY && i === props.tX)
    ) {
      document.getElementById(`${i},${j}`).style.backgroundColor = "white";
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "e" || event.key === "E") {
        setErase((prevErase) => !prevErase);
        setDraw(false);
      }
    };

    const handleMouseDown = (event) => {
      if (event.button === 0) {
        setDraw(true);
      } else if (event.button === 2) {
        setErase(true);
        setDraw(false);
      }
    };

    const handleMouseUp = (event) => {
      if (event.button === 0 || event.button === 2) {
        setDraw(false);
        setErase(false);
      }
    };

    const handleContextMenu = (event) => {
      // Prevent the default context menu behavior for the right-click
      event.preventDefault();
    };

    const handleDragStart = (event) => {
      // Prevent the default drag-and-drop behavior
      event.preventDefault();
    };

    const makeElementsUnselectable = () => {
      // Select all elements you want to make unselectable and undraggable
      const elements = document.querySelectorAll(".unselectable");

      // Add the onDragStart event to each element
      elements.forEach((element) => {
        element.addEventListener("dragstart", handleDragStart);
      });
    };

    makeElementsUnselectable();

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  function setGrid() {
    for (let i = 0; i < height; i++) {
      let tempArr = [];
      for (let j = 0; j < width; j++) {
        tempArr.push(
          <div
            onMouseMoveCapture={() => block(j, i)}
            className={"unselectable node"}
            id={`${j},${i}`}
          ></div>
        );
      }
      arrayOfNodes.push(<div className=" line">{tempArr}</div>);
    }
    for (let i = 0; i < width; i++) {
      visitedNodes[i] = [];
      for (let j = 0; j < height; j++) {
        visitedNodes[i][j] = false;
      }
    }
  }

  setGrid();

  useEffect(() => {}, [props.clearBoard]);

  useEffect(() => {
    async function change() {
      document.getElementById(`${startX},${startY}`).style.background = "white";
      document.getElementById(`${targetX},${targetY}`).style.background =
        "white";
    }

    change();
    setStartX(props.sX);
    setStartY(props.sY);
    setTargetX(props.tX);
    setTargetY(props.tY);
  }, [props.sX, props.sY, props.tX, props.tY]);

  useEffect(() => {
    async function change() {
      document.getElementById(`${startX},${startY}`).style.background =
        "linear-gradient(240deg, red, purple, green, yellow, blue, black, white, orange)";
      document.getElementById(`${targetX},${targetY}`).style.background =
        "linear-gradient(240deg,  red, purple, green, yellow, blue, black, white, magenta)";
    }

    change();
  }, [startX, startY, targetX, targetY]);

  //Choose algorithm and visualize path
  useEffect(() => {
    let node = null;
    async function Visualize() {
      let alg = new Algos();
      if (props.alg === "BFS") {
        node = alg.BFS(startX, startY, targetX, targetY, visitedNodes);
        let currNode = node[0];
        if (currNode) {
          let pathArr = [];
          pathArr.push(currNode);
          while (currNode.prev !== null) {
            pathArr.push(currNode.prev);
            currNode = currNode.prev;
          }
          props.Stats(node[1], pathArr.length);
          visualizePath(pathArr, true);
        } else {
          console.log("No path found.");
        }
      } else if (props.alg === "DFS") {
        node = alg.DFS(
          Number(startX),
          Number(startY),
          Number(targetX),
          Number(targetY),
          visitedNodes
        );
        let currNode = node[0];
        if (currNode) {
          let pathArr = [];
          pathArr.push(currNode);
          while (currNode.prev !== null) {
            pathArr.push(currNode.prev);
            currNode = currNode.prev;
          }
          props.Stats(node[1], pathArr.length);
          visualizePath(pathArr, false, true);
        } else {
          console.log("No path found.");
        }
      } else if (props.alg === "A*") {
        node = alg.ASTAR(
          Number(startX),
          Number(startY),
          Number(targetX),
          Number(targetY),
          visitedNodes
        );
        let currNode = node[0];
        if (currNode) {
          let pathArr = [];
          pathArr.push(currNode);
          while (currNode.prev !== null) {
            pathArr.push(currNode.prev);
            currNode = currNode.prev;
          }
          props.Stats(node[1], pathArr.length);
          visualizePath(pathArr, false, false, true);
        } else {
          console.log("No path found.");
        }
      }
    }

    async function visualizePath(
      arr,
      purple = false,
      lblue = false,
      lyellow = false
    ) {
      while (arr.length > 0) {
        let node = arr.pop();
        if (node && node.x !== undefined && node.y !== undefined) {
          let i = Number(node.x);
          let j = Number(node.y);
          await new Promise((resolve) => {
            setTimeout(() => {
              if (
                document.getElementById(`${i},${j}`) &&
                document.getElementById(`${i},${j}`).style &&
                document.getElementById(`${i},${j}`).style.backgroundColor !==
                  "red" &&
                document.getElementById(`${i},${j}`).style.backgroundColor !==
                  "blue"
              ) {
                if (purple) {
                  document.getElementById(`${i},${j}`).style.backgroundColor =
                    "rgb(153, 0, 255)";
                } else if (lblue) {
                  document.getElementById(`${i},${j}`).style.backgroundColor =
                    "#3399ff";
                } else if (lyellow) {
                  document.getElementById(`${i},${j}`).style.backgroundColor =
                    "yellow";
                }
              }
              resolve();
            }, 50);
          });
        }
      }
      props.changeVis(false);
    }

    if (props.StastVis) {
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          if (
            document.getElementById(`${i},${j}`).style.backgroundColor !==
            "black"
          ) {
            document.getElementById(`${i},${j}`).style.backgroundColor =
              "white";
          }
        }
      }
      for (let i = 0; i < width; i++) {
        visitedNodes[i] = [];
        for (let j = 0; j < height; j++) {
          visitedNodes[i][j] = false;
        }
      }
      Visualize();
    }
  }, [props.StastVis]);

  return <div className="grid">{arrayOfNodes}</div>;
};

export default Grid;
