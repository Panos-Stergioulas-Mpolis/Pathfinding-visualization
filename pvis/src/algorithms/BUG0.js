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

export const BUG0 = (
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
  let totalNodesVisited = 1;
  const startTime = performance.now();
  let curreNode = new Node(Number(sx), Number(sy), null, 0);
  let goal = new Node(Number(tx), Number(ty), null, 0);
  let Currdirection = null;
  myLoop();
  async function myLoop() {
    while (true) {
      if (curreNode.x === goal.x && curreNode.y === goal.y) {
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        const elapsedTimeInSeconds = elapsedTime / 1000;
        const elapsedTimeString = elapsedTimeInSeconds.toString();
        const matchResult = elapsedTimeString.match(/\d+\.\d{0,2}/);
        endNode = curreNode;
        callback(endNode, totalNodesVisited, matchResult);
        break;
      }
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

      let d = directionToTarget(curreNode, goal.x, goal.y);
      console.log("ok1");
      if (canMove(d, width, height)) {
        curreNode = d;
        Currdirection = null;
      } else {
        if (Currdirection === null) {
          Currdirection = d;
        }
        for (let i = 0; i < 8; i++) {
          console.log("ok2");
          if (canMove(Currdirection, width, height)) {
            curreNode = Currdirection;
            Currdirection = rotateRight(curreNode, Currdirection);
            break;
          } else {
            Currdirection = rotateLeft(curreNode, Currdirection);
          }
        }
      }
      await timer(speed);
    }
  }
};

const directionToTarget = (node, tx, ty) => {
  if (node.x === tx && node.y > ty) {
    return new Node(node.x, node.y - 1, node);
  }
  if (node.x === tx && node.y < ty) {
    return new Node(node.x, node.y + 1, node);
  }
  if (node.x > tx && node.y === ty) {
    return new Node(node.x - 1, node.y, node);
  }
  if (node.x < tx && node.y === ty) {
    return new Node(node.x + 1, node.y, node);
  }
  if (node.x > tx && node.y > ty) {
    return new Node(node.x - 1, node.y - 1, node);
  }
  if (node.x < tx && node.y < ty) {
    return new Node(node.x + 1, node.y + 1, node);
  }
  if (node.x > tx && node.y < ty) {
    return new Node(node.x - 1, node.y + 1, node);
  }
  if (node.x < tx && node.y > ty) {
    return new Node(node.x + 1, node.y - 1, node);
  }
};

const canMove = (node, width, height) => {
  if (
    Number(node.x) <= width - 1 &&
    Number(node.x) >= 0 &&
    Number(node.y) <= height - 1 &&
    Number(node.y) >= 0
  ) {
    if (
      document.getElementById(`${node.x},${node.y}`).style.backgroundColor !==
      "rgb(0, 0, 66)"
    ) {
      return true;
    }
  }
  return false;
};

const rotateLeft = (node, d) => {
  if (node.x === d.x && node.y > d.y) {
    return new Node(d.x - 1, d.y, node);
  }
  if (node.x === d.x && node.y < d.y) {
    return new Node(d.x + 1, d.y, node);
  }
  if (node.x > d.x && node.y === d.y) {
    return new Node(d.x, d.y + 1, node);
  }
  if (node.x < d.x && node.y === d.y) {
    return new Node(d.x, d.y - 1, node);
  }
  if (node.x > d.x && node.y > d.y) {
    return new Node(d.x, d.y - 1, node);
  }
  if (node.x < d.x && node.y < d.y) {
    return new Node(d.x, d.y - 1, node);
  }
  if (node.x > d.x && node.y < d.y) {
    return new Node(d.x, d.y - 1, node);
  }
  if (node.x < d.x && node.y > d.y) {
    return new Node(d.x - 1, d.y, node);
  }
};

const rotateRight = (node, d) => {
  if (node.x === d.x && node.y > d.y) {
    return new Node(d.x + 1, d.y, node);
  }
  if (node.x === d.x && node.y < d.y) {
    return new Node(d.x - 1, d.y, node);
  }
  if (node.x > d.x && node.y === d.y) {
    return new Node(d.x, d.y - 1, node);
  }
  if (node.x < d.x && node.y === d.y) {
    return new Node(d.x, d.y + 1, node);
  }
  if (node.x > d.x && node.y > d.y) {
    return new Node(d.x, d.y + 1, node);
  }
  if (node.x < d.x && node.y < d.y) {
    return new Node(d.x, d.y + 1, node);
  }
  if (node.x > d.x && node.y < d.y) {
    return new Node(d.x, d.y + 1, node);
  }
  if (node.x < d.x && node.y > d.y) {
    return new Node(d.x + 1, d.y, node);
  }
};
