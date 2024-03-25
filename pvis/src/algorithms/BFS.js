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

export const BFS = (
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
              opacity: ".8",
            },
            {
              transform: "scale(1.5)",
              background: "rgb(4, 157, 63)",
              opacity: "1.5",
            },
            { transform: "scale(1)", background: "lightgreen", opacity: "1" },
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
      await timer(speed);
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
};
