/*
 * @lc app=leetcode id=1567 lang=typescript
 *
 * [1567] Maximum Length of Subarray With Positive Product
 */

// @lc code=start
export function getMaxLen(nums: number[]): number {
  let max = 0;
  let firstNegativeIdx = -1;
  let left = 0;
  let negativeCount = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      firstNegativeIdx = -1;
      negativeCount = 0;
      left = i + 1;
    } else {
      if (nums[i] < 0) {
        if (!negativeCount) firstNegativeIdx = i;
        negativeCount++;
      }

      if (negativeCount % 2) {
        max = Math.max(max, i - firstNegativeIdx);
      } else {
        max = Math.max(max, i + 1 - left);
      }
    }
  }

  return max;
}
// @lc code=end
