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
  let totalNodesVisited = 0;
  const startTime = performance.now();
  let curreNode = new Node(Number(sx), Number(sy), null, 0);
  let goal = new Node(Number(tx), Number(ty), null, 0);
  let Currdirection = null;
  let flag = false;
  myLoop();
  async function myLoop() {
    while (true) {
      flag = false;
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
              background: "rgb(255,215,0)",
              opacity: ".8",
            },
            {
              transform: "scale(1.5)",
              background: "rgb(255,165,0)",
              opacity: "1.5",
            },
            {
              transform: "scale(1)",
              background: "rgb(255,140,0)",
              opacity: "1",
            },
          ],
          {
            duration: 500,
            easing: "ease-in-out",
            fill: "backwards",
          }
        );

        element.style.backgroundColor = "rgb(255,140,0)";
      }
      totalNodesVisited++;

      let d = directionToTarget(curreNode, goal.x, goal.y);
      let dir = "";
      if (d.x === curreNode.x && d.y > curreNode.y) {
        dir = "Down";
      } else if (d.x === curreNode.x && d.y < curreNode.y) {
        dir = "Up";
      } else if (d.x > curreNode.x && d.y === curreNode.y) {
        dir = "Right";
      } else if (d.x < curreNode.x && d.y === curreNode.y) {
        dir = "Left";
      } else if (d.x < curreNode.x && d.y < curreNode.y) {
        dir = "Left-Up";
      } else if (d.x < curreNode.x && d.y > curreNode.y) {
        dir = "Left-down";
      } else if (d.x > curreNode.x && d.y < curreNode.y) {
        dir = "Right-Up";
      } else if (d.x > curreNode.x && d.y > curreNode.y) {
        dir = "Right-down";
      }

      if (canMove(d, width, height)) {
        curreNode = d;
        Currdirection = null;
      } else {
        if (Currdirection === null) {
          Currdirection = d;
        }

        while (true) {
          flag = false;
          // console.log(curreNode);
          // console.log(Currdirection);
          if (canMove(Currdirection, width, height)) {
            let prev = curreNode;
            curreNode = Currdirection;
            curreNode.prev = prev;
            Currdirection = rotateRight(prev, Currdirection);
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
                    background: "rgb(255,215,0)",
                    opacity: ".8",
                  },
                  {
                    transform: "scale(1.5)",
                    background: "rgb(255,165,0)",
                    opacity: "1.5",
                  },
                  {
                    transform: "scale(1)",
                    background: "rgb(255,140,0)",
                    opacity: "1",
                  },
                ],
                {
                  duration: 500,
                  easing: "ease-in-out",
                  fill: "backwards",
                }
              );

              element.style.backgroundColor = "rgb(255,140,0)";
            }
            totalNodesVisited++;

            if (dir === "Up") {
              if (curreNode.y >= d.y) {
                flag = true;
                break;
              }
            } else if (dir === "Down") {
              if (curreNode.y <= d.y) {
                flag = true;
                break;
              }
            } else if (dir === "Left") {
              if (curreNode.x <= d.x) {
                flag = true;
                break;
              }
            } else if (dir === "Right") {
              if (curreNode.x >= d.x) {
                flag = true;
                break;
              }
            } else if (dir === "Left-Up") {
              if (curreNode.x <= d.x && curreNode.y <= d.y) {
                flag = true;
                break;
              }
            } else if (dir === "Left-down") {
              if (curreNode.x <= d.x && curreNode.y >= d.y) {
                flag = true;
                break;
              }
            } else if (dir === "Right-Up") {
              if (curreNode.x >= d.x && curreNode.y <= d.y) {
                flag = true;
                break;
              }
            } else if (dir === "Right-down") {
              if (curreNode.x >= d.x && curreNode.y >= d.y) {
                flag = true;
                break;
              }
            }

            if (curreNode.x === goal.x && curreNode.y === goal.y) {
              break;
            }
          } else {
            Currdirection = rotateLeft(curreNode, Currdirection);
          }
        }
      }
      if (!flag) {
        await timer(speed);
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
