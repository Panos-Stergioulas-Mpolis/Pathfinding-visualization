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

    const[width, setWidth] = useState(60);
    const[height, setHeight] = useState(60);

    const [startX, setStartX] = useState(props.sX);
    const [startY, setStartY] = useState(props.sY);
    const [targetX, setTargetX] = useState(59);
    const [targetY, setTargetY] = useState(59);

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
      
      setStartX(props.sX)
      setStartY(props.sY)

      async function change(color){
        document.getElementById(`${startY},${startX}`).style.background = color
        document.getElementById(`${targetY},${targetX}`).style.background = color
      }

      change("blue")
    },[props.sX, props.sY])
    
    
 
  return (
    <div className='grid'>
        {arrayOfNodes}
    </div>
  )
}

export default Grid