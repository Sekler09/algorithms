/*
 * @lc app=leetcode id=978 lang=typescript
 *
 * [978] Longest Turbulent Subarray
 */

// @lc code=start
export function maxTurbulenceSize(arr: number[]): number {
  let max = 1;

  let curr = 1;

  let prevSign = 0;

  for (let i = 0; i < arr.length; i++) {
    let currSign = 0;

    if (arr[i] > arr[i + 1]) currSign = 1;
    else if (arr[i] < arr[i + 1]) currSign = -1;

    if (!currSign) curr = 1;
    else if (currSign !== prevSign) curr++;
    else curr = 2;

    prevSign = currSign;

    max = Math.max(curr, max);
  }

  return max;
}
// @lc code=end
