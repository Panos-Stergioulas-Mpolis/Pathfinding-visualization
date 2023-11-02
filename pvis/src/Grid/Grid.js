import React from 'react'
import { useState } from 'react';
import "./grid.css"
import { useEffect } from 'react';

class Node{

    constructor(xValue = null, yValue = null, leftN = null, rightN = null, botN = null, topN = null, botRN = null, botLN = null, topRN = null, topLN = null, visited = false, toVisit = false){
      this.xValue = xValue;
      this.yValue = yValue;
      this.visited = visited;
      this.toVisit = toVisit;
      this.leftN = leftN;
      this.topN = topN;
      this.rightN = rightN;
      this.botN = botN;
      this.botRN = botRN;
      this.botLN = botLN;
      this.topRN = topRN;
      this.topLN = topLN;
    }
  }

class Graph{

  constructor(){
    this.graphArray = []
  }

  BFS(i, j, tx, ty) {
    this.graphArray.push([Number (i),Number (j)]);
    const self = this; // Capture the "this" context
  
    function processNextStep() {
      if (self.graphArray.length > 0) {
        if (self.graphArray[0][0] === Number(tx) && self.graphArray[0][1] === Number(ty)) {
          return;
        }
  
        let node = self.graphArray.shift();
        let i = node[0];
        let j = node[1];
        
  
        if(document.getElementById(`${j},${i}`).style.backgroundColor !== "blue"){
          document.getElementById(`${j},${i}`).style.backgroundColor = "lightgreen";
        }
        function changeColorAndPush(directionJ, directionI) {
          if (j + directionJ >= 0 && j + directionJ <= 29 && i + directionI >= 0 && i + directionI <= 84) {
            let element = document.getElementById(`${j + directionJ},${i + directionI}`);
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
              self.graphArray.push([i + directionI, j + directionJ]);
            }
          }
        }
  
        changeColorAndPush(1, 0); 
        changeColorAndPush(1, 1); 
        changeColorAndPush(0, 1); 
        changeColorAndPush(-1, 1); 
        changeColorAndPush(-1, 0); 
        changeColorAndPush(-1, -1); 
        changeColorAndPush(0, -1); 
        changeColorAndPush(1, -1);
  
        setTimeout(processNextStep, 1); // Continue with the next step after a delay
      }
    }
  
    processNextStep();
  }
}

const Grid = (props) => {

    const[width, setWidth] = useState(85);
    const[height, setHeight] = useState(30);

    const [startX, setStartX] = useState(props.sX);
    const [startY, setStartY] = useState(props.sY);
    const [targetX, setTargetX] = useState(props.tX);
    const [targetY, setTargetY] = useState(props.tY);

    const [draw, setDraw] = useState(false);
    const [erase, setErase] = useState(false);

    function block(j,i){
      if(draw === true && !((j === props.sY) && (i === props.sX)) && !((j === props.tY) && (i === props.tX))){
        document.getElementById(`${j},${i}`).style.backgroundColor = "black";
      }
      if(erase === true && !((j === props.sY) && (i === props.sX)) && !((j === props.tY) && (i === props.tX))){
        document.getElementById(`${j},${i}`).style.backgroundColor = "white";
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

    function setGrid(){
        for(let j = height -1; j >= 0; j--){
            let tempArr = [];
            for(let i = 0; i < width; i++){
                tempArr.push(<div onMouseMove={()=>block(j,i)} className={`node`} id={`${j},${i}`}></div>)
            }
            arrayOfNodes.push(tempArr);
        }
    }

    setGrid();

    useEffect(()=>{
     
    },[props.clearBoard])
    

    useEffect(() =>{  
      async function change(color){
        document.getElementById(`${startY},${startX}`).style.background = "white";
        document.getElementById(`${targetY},${targetX}`).style.background = "white";
      }

      change()
      setStartX(props.sX);
      setStartY(props.sY);
      setTargetX(props.tX);
      setTargetY(props.tY);
    },[props.sX, props.sY, props.tX, props.tY])

    useEffect(() =>{
      async function change(){
        document.getElementById(`${startY},${startX}`).style.background = "blue"
        document.getElementById(`${targetY},${targetX}`).style.background = "red"
      }

      change()
    },[startX, startY, targetX, targetY])

    useEffect(() => {
      console.log(startX, startY)
      function Visualize(){
        let g = new Graph();
        g.BFS(startX, startY,targetX, targetY);
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