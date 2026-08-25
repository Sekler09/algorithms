/*
 * @lc app=leetcode id=368 lang=typescript
 *
 * [368] Largest Divisible Subset
 */

// @lc code=start
export function largestDivisibleSubset(nums: number[]): number[] {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const dp = new Array(n).fill(1);

  let maxInd = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] % nums[j] === 0) {
        dp[i] = Math.max(dp[i], dp[j] + 1);

        if (dp[i] > dp[maxInd]) maxInd = i;
      }
    }
  }

  const maxLen = dp[maxInd];
  const result = [nums[maxInd]];
  let lastAddedIndex = maxInd;

  while (result.length !== maxLen) {
    for (let i = lastAddedIndex; i >= 0; i--) {
      if (
        nums[lastAddedIndex] % nums[i] === 0 &&
        dp[i] === maxLen - result.length
      ) {
        result.push(nums[i]);
        lastAddedIndex = i;
        break;
      }
    }
  }

  return result;
}
// @lc code=end
