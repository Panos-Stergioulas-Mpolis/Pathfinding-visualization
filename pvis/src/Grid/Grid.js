import React from "react";
import { useState } from "react";
import "./grid.css";
import { useEffect } from "react";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { FaExpandArrowsAlt } from "react-icons/fa";

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

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

class Algos {
  BFS(sx, sy, tx, ty, visitedNodes, width, height, callback) {
    let nodesVisited = 0;
    const startTime = performance.now();
    let endNode = null;
    let startNode = new Node(Number(sx), Number(sy));
    let queue = [];
    queue.push(startNode);
    let node = null;

    myLoop();

    async function myLoop() {
      while (queue.length > 0) {
        node = queue.shift();
        visitedNodes[node.x][node.y] = true;
        nodesVisited++;
        if (
          (node.x !== sx || node.y !== sy) &&
          (node.x !== tx || node.y !== ty)
        ) {
          let element = document.getElementById(`${node.x},${node.y}`);
          element.animate(
            [
              {
                transform: "scale(.5)",
                background: "rgb(111, 255, 0)",
                opasity: ".5",
              },
              {
                transform: "scale(1.5)",
                background: "rgb(4, 157, 63)",
                opasity: "1.5",
              },
              { transform: "scale(1)", background: "lightgreen", opasity: "1" },
            ],
            {
              duration: 500,
              easing: "ease-in-out",
              fill: "backwards",
            }
          );

          element.style.backgroundColor = "lightgreen";
        }

        if (Number(node.x) === Number(tx) && Number(node.y) === Number(ty)) {
          const endTime = performance.now();
          const elapsedTime = endTime - startTime;
          const elapsedTimeInSeconds = elapsedTime / 1000;
          const elapsedTimeString = elapsedTimeInSeconds.toString();
          const matchResult = elapsedTimeString.match(/\d+\.\d{0,2}/);
          endNode = node;
          callback(node, nodesVisited, matchResult);
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
        await timer(10);
      }
    }
    function tryToPushNode(node, dx, dy) {
      if (
        Number(node.x + dx) <= width - 1 &&
        Number(node.x + dx) >= 0 &&
        Number(node.y + dy) <= height - 1 &&
        Number(node.y + dy) >= 0
      ) {
        if (
          document.getElementById(`${node.x + dx},${node.y + dy}`).style
            .backgroundColor !== "rgb(0, 0, 66)"
        ) {
          if (visitedNodes[node.x + dx][node.y + dy] === false) {
            let nodeChild = new Node(node.x + dx, node.y + dy, node);
            queue.push(nodeChild);
            visitedNodes[node.x + dx][node.y + dy] = true;
          }
        }
      }
    }
  }

  DFS(sx, sy, tx, ty, visitedNodes, width, height, callback) {
    let endNode = null;
    let totalNodesVisited = 0;
    const startTime = performance.now();
    let curNode = new Node(sx, sy, null);
    let stack = [];
    stack.push(curNode);

    myLoop();

    async function myLoop() {
      while (stack.length > 0) {
        curNode = stack.pop();

        if (
          (curNode.x !== Number(sx) || curNode.y !== Number(sy)) &&
          (curNode.x !== Number(tx) || curNode.y !== Number(ty)) &&
          visitedNodes[curNode.x][curNode.y] !== true
        ) {
          let element = document.getElementById(`${curNode.x},${curNode.y}`);
          element.animate(
            [
              {
                transform: "scale(.5)",
                background: "#ff00c3",
                opasity: ".5",
              },
              {
                transform: "scale(1.5)",
                background: "#53009c",
                opasity: "1.5",
              },
              {
                transform: "scale(1)",
                background: "#8800ff",
                opasity: "1",
              },
            ],
            {
              duration: 500,
              easing: "ease-in-out",
              fill: "backwards",
            }
          );

          element.style.backgroundColor = "#8800ff";
          totalNodesVisited++;
          visitedNodes[curNode.x][curNode.y] = true;
        }

        if (curNode.x === tx && curNode.y === ty) {
          const endTime = performance.now();
          const elapsedTime = endTime - startTime;
          const elapsedTimeInSeconds = elapsedTime / 1000;
          const elapsedTimeString = elapsedTimeInSeconds.toString();
          const matchResult = elapsedTimeString.match(/\d+\.\d{0,2}/);
          endNode = curNode;
          callback(curNode, totalNodesVisited, matchResult);
          break;
        }
        addNeighbors(curNode, -1, -1);
        addNeighbors(curNode, -1, 1);
        addNeighbors(curNode, 1, 1);
        addNeighbors(curNode, 1, -1);
        addNeighbors(curNode, -1, 0);
        addNeighbors(curNode, 0, 1);
        addNeighbors(curNode, 1, 0);
        addNeighbors(curNode, 0, -1);

        await timer(10);
      }
    }

    function addNeighbors(node, dx, dy) {
      if (
        Number(node.x + dx) <= width - 1 &&
        Number(node.x + dx) >= 0 &&
        Number(node.y + dy) <= height - 1 &&
        Number(node.y + dy) >= 0
      ) {
        if (
          document.getElementById(`${node.x + dx},${node.y + dy}`).style
            .backgroundColor !== "rgb(0, 0, 66)"
        ) {
          if (visitedNodes[node.x + dx][node.y + dy] === false) {
            let nodeChild = new Node(node.x + dx, node.y + dy, node);
            stack.push(nodeChild);
          }
        }
      }
    }
  }

  ASTAR(sx, sy, tx, ty, visitedNodes, width, height, callback) {
    let endNode = null;
    let totalNodesVisited = 0;
    const startTime = performance.now();
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

    myLoop();

    async function myLoop() {
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

        if (
          (curreNode.x !== sx || curreNode.y !== sy) &&
          (curreNode.x !== tx || curreNode.y !== ty)
        ) {
          let element = document.getElementById(
            `${curreNode.x},${curreNode.y}`
          );

          element.animate(
            [
              {
                transform: "scale(.5)",
                background: "rgb(55, 255, 0)",
                opasity: ".5",
              },
              {
                transform: "scale(1.5)",
                background: "rgb(46, 82, 180)",
                opasity: "1.5",
              },
              {
                transform: "scale(1)",
                background: "rgb(46, 180, 180)",
                opasity: "1",
              },
            ],
            {
              duration: 500,
              easing: "ease-in-out",
              fill: "backwards",
            }
          );

          element.style.backgroundColor = "rgb(46, 180, 180)";
        }
        totalNodesVisited++;

        toSearch.splice(indexToremove, 1);

        if (curreNode.x === Number(tx) && curreNode.y === Number(ty)) {
          const endTime = performance.now();
          const elapsedTime = endTime - startTime;
          const elapsedTimeInSeconds = elapsedTime / 1000;
          const elapsedTimeString = elapsedTimeInSeconds.toString();
          const matchResult = elapsedTimeString.match(/\d+\.\d{0,2}/);
          endNode = curreNode;
          callback(endNode, totalNodesVisited, matchResult);
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
        await timer(10);
      }
    }

    function addNeighbors(node, dx, dy) {
      if (
        Number(node.x + dx) <= width - 1 &&
        Number(node.x + dx) >= 0 &&
        Number(node.y + dy) <= height - 1 &&
        Number(node.y + dy) >= 0
      ) {
        if (
          document.getElementById(`${node.x + dx},${node.y + dy}`).style
            .backgroundColor !== "rgb(0, 0, 66)"
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
      let distX = Math.abs(curX - targetX);
      let distY = Math.abs(curY - targetY);

      return Math.max(distX, distY);
    }
  }
}

const Grid = (props) => {
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(27);

  const [startX, setStartX] = useState(props.sX);
  const [startY, setStartY] = useState(props.sY);
  const [targetX, setTargetX] = useState(props.tX);
  const [targetY, setTargetY] = useState(props.tY);

  const [draw, setDraw] = useState(false);
  const [erase, setErase] = useState(false);

  const [startPicked, setStartPicked] = useState(false);
  const [targetPicked, setTargetPicked] = useState(false);

  const arrayOfNodes = [];
  const visitedNodes = [];

  // Lets you draw and erase
  function block(i, j) {
    if (
      draw === true &&
      !(j === startY && i === startX) &&
      !(j === targetY && i === targetX)
    ) {
      let element = document.getElementById(`${i},${j}`);

      element.animate(
        [
          {
            transform: "scale(.5)",
            background: "rgb(0, 0, 66)",
            opasity: ".5",
          },
          {
            transform: "scale(1.3)",
            background: "rgb(0, 0, 66)",
            opasity: "1.3",
          },
          {
            transform: "scale(1)",
            background: "rgb(0, 0, 66)",
            opasity: "1",
          },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
          fill: "backwards",
        }
      );

      element.style.backgroundColor = "rgb(0, 0, 66)";
    }
    if (
      erase === true &&
      !(j === startY && i === startX) &&
      !(j === targetY && i === targetX)
    ) {
      document.getElementById(`${i},${j}`).style.backgroundColor = "white";
    }
  }

  // Handles key and click events
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

  //  Handles the logic when a node (or better a squeare) have been clicked
  function handleCLick(i, j) {
    if (startPicked && (i !== targetX || j !== targetY)) {
      document.getElementById(`${startX},${startY}`).style.backgroundColor =
        "white";
      document.getElementById(`${i},${j}`).style.backgroundColor = "red";
      setStartX(i);
      setStartY(j);
      setStartPicked(false);
    }

    if (targetPicked && (i !== startX || j !== startY)) {
      document.getElementById(`${targetX},${targetY}`).style.backgroundColor =
        "white";
      document.getElementById(`${i},${j}`).style.backgroundColor = "blue";
      setTargetX(i);
      setTargetY(j);
      setTargetPicked(false);
    }

    if (i === targetX && j === targetY && (i !== startX || j !== startY)) {
      setTargetPicked(true);
    }

    if (i === startX && j === startY && (i !== targetX || j !== targetY)) {
      setStartPicked(true);
    }
  }

  // sets the grid
  function setGrid() {
    for (let i = 0; i < height; i++) {
      let tempArr = [];
      for (let j = 0; j < width; j++) {
        if (j === targetX && i === targetY) {
          tempArr.push(
            <div
              onMouseMoveCapture={() => block(j, i)}
              onClick={() => handleCLick(j, i)}
              className={
                startPicked
                  ? "unselectable node gored target-div"
                  : targetPicked
                  ? "unselectable node goblue target-div"
                  : "unselectable node target-div"
              }
              id={`${j},${i}`}
            >
              <FaCompressArrowsAlt className="target" />
            </div>
          );
        } else if (j === startX && i === startY) {
          tempArr.push(
            <div
              onMouseMoveCapture={() => block(j, i)}
              onClick={() => handleCLick(j, i)}
              className={
                startPicked
                  ? "unselectable node gored start-div"
                  : targetPicked
                  ? "unselectable node goblue start-div"
                  : "unselectable node start-div"
              }
              id={`${j},${i}`}
            >
              <FaExpandArrowsAlt className="start" />
            </div>
          );
        } else {
          tempArr.push(
            <div
              onMouseMoveCapture={() => block(j, i)}
              onClick={() => handleCLick(j, i)}
              className={
                startPicked
                  ? "unselectable node gored"
                  : targetPicked
                  ? "unselectable node goblue"
                  : "unselectable node"
              }
              id={`${j},${i}`}
            ></div>
          );
        }
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

  // sets the the start and target
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

  // sets the color of start and target
  useEffect(() => {
    async function change() {
      document.getElementById(`${startX},${startY}`).style.backgroundColor =
        "red";
      document.getElementById(`${targetX},${targetY}`).style.backgroundColor =
        "blue";
    }

    change();
  }, [startX, startY, targetX, targetY]);

  //Choose algorithm and visualize path
  useEffect(() => {
    let node = null;
    async function Visualize() {
      let alg = new Algos();
      if (props.alg === "BFS") {
        node = alg.BFS(
          Number(startX),
          Number(startY),
          Number(targetX),
          Number(targetY),
          visitedNodes,
          width,
          height,
          function (endNode, visitetesNodes, time) {
            if (endNode) {
              let pathArr = [];
              pathArr.push(endNode);
              while (endNode.prev !== null) {
                pathArr.push(endNode.prev);
                endNode = endNode.prev;
              }
              props.Stats(visitetesNodes, pathArr.length, time);
              visualizePath(pathArr);
            } else {
              console.log("No path found.");
            }
          }
        );
      } else if (props.alg === "DFS") {
        node = alg.DFS(
          Number(startX),
          Number(startY),
          Number(targetX),
          Number(targetY),
          visitedNodes,
          width,
          height,
          function (endNode, visitetesNodes, time) {
            if (endNode) {
              let pathArr = [];
              pathArr.push(endNode);
              while (endNode.prev !== null) {
                pathArr.push(endNode.prev);
                endNode = endNode.prev;
              }
              props.Stats(visitetesNodes + 2, pathArr.length, time);
              visualizePath(pathArr);
            } else {
              console.log("No path found.");
            }
          }
        );
      } else if (props.alg === "A*") {
        node = alg.ASTAR(
          Number(startX),
          Number(startY),
          Number(targetX),
          Number(targetY),
          visitedNodes,
          width,
          height,
          function (endNode, visitetesNodes, time) {
            if (endNode) {
              let pathArr = [];
              pathArr.push(endNode);
              while (endNode.prev !== null) {
                pathArr.push(endNode.prev);
                endNode = endNode.prev;
              }
              props.Stats(visitetesNodes, pathArr.length, time);
              visualizePath(pathArr);
            } else {
              console.log("No path found.");
            }
          }
        );
      }
    }

    async function visualizePath(arr) {
      while (arr.length > 0) {
        let node = arr.pop();
        if (node && node.x !== undefined && node.y !== undefined) {
          let i = Number(node.x);
          let j = Number(node.y);
          await new Promise((resolve) => {
            setTimeout(() => {
              if (
                (node.x !== startX || node.y !== startY) &&
                (node.x !== targetX || node.y !== targetY)
              ) {
                let element = document.getElementById(`${i},${j}`);

                element.animate(
                  [
                    {
                      transform: "scale(.5)",
                      background: "yellow",
                      opasity: ".5",
                    },
                    {
                      transform: "scale(1.3)",
                      background: "yellow",
                      opasity: "1.3",
                    },
                    {
                      transform: "scale(1)",
                      background: "yellow",
                      opasity: "1",
                    },
                  ],
                  {
                    duration: 500,
                    easing: "ease-in-out",
                    fill: "backwards",
                  }
                );

                element.style.backgroundColor = "yellow";
              }
              resolve();
            }, 20);
          });
        }
      }
      props.changeVis(false);
    }

    if (props.StartVis) {
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          if (
            document.getElementById(`${i},${j}`).style.backgroundColor !==
            "rgb(0, 0, 66)"
          ) {
            if (
              (i !== startX || j !== startY) &&
              (i !== targetX || j !== targetY)
            )
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
  }, [props.StartVis]);

  useEffect(() => {
    if (props.clear) {
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          visitedNodes[i][j] = false;
          if (
            (i !== startX || j !== startY) &&
            (i !== targetX || j !== targetY)
          ) {
            document.getElementById(`${i},${j}`).style.backgroundColor =
              "white";
          }
        }
      }
    }
    props.shouldClear(false);
  }, [props.clear]);

  return <div className="grid">{arrayOfNodes}</div>;
};

export default Grid;
