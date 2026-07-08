/*
 * @lc app=leetcode id=2295 lang=typescript
 *
 * [2295] Replace Elements in an Array
 */

// @lc code=start
export function arrayChange(nums: number[], operations: number[][]): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }

  for (let [target, replacement] of operations) {
    const index = map.get(target)!;

    nums[index] = replacement;

    map.delete(target);
    map.set(replacement, index);
  }

  return nums;
}
// @lc code=end
