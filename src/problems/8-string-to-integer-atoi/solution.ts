/*
 * @lc app=leetcode id=8 lang=typescript
 *
 * [8] String to Integer (atoi)
 */

// @lc code=start
const MAX = 2147483647;
const MIN = -2147483648;
export function myAtoi(s: string): number {
  let sign = 1;

  s = s.trim();

  if (s[0] === "+" || s[0] === "-") {
    sign = s[0] === "+" ? 1 : -1;
    s = s.slice(1);
  }

  let i = 0;
  let res = 0;
  while (i < s.length) {
    if (Number.isNaN(+s[i]) || s[i] === " ") break;
    res = res * 10 + +s[i];
    i++;
  }
  res = res * sign;

  if (res < MIN) return MIN;
  if (res > MAX) return MAX;

  return res || 0;
}
// @lc code=end
