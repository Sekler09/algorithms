/*
 * @lc app=leetcode id=238 lang=typescript
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
export function productExceptSelf(nums: number[]): number[] {
  let curr = 1;
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    result[i] = curr;
    curr *= nums[i];
  }

  curr = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= curr;
    curr *= nums[i];
  }

  return result;
}
// @lc code=end
