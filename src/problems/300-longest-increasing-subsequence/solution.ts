/*
 * @lc app=leetcode id=300 lang=typescript
 *
 * [300] Longest Increasing Subsequence
 */

// @lc code=start
export function lengthOfLIS(nums: number[]): number {
  const ans = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > ans[ans.length - 1]) ans.push(nums[i]);
    else {
      let low = 0;
      let high = ans.length - 1;
      while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (nums[i] > ans[mid]) low = mid + 1;
        else high = mid;
      }

      if (ans[low] > nums[i]) ans[low] = nums[i];
    }
  }

  return ans.length;
}
// @lc code=end
