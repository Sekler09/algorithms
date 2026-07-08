/*
 * @lc app=leetcode id=2347 lang=typescript
 *
 * [2347] Best Poker Hand
 */

// @lc code=start
export function bestHand(ranks: number[], suits: string[]): string {
  if (new Set(suits).size === 1) return "Flush";
  let result = "High Card";
  let ranksCount: Record<number, number> = {};

  for (let i = 0; i < ranks.length; i++) {
    const rank = ranks[i];
    const count = ranksCount[rank];
    if (!count) {
      ranksCount[rank] = 1;
    } else {
      if (count === 1 && result !== "Three of a Kind") result = "Pair";
      if (count === 2) result = "Three of a Kind";
      ranksCount[rank]++;
    }
  }

  return result;
}
// @lc code=end
