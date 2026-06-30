/*
 * @lc app=leetcode id=7 lang=typescript
 *
 * [7] Reverse Integer
 */

import { sign } from "node:crypto";

// @lc code=start

const MAX = 2147483647;
const MIN = -2147483648;
export function reverse(x: number): number {
  if (!x) return x;

  let result = 0;
  let absX = Math.abs(x);
  const sign = absX / x;

  while (absX) {
    result = result * 10 + (absX % 10);
    absX = Math.floor(absX / 10);
  }
  result = result * sign;

  if (result > MAX || result < MIN) return 0;

  return result;
}

// export function reverse2(x: number): number {
//   if (!x) return x;

//   const sign = Math.abs(x) / x;
//   const reversed = sign * +(x * sign).toString().split("").reverse().join("");

//   if (reversed > MAX || reversed < MIN) return 0;

//   return reversed;
// }
// @lc code=end
