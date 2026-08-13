/*
 * @lc app=leetcode id=3852 lang=typescript
 *
 * [3852] Smallest Pair With Different Frequencies
 */

// @lc code=start
export function minDistinctFreqPair(nums: number[]): number[] {
  const max = Math.max(...nums);
  const freq = new Array(max + 1).fill(0);

  for (let num of nums) {
    freq[num]++;
  }

  let [a, b] = [0, 0];

  for (let i = 1; i <= max; i++) {
    if (!a) {
      if (freq[i]) a = i;
      continue;
    }

    if (freq[i] && freq[i] !== freq[a]) {
      b = i;
      return [a, b];
    }
  }

  return [-1, -1];
}
// @lc code=end
