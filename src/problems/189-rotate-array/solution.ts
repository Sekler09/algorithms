/*
 * @lc app=leetcode id=189 lang=typescript
 *
 * [189] Rotate Array
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
export function rotate(nums: number[], k: number): void {
  const n = nums.length;
  k = k % n;
  let startIdx = 0;
  let step = 0;
  let currIdx = 0;
  let tmpEl = nums[0];

  while (step < n) {
    let newIndex = (currIdx + k) % n;
    let t = nums[newIndex];
    nums[newIndex] = tmpEl;
    tmpEl = t;
    step++;
    currIdx = newIndex;

    if (currIdx === startIdx) {
      currIdx++;
      tmpEl = nums[currIdx];
      startIdx = currIdx;
    }
  }
}
// @lc code=end
