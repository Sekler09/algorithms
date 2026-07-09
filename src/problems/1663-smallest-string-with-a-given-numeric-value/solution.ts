/*
 * @lc app=leetcode id=1663 lang=typescript
 *
 * [1663] Smallest String With A Given Numeric Value
 */

// @lc code=start
export function getSmallestString(n: number, k: number): string {
  const letters = new Array(27)
    .fill(1)
    .map((_, i) => String.fromCharCode(i + 96));

  let res = "";
  let remaining = k;

  for (let i = n; i > 0; i--) {
    let max = Math.min(remaining - (i - 1), 26);

    res = letters[max] + res;
    remaining -= max;
  }

  return res;
}
// @lc code=end
