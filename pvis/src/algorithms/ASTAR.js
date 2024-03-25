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

export const ASTAR = (
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
        let element = document.getElementById(`${curreNode.x},${curreNode.y}`);

        element.animate(
          [
            {
              transform: "scale(.5)",
              background: "rgb(55, 255, 0)",
              opacity: ".8",
            },
            {
              transform: "scale(1.5)",
              background: "rgb(46, 82, 180)",
              opacity: "1.5",
            },
            {
              transform: "scale(1)",
              background: "rgb(46, 180, 180)",
              opacity: "1",
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
};
