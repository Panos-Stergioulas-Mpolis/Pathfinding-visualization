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

export const DFS = (
  sx,
  sy,
  tx,
  ty,
  visitedNodes,
  width,
  height,
  callback,
  speed
) => {
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
              opacity: ".8",
            },
            {
              transform: "scale(1.5)",
              background: "#53009c",
              opacity: "1.5",
            },
            {
              transform: "scale(1)",
              background: "#8800ff",
              opacity: "1",
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

      await timer(speed);
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
};
