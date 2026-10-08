/*
 * @lc app=leetcode id=739 lang=typescript
 *
 * [739] Daily Temperatures
 */

// @lc code=start
export function dailyTemperatures(temperatures: number[]): number[] {
  const stack: number[] = [];
  const res = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack.at(-1)!] < temperatures[i]) {
      const lastIdx = stack.pop()!;
      res[lastIdx] = i - lastIdx;
    }

    stack.push(i);
  }

  return res;
}
// @lc code=end
