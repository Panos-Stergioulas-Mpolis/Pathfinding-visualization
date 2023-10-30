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
     this.graphArray = [];
  }
  

  NewNode(i,j){
    
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
                tempArr.push(<div  onMouseMove={()=>block(j,i)} className={`node`} id={`${j},${i}`}></div>)
            }
            arrayOfNodes.push(tempArr);
        }
    }

    setGrid();

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
    
    
 
  return (
    <div className='grid'>
        {arrayOfNodes}
    </div>
  )
}

export default Grid