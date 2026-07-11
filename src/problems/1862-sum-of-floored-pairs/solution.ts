/*
 * @lc app=leetcode id=1862 lang=typescript
 *
 * [1862] Sum of Floored Pairs
 */

// @lc code=start
export function sumOfFlooredPairs(nums: number[]): number {
  let res = 0;

  const max = Math.max(...nums);
  const freq = new Array(max + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]]++;
  }

  const preFreq = [0];

  for (let i = 1; i <= max; i++) {
    preFreq[i] = preFreq[i - 1] + freq[i];
  }

  for (let i = 1; i <= max; i++) {
    if (freq[i]) {
      let d = 1;

      while (d * i <= max) {
        res +=
          d *
          freq[i] *
          (preFreq[Math.min(max, (d + 1) * i - 1)] - preFreq[d * i - 1]);
        d++;
      }
    }
  }

  return res % (Math.pow(10, 9) + 7);
}
// @lc code=end
