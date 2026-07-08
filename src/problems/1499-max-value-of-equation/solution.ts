/*
 * @lc app=leetcode id=1499 lang=typescript
 *
 * [1499] Max Value of Equation
 */

// @lc code=start
export function findMaxValueOfEquation(points: number[][], k: number): number {
  let max = -Infinity;
  const queue: number[][] = [];

  for (let [x, y] of points) {
    while (queue.length && x - queue[0][1] > k) {
      queue.shift();
    }

    if (queue.length) {
      max = Math.max(max, queue[0][0] + y + x);
    }

    while (queue.length && y - x > queue[queue.length - 1][0]) {
      queue.pop();
    }

    queue.push([y - x, x]);
  }

  return max;
}
// @lc code=end
