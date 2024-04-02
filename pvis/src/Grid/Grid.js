import React from "react";
import { useState } from "react";
import "./grid.css";
import { useEffect } from "react";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { ASTAR } from "../algorithms/ASTAR";
import { BFS } from "../algorithms/BFS";
import { DFS } from "../algorithms/DFS";
import { BUG0 } from "../algorithms/BUG0";
import { BUG1 } from "../algorithms/BUG1";

const Grid = (props) => {
  const [width, setWidth] = useState(70);
  const [height, setHeight] = useState(26);

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
            opacity: ".8",
          },
          {
            transform: "scale(1.5)",
            background: "rgb(0, 0, 66)",
            opacity: "1.5",
          },
          {
            transform: "scale(1)",
            background: "rgb(0, 0, 66)",
            opacity: "1",
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
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
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
      setStartX(i);
      setStartY(j);
      setStartPicked(false);
    }

    if (targetPicked && (i !== startX || j !== startY)) {
      document.getElementById(`${targetX},${targetY}`).style.backgroundColor =
        "white";
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
                  ? "unselectable node gored"
                  : targetPicked
                  ? "unselectable node goblue"
                  : "unselectable node target-div"
              }
              id={`${j},${i}`}
            >
              <div className="target circle"></div>
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
              <div className="start circle"></div>
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
        "white";
      document.getElementById(`${targetX},${targetY}`).style.backgroundColor =
        "white";
    }

    change();
  }, [startX, startY, targetX, targetY]);

  //Choose algorithm and visualize path
  useEffect(() => {
    let node = null;
    async function Visualize() {
      if (props.alg === "BFS") {
        node = BFS(
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
          },
          props.speed
        );
      } else if (props.alg === "DFS") {
        node = DFS(
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
          },
          props.speed
        );
      } else if (props.alg === "A*") {
        node = ASTAR(
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
          },
          props.speed
        );
      } else if (props.alg === "BUG-0") {
        node = BUG0(
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
          },
          props.speed
        );
      } else if (props.alg === "BUG-1") {
        node = BUG1(
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
          },
          props.speed
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
                      opacity: ".8",
                    },
                    {
                      transform: "scale(1.5)",
                      background: "yellow",
                      opacity: "1.5",
                    },
                    {
                      transform: "scale(1)",
                      background: "yellow",
                      opacity: "1",
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
