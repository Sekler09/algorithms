/*
 * @lc app=leetcode id=2391 lang=typescript
 *
 * [2391] Minimum Amount of Time to Collect Garbage
 */

// @lc code=start
export function garbageCollection(garbage: string[], travel: number[]): number {
  const truckLast: Record<string, number> = {
    M: -1,
    P: -1,
    G: -1,
  };

  let totalUnints = 0;

  for (let i = 0; i < garbage.length; i++) {
    for (let type of garbage[i]) {
      totalUnints++;
      truckLast[type as keyof typeof truckLast] = i;
    }
  }

  const prefixSumTravel = travel.reduce(
    (acc, time, i) => {
      acc.push(time + acc[i]);
      return acc;
    },
    [0],
  );

  return Object.values(truckLast).reduce(
    (acc, last) => acc + (prefixSumTravel[last] ?? 0),
    totalUnints,
  );
}
// @lc code=end
