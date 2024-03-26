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
) => {};
