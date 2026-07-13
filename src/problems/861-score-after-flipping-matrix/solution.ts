/*
 * @lc app=leetcode id=861 lang=typescript
 *
 * [861] Score After Flipping Matrix
 */

// @lc code=start
export function matrixScore(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < m; i++) {
    if (!grid[i][0]) {
      grid[i] = grid[i].map((v) => 1 - v);
    }
  }

  for (let i = 1; i < n; i++) {
    const countOfOnes = grid.reduce((acc, row) => acc + row[i], 0);

    if (countOfOnes < m / 2) {
      for (let j = 0; j < m; j++) {
        grid[j][i] = 1 - grid[j][i];
      }
    }
  }

  return grid.reduce((score, row) => score + parseInt(row.join(""), 2), 0);
}
// @lc code=end
