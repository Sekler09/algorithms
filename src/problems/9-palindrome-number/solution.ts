/*
 * @lc app=leetcode id=9 lang=typescript
 *
 * [9] Palindrome Number
 */

// @lc code=start
export function isPalindrome(x: number): boolean {
  if (x < 0) return false;

  let copy = x;

  let reversed = 0;

  while (copy) {
    reversed = reversed * 10 + (copy % 10);
    copy = Math.floor(copy / 10);
  }

  return reversed === x;
}
// @lc code=end
