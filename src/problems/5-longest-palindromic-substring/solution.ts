/*
 * @lc app=leetcode id=5 lang=typescript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
export function longestPalindrome(s: string): string {
  let longest = "";
  for (let i = 0; i < s.length; i++) {
    const even = extension(s, i, i + 1);
    const odd = extension(s, i, i);

    if (even.length > longest.length) longest = even;
    if (odd.length > longest.length) longest = odd;
  }

  return longest;
}

function extension(s: string, left: number, right: number): string {
  while (
    left >= 0 &&
    right < s.length &&
    left <= right &&
    s[left] === s[right]
  ) {
    left--;
    right++;
  }

  return s.substring(left + 1, right);
}
// @lc code=end
