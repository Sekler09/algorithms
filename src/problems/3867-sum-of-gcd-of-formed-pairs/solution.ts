/*
 * @lc app=leetcode id=3867 lang=typescript
 *
 * [3867] Sum of GCD of Formed Pairs
 */

// @lc code=start
export function gcdSum(nums: number[]): number {
  let mx = 0;
  const prefixGcd = nums
    .reduce((acc, el) => {
      mx = Math.max(mx, el);
      acc.push(gcd(el, mx));
      return acc;
    }, [] as number[])
    .sort((a, b) => a - b);

  let sum = 0;

  for (let i = 0; i < Math.floor(nums.length / 2); i++) {
    sum += gcd(prefixGcd[i], prefixGcd[prefixGcd.length - 1 - i]);
  }
  return sum;
}

function gcd(a: number, b: number) {
  if (a > b) {
    let t = a;
    a = b;
    b = t;
  }

  while (b / a !== Math.floor(b / a)) {
    let t = a;
    a = b % a;
    b = t;
  }

  return a;
}
// @lc code=end
