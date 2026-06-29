/*
 * @lc app=leetcode id=1 lang=typescript
 *
 * [1] Two Sum
 */

// @lc code=start
export function twoSum(nums: number[], target: number): number[] {
  const map: Record<number, number> = {};

  for (let [i, num] of nums.entries()) {
    const summand = target - num;

    if (map[summand] !== undefined) {
      return [map[summand], i];
    } else {
      map[num] = i;
    }
  }

  return [];
}
// @lc code=end
