/*
 * @lc app=leetcode id=1356 lang=typescript
 *
 * [1356] Sort Integers by The Number of 1 Bits
 */

// @lc code=start
export function sortByBits(arr: number[]): number[] {
  return arr
    .map(
      (num) => [num, num.toString(2).replaceAll("0", "")] as [number, string],
    )
    .sort((num1, num2) =>
      num1[1] === num2[1] ? num1[0] - num2[0] : num1[1].length - num2[1].length,
    )
    .map(([n]) => n);
}
// @lc code=end
