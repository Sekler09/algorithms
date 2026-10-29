/*
 * @lc app=leetcode id=875 lang=typescript
 *
 * [875] Koko Eating Bananas
 */

// @lc code=start
export function minEatingSpeed(piles: number[], h: number): number {
  let r = Math.max(...piles);
  let l = 1;

  while (l < r) {
    const k = Math.floor((l + r) / 2);
    const hrs = piles.reduce((sum, el) => sum + Math.ceil(el / k), 0);

    if (hrs <= h) {
      r = k;
    } else {
      l = k + 1;
    }
  }

  return r;
}
// @lc code=end
