/*
 * @lc app=leetcode id=2574 lang=typescript
 *
 * [2574] Left and Right Sum Differences
 */

// @lc code=start
export function leftRightDifference(nums: number[]): number[] {
  const leftSum = [0];
  const rightSum = [0];

  for (let i = 1; i < nums.length; i++) {
    leftSum.push(leftSum[i - 1] + nums[i - 1]);
  }

  for (let i = nums.length - 1; i > 0; i--) {
    rightSum.unshift(rightSum[0] + nums[i]);
  }

  return leftSum.map((el, i) => Math.abs(el - rightSum[i]));
}
// @lc code=end
