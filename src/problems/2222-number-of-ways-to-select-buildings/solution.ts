/*
 * @lc app=leetcode id=2222 lang=typescript
 *
 * [2222] Number of Ways to Select Buildings
 */

// @lc code=start
export function numberOfWays(s: string): number {
  let result = 0;
  let totalOnes = 0;

  for (let i = 0; i < s.length; i++) {
    totalOnes += +s[i];
  }
  const totalZeroes = s.length - totalOnes;
  let zeroesBefore = 0;
  let onesBefore = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      onesBefore++;
      let zeroesAfter = totalZeroes - zeroesBefore;
      result += zeroesBefore * zeroesAfter;
    } else {
      zeroesBefore++;
      let onesAfter = totalOnes - onesBefore;
      result += onesBefore * onesAfter;
    }
  }

  return result;
}
// @lc code=end
