/*
 * @lc app=leetcode id=3002 lang=typescript
 *
 * [3002] Maximum Size of a Set After Removals
 */

// @lc code=start
export function maximumSetSize(nums1: number[], nums2: number[]): number {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  let toDelete1 = Math.max(0, set1.size - nums1.length / 2);
  let toDelete2 = Math.max(0, set2.size - nums2.length / 2);

  const intersection = [];

  for (let v of set1) {
    if (set2.has(v)) intersection.push(v);
  }

  while (toDelete1 + toDelete2 && intersection.length) {
    const elementToDelete = intersection.pop()!;
    if (toDelete1 > toDelete2) {
      toDelete1--;
      set1.delete(elementToDelete);
    } else {
      toDelete2--;
      set2.delete(elementToDelete);
    }
  }

  return set1.size + set2.size - toDelete1 - toDelete2 - intersection.length;
}
// @lc code=end
