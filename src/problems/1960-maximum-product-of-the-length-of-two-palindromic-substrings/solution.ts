/*
 * @lc app=leetcode id=1960 lang=typescript
 *
 * [1960] Maximum Product of the Length of Two Palindromic Substrings
 */

// @lc code=start
export function maxProduct(s: string): number {
  let center = -1;
  let right = -1;
  let max = 1;

  const hLen = new Array(s.length).fill(0);
  for (let i = 1; i < s.length; i++) {
    if (center > 0 && i < right)
      hLen[i] = Math.min(hLen[center * 2 - i], right - i);
    while (s[i - 1 - hLen[i]] === s[i + 1 + hLen[i]] && s[i + 1 + hLen[i]]) {
      center = i;
      right = i + 1 + hLen[i];
      hLen[i]++;
    }
  }

  const prefix = new Array(s.length).fill(1);
  const suffix = new Array(s.length).fill(1);

  for (let i = 0; i < s.length; i++) {
    prefix[i + hLen[i]] = Math.max(prefix[i + hLen[i]], 2 * hLen[i] + 1);
    suffix[i - hLen[i]] = Math.max(suffix[i - hLen[i]], 2 * hLen[i] + 1);
  }

  for (let i = s.length - 1; i >= 1; i--) {
    prefix[i - 1] = Math.max(prefix[i] - 2, prefix[i - 1]);
    suffix[s.length - i] = Math.max(
      suffix[s.length - i - 1] - 2,
      suffix[s.length - i],
    );
  }

  for (let i = 1; i < s.length; i++) {
    prefix[i] = Math.max(prefix[i], prefix[i - 1]);
    suffix[s.length - i - 1] = Math.max(
      suffix[s.length - i],
      suffix[s.length - i - 1],
    );
  }

  for (let i = 0; i < s.length - 1; i++) {
    max = Math.max(max, prefix[i] * suffix[i + 1]);
  }

  return max;
}
// @lc code=end
