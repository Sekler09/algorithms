/*
 * @lc app=leetcode id=55 lang=typescript
 *
 * [55] Jump Game
 */

// @lc code=start
export function canJump(nums: number[]): boolean {
  let min = nums.length - 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= min) min = i;
  }

  return min === 0;
}
// @lc code=end
