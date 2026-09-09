/*
 * @lc app=leetcode id=283 lang=typescript
 *
 * [283] Move Zeroes
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
export function moveZeroes(nums: number[]): void {
  let left = 0;

  while (nums[left]) {
    left++;
  }

  let right = left + 1;

  while (right < nums.length) {
    if (nums[right]) {
      let t = nums[left];
      nums[left] = nums[right];
      nums[right] = t;
      left++;
    }
    right++;
  }
}
// @lc code=end
