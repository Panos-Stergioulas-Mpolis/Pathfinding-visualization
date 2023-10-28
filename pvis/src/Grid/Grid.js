import React from 'react'
import { useState } from 'react';
import "./grid.css"
import { useEffect } from 'react';

class NodeObj{

    constructor(xValue, yValue, leftN = null, rightN = null, botN = null, topN = null, visited = false, toVisit = false){
      this.xValue = xValue;
      this.yValue = yValue;
      this.visited = visited;
      this.toVisit = toVisit;
      this.leftN = leftN;
      this.topN = topN;
      this.rightN = rightN;
      this.botN = botN;
    }
  }

class Graph{
  
}
  

const Grid = (props) => {

    const[width, setWidth] = useState(85);
    const[height, setHeight] = useState(30);

    const [startX, setStartX] = useState(props.sX);
    const [startY, setStartY] = useState(props.sY);
    const [targetX, setTargetX] = useState(props.tX);
    const [targetY, setTargetY] = useState(props.tY);

    console.log(props.sX, startX)

    const arrayOfNodes = [];

    function setGrid(){
        for(let j = height -1; j >= 0; j--){
            let tempArr = [];
            for(let i = 0; i < width; i++){
                tempArr.push(<div className={`node`} id={`${j},${i}`}></div>)
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
      async function change(color){
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