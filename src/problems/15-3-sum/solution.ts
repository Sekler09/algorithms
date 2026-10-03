/*
 * @lc app=leetcode id=15 lang=typescript
 *
 * [15] 3Sum
 */

// @lc code=start
export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i - 1] === nums[i]) continue;
    const target = -nums[i];

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum === target) {
        res.push([nums[i], nums[left], nums[right]]);
        while (nums[left + 1] === nums[left]) left++;
        while (nums[right - 1] === nums[right]) right--;

        left++;
        right--;
      }

      if (sum < target) left++;
      if (sum > target) right--;
    }
  }

  return res;
}
// @lc code=end
