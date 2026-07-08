/*
 * @lc app=leetcode id=2652 lang=typescript
 *
 * [2652] Sum Multiples
 */

// @lc code=start
export function sumOfMultiples(n: number): number {
  let res = 0;

  for (let i = 3; i <= n; i++) {
    if (i % 3 === 0 || i % 5 === 0 || i % 7 === 0) {
      res += i;
    }
  }
  return res;
}
// @lc code=end
