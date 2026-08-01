/*
 * @lc app=leetcode id=2187 lang=typescript
 *
 * [2187] Minimum Time to Complete Trips
 */

// @lc code=start
export function minimumTime(time: number[], totalTrips: number): number {
  let left = 1;
  let right = Math.min(...time) * totalTrips;
  while (left < right) {
    let mid = Math.floor((right + left) / 2);

    let isValid = false;
    let sum = 0;
    for (let t of time) {
      sum += Math.floor(mid / t);

      if (sum >= totalTrips) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return right;
}
// @lc code=end
