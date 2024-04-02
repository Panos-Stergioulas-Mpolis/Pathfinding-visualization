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

export const BUG1 = (
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
  let goal = new Node(Number(tx), Number(ty), null, 0);

  let bugState = 0;
  let closestObstacle = null;
  let closestObstacleDist = 1000000;
  let bugDir = null;

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
      if (bugState === 0) {
        bugDir = directionToTarget(curreNode, goal.x, goal.y);

        if (canMove(bugDir, width, height)) {
          let prev = curreNode;
          curreNode = bugDir;
          curreNode.prev = prev;
          if (
            (curreNode.x !== sx || curreNode.y !== sy) &&
            (curreNode.x !== tx || curreNode.y !== ty)
          ) {
            await timer(speed);
            let element = document.getElementById(
              `${curreNode.x},${curreNode.y}`
            );

            element.animate(
              [
                {
                  transform: "scale(.5)",
                  background: "rgb(0, 255, 255)",
                  opacity: ".8",
                },
                {
                  transform: "scale(1.5)",
                  background: "rgb(0, 128, 255)",
                  opacity: "1.5",
                },
                {
                  transform: "scale(1)",
                  background: "rgb(0, 0, 255)",
                  opacity: "1",
                },
              ],
              {
                duration: 500,
                easing: "ease-in-out",
                fill: "backwards",
              }
            );

            element.style.backgroundColor = "rgb(0, 0, 255)";
            totalNodesVisited++;
          }
        } else {
          bugState = 1;
          closestObstacle = null;
          closestObstacleDist = 1000000;
        }
      } else {
        if (closestObstacle !== null) {
          if (
            curreNode.x === closestObstacle.x &&
            curreNode.y === closestObstacle.y
          ) {
            bugState = 0;
          }
        }

        curreNode.th = heuretic(curreNode.x, curreNode.y, goal.x, goal.y);
        if (curreNode.th < closestObstacleDist) {
          closestObstacleDist = curreNode.th;
          closestObstacle = curreNode;
        }

        while (true) {
          if (canMove(bugDir, width, height)) {
            let prev = curreNode;
            curreNode = bugDir;
            curreNode.prev = prev;
            let TempBugDir = rotateRight(prev, bugDir);
            bugDir = rotateRight(bugDir, TempBugDir);
            if (
              (curreNode.x !== sx || curreNode.y !== sy) &&
              (curreNode.x !== tx || curreNode.y !== ty)
            ) {
              await timer(speed);
              let element = document.getElementById(
                `${curreNode.x},${curreNode.y}`
              );

              element.animate(
                [
                  {
                    transform: "scale(.5)",
                    background: "rgb(0, 255, 255)",
                    opacity: ".8",
                  },
                  {
                    transform: "scale(1.5)",
                    background: "rgb(0, 128, 255)",
                    opacity: "1.5",
                  },
                  {
                    transform: "scale(1)",
                    background: "rgb(0, 0, 255)",
                    opacity: "1",
                  },
                ],
                {
                  duration: 500,
                  easing: "ease-in-out",
                  fill: "backwards",
                }
              );

              element.style.backgroundColor = "rgb(0, 0, 255)";
              totalNodesVisited++;
              break;
            }
          } else {
            bugDir = rotateLeft(curreNode, bugDir);
          }
          if (curreNode.x === goal.x && curreNode.y === goal.y) {
            break;
          }
        }
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
      }
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

const heuretic = (curX, curY, targetX, targetY) => {
  let distX = Math.abs(curX - targetX);
  let distY = Math.abs(curY - targetY);

  return Math.max(distX, distY);
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
    return new Node(d.x, d.y + 1, node);
  }
  if (node.x < d.x && node.y < d.y) {
    return new Node(d.x, d.y - 1, node);
  }
  if (node.x > d.x && node.y < d.y) {
    return new Node(d.x + 1, d.y, node);
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
    return new Node(d.x, d.y - 1, node);
  }
  if (node.x < d.x && node.y < d.y) {
    return new Node(d.x, d.y + 1, node);
  }
  if (node.x > d.x && node.y < d.y) {
    return new Node(d.x - 1, d.y, node);
  }
  if (node.x < d.x && node.y > d.y) {
    return new Node(d.x + 1, d.y, node);
  }
};
