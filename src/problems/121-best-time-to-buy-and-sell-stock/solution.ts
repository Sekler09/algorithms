/*
 * @lc app=leetcode id=121 lang=typescript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
export function maxProfit(prices: number[]): number {
  let maxProfit = 0;
  let minPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }
  }

  return maxProfit;
}
// @lc code=end
