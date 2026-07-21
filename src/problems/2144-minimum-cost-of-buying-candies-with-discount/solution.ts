/*
 * @lc app=leetcode id=2144 lang=typescript
 *
 * [2144] Minimum Cost of Buying Candies With Discount
 */

// @lc code=start
export function minimumCost(cost: number[]): number {
  return cost
    .sort((a, b) => b - a)
    .reduce((sum, cost, i) => sum + ((i + 1) % 3 ? cost : 0), 0);
}
// @lc code=end
