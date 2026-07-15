/*
 * @lc app=leetcode id=5 lang=typescript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
export function longestPalindrome(s: string): string {
  let center = -1;
  let right = -1;
  let maxIndex = 1;
  let maxLength = 0;

  let extendedS = "#" + s.split("").join("#") + "#";
  const hLen = new Array(extendedS.length).fill(0);
  for (let i = 1; i < extendedS.length; i++) {
    if (center > 0 && i < right)
      hLen[i] = Math.min(hLen[center * 2 - i], right - i);
    while (
      extendedS[i - 1 - hLen[i]] === extendedS[i + 1 + hLen[i]] &&
      extendedS[i + 1 + hLen[i]]
    ) {
      center = i;
      right = i + 1 + hLen[i];
      hLen[i]++;
    }
  }

  for (let i = 0; i < hLen.length; i++) {
    if (hLen[i] * 2 + 1 > maxLength) {
      maxLength = hLen[i] * 2 + 1;
      maxIndex = i;
    }
  }

  return extendedS
    .substring(maxIndex - hLen[maxIndex], maxIndex + hLen[maxIndex] + 1)
    .replaceAll("#", "");
}
// @lc code=end
