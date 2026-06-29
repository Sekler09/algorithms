/*
 * @lc app=leetcode id=3 lang=typescript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
export function lengthOfLongestSubstring(s: string): number {
  if (s.length < 2) return s.length;

  let left = 0;
  let right = 1;
  let max = 1;

  const set = new Set(s[left]);

  while (right < s.length) {
    set.add(s[right]);

    const unique = set.size;

    if (unique === right - left + 1) {
      if (unique > max) max = unique;
      right++;
    } else {
      s[right] !== s[left] && set.delete(s[left]);
      left++;
    }
  }

  return max;
}
// @lc code=end
