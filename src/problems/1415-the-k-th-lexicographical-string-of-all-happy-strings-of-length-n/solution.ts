/*
 * @lc app=leetcode id=1415 lang=typescript
 *
 * [1415] The k-th Lexicographical String of All Happy Strings of Length n
 */

// @lc code=start
const abc = {
  a: ["b", "c"],
  b: ["a", "c"],
  c: ["a", "b"],
};

export function getHappyString(n: number, k: number): string {
  const totalStrings = 3 * Math.pow(2, n - 1);
  if (k > totalStrings) return "";

  k -= 1;

  const third = Math.min(2, Math.floor(k / (totalStrings / 3)));

  let start = third * (totalStrings / 3);
  let end = (third + 1) * (totalStrings / 3);

  let s = "abc"[third];
  let lastChar = s;

  while (s.length < n) {
    const mid = Math.floor((start + end) / 2);

    if (k < mid) {
      lastChar = abc[lastChar as keyof typeof abc][0];
      end = mid;
    } else {
      lastChar = abc[lastChar as keyof typeof abc][1];
      start = mid;
    }
    s += lastChar;
  }

  return s;
}
// @lc code=end
