/*
 * @lc app=leetcode id=4 lang=typescript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
export function findMedianSortedArrays(
  nums1: number[],
  nums2: number[],
): number {
  const isEven = (nums1.length + nums2.length) % 2 === 0;

  if (nums1.length > nums2.length) {
    let t = nums1;
    nums1 = nums2;
    nums2 = t;
  }

  let left = 0;
  let right = nums1.length;

  while (left <= right) {
    let i = Math.ceil((left + right) / 2);
    let j = Math.floor((nums2.length + nums1.length + 1) / 2) - i;

    let left1 = nums1[i - 1] ?? -Infinity;
    let left2 = nums2[j - 1] ?? -Infinity;
    let right1 = nums1[i] ?? +Infinity;
    let right2 = nums2[j] ?? +Infinity;

    if (left1 > right2) {
      right = i - 1;
      continue;
    }

    if (right1 < left2) {
      left = i + 1;
      continue;
    }

    const leftM = Math.max(left1, left2);
    const rightM = Math.min(right1, right2);

    return !isEven ? leftM : (leftM + rightM) / 2;
  }

  return 0;
}
// @lc code=end
