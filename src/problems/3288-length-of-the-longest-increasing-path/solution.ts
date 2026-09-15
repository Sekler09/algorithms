/*
 * @lc app=leetcode id=3288 lang=typescript
 *
 * [3288] Length of the Longest Increasing Path
 */

// @lc code=start
export function maxPathLength(coordinates: number[][], k: number): number {
  const [xk, yk] = coordinates[k];
  const smaller = [];
  const bigger = [];
  for (let i = 0; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    if (xk - x > 0 && yk - y > 0) smaller.push([x, y]);
    if (x - xk > 0 && y - yk > 0) bigger.push([x, y]);
  }

  return coordinatesLIS(smaller) + 1 + coordinatesLIS(bigger);
}

function coordinatesLIS(coordinates: number[][]): number {
  if (!coordinates.length) return 0;

  coordinates.sort(([x1, y1], [x2, y2]) => x1 - x2 || y2 - y1);

  let ans = [coordinates[0]];

  for (let i = 1; i < coordinates.length; i++) {
    if (
      coordinates[i][0] > ans[ans.length - 1][0] &&
      coordinates[i][1] > ans[ans.length - 1][1]
    ) {
      ans.push(coordinates[i]);
    } else {
      let low = 0;
      let high = ans.length - 1;
      while (low < high) {
        const mid = Math.floor((low + high) / 2);

        if (ans[mid][1] >= coordinates[i][1]) high = mid;
        else low = mid + 1;
      }

      ans[low] = coordinates[i];
    }
  }

  return ans.length;
}
// @lc code=end
