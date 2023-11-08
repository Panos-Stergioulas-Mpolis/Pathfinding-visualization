import React from 'react'
import { useState } from 'react';
import "./grid.css"
import { useEffect } from 'react';

class Node{
  constructor(x,y,prev=null,){
    this.x = x;
    this.y = y;
    this.prev = prev;
  }
}

class Algos {
  BFS(sx,sy,tx,ty,visitedNodes){
    let endNode = null;
    let startNode = new Node(Number(sx),Number(sy));
    let queue = [];
    queue.push(startNode);
    let node = null;

    while(queue.length > 0){

      node = queue.shift();
     
      if(Number(node.x) === Number(tx) && Number(node.y) === Number(ty)){
        endNode = node;
        break;
      }
      visitedNodes[node.y][node.x] = true;
      function tryToPushNode(dy,dx){
        if(
          Number(node.x + dx) <= 123 &&
          Number(node.x + dx) >= 0 &&
          Number(node.y + dy) <= 46 &&
          Number(node.y + dy) >= 0
          ){
            if(document.getElementById(`${node.x + dx},${node.y + dy}`).style.backgroundColor !== "black"){
              if(visitedNodes[node.y + dy][node.x + dx] === false){
                let nodeChild = new Node(node.x + dx, node.y + dy, node);
                queue.push(nodeChild);
                visitedNodes[node.y + dy][node.x + dx] = true;
              }
            }
        }
      }
      tryToPushNode(0, -1); 
      tryToPushNode(1, -1); 
      tryToPushNode(1, 0); 
      tryToPushNode(1, 1); 
      tryToPushNode(0, 1); 
      tryToPushNode(-1, 1); 
      tryToPushNode(-1, 0); 
      tryToPushNode(-1, -1);
    }
    return endNode;
  }
}

  

class AlgoVis{


    BFS(i, j, tx, ty) {
      const graphArray = []
      graphArray.push([Number (i),Number (j)]);
    
      function processNextStep() {
        if (graphArray.length > 0) {
          
    
          let node = graphArray.shift();
          let i = node[0];
          let j = node[1];
          if (i === Number(tx) && j === Number(ty)) {
            
            return;
          }
    
          if(document.getElementById(`${i},${j}`).style.backgroundColor !== "blue"){
            document.getElementById(`${i},${j}`).style.backgroundColor = "lightgreen";
          }
          function changeColorAndPush(directionI, directionJ) {
            if (j + directionJ >= 0 && j + directionJ <= 46 && i + directionI >= 0 && i + directionI <= 123) {
              let element = document.getElementById(`${i + directionI},${j + directionJ}`);
              if (
                element &&
                element.style.backgroundColor !== "blue" &&
                element.style.backgroundColor !== "lightgreen" &&
                element.style.backgroundColor !== "black" &&
                element.style.backgroundColor !== "yellow"
              ) {
                if(element.style.backgroundColor !== "red"){
                  element.style.backgroundColor = "yellow";
                }
                  graphArray.push([i + directionI, j + directionJ]);
              }
            }
          }
    
          changeColorAndPush(0, -1); 
          changeColorAndPush(1, -1); 
          changeColorAndPush(1, 0); 
          changeColorAndPush(1, 1); 
          changeColorAndPush(0, 1); 
          changeColorAndPush(-1, 1); 
          changeColorAndPush(-1, 0); 
          changeColorAndPush(-1, -1);
    
          setTimeout(processNextStep, 1); // Continue with the next step after a delay
        }
      }
    
      processNextStep();
    }
}

const Grid = (props) => {

    const[width, setWidth] = useState(124);
    const[height, setHeight] = useState(47);

    const [startX, setStartX] = useState(props.sX);
    const [startY, setStartY] = useState(props.sY);
    const [targetX, setTargetX] = useState(props.tX);
    const [targetY, setTargetY] = useState(props.tY);

    const [draw, setDraw] = useState(false);
    const [erase, setErase] = useState(false);

    function block(i,j){
      if(draw === true && !((j === props.sY) && (i === props.sX)) && !((j === props.tY) && (i === props.tX))){
        document.getElementById(`${i},${j}`).style.backgroundColor = "black";
      }
      if(erase === true && !((j === props.sY) && (i === props.sX)) && !((j === props.tY) && (i === props.tX))){
        document.getElementById(`${i},${j}`).style.backgroundColor = "white";
      }
    }

    
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'd' || event.key === 'D') {
        setDraw(!draw);
        setErase(false);
        
      }
      if (event.key === 'e' || event.key === 'E') {
        setErase(!erase);
        setDraw(false);
        
      }
      
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress); // Clean up the event listener
    };
  }, [draw, erase]);

    const arrayOfNodes = [];
    const visitedNodes = [];

function setGrid(){
     for(let i = 0; i < height; i++){
      let tempArr = [];
      visitedNodes[i] = []; 
      for(let j = 0; j < width; j++){
        tempArr.push(<div onMouseMove={()=>block(j,i)} className={"node"} id={`${j},${i}`}></div>);
        visitedNodes[i][j] = false; 
      }
      arrayOfNodes.push(<div className='line'>{tempArr}</div>);
    }
}


    setGrid();

    useEffect(()=>{
     
    },[props.clearBoard])
    

    useEffect(() =>{  
      async function change(color){
        document.getElementById(`${startX},${startY}`).style.background = "white";
        document.getElementById(`${targetX},${targetY}`).style.background = "white";
      }

      change()
      setStartX(props.sX);
      setStartY(props.sY);
      setTargetX(props.tX);
      setTargetY(props.tY);
    },[props.sX, props.sY, props.tX, props.tY])

    useEffect(() =>{
      async function change(){
        document.getElementById(`${startX},${startY}`).style.background = "blue"
        document.getElementById(`${targetX},${targetY}`).style.background = "red"
      }

      change()
    },[startX, startY, targetX, targetY])

    useEffect(() => {
      let pathArray = [];
      let node = null;
    
      async function Visualize() {
        let g = new AlgoVis();
        let alg = new Algos();
        if (props.alg === "BFS") {
          await g.BFS(startX, startY, targetX, targetY, visitedNodes);
          node = alg.BFS(startX, startY, targetX, targetY, visitedNodes);
          visualizePath(node);
        } else if (props.alg === "DFS") {
          g.DFS(startX, startY, targetX, targetY);
        }
      }
    
      async function visualizePath(node) {
        while (node !== null) {
          let i = Number(node.x);
          let j = Number(node.y);
          await new Promise((resolve) => {
            setTimeout(() => {
              if (
                document.getElementById(`${i},${j}`).style.backgroundColor !== "red" &&
                document.getElementById(`${i},${j}`).style.backgroundColor !== "blue"
              ) {
                document.getElementById(`${i},${j}`).style.backgroundColor = "rgb(153, 0, 255)";
              }
              node = node.prev;
              resolve();
            }, 1);
          });
        }
      }
    
      if (props.StastVis) {
         Visualize();
      }
    }, [props.StastVis]);
    
    
  return (
    <div className='grid'>
        {arrayOfNodes}
    </div>
  )
}

export default Grid