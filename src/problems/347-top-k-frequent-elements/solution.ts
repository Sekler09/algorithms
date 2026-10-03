/*
 * @lc app=leetcode id=347 lang=typescript
 *
 * [347] Top K Frequent Elements
 */

// @lc code=start
export function topKFrequent(nums: number[], k: number): number[] {
  const numToFreq = new Map<number, number>();
  const buckets = [];
  const res = [];

  for (let num of nums) {
    numToFreq.set(num, (numToFreq.get(num) || 0) + 1);
  }

  for (let [num, freq] of numToFreq) {
    if (!buckets[freq]) buckets[freq] = [num];
    else buckets[freq].push(num);
  }

  for (let i = buckets.length - 1; i > 0; i--) {
    if (!buckets[i]) continue;
    res.push(...buckets[i]);
    if (res.length === k) break;
  }

  return res;
}
// @lc code=end
