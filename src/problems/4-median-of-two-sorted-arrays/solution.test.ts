import { describe, it, expect } from "vitest";
import { findMedianSortedArrays } from "./solution";

describe("4. Median of Two Sorted Arrays", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: merged is [1,2,3], median is 2.0", () => {
      expect(findMedianSortedArrays([1, 3], [2])).toBe(2.0);
    });

    it("should pass Example 2: merged is [1,2,3,4], median is 2.5", () => {
      expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
    });
  });

  describe("Edge Cases & Array Partitioning Traps", () => {
    it("should handle the first array being completely empty", () => {
      expect(findMedianSortedArrays([], [1])).toBe(1.0);
      expect(findMedianSortedArrays([], [2, 3])).toBe(2.5);
    });

    it("should handle the second array being completely empty", () => {
      expect(findMedianSortedArrays([1], [])).toBe(1.0);
      expect(findMedianSortedArrays([2, 3], [])).toBe(2.5);
    });

    it("should handle extreme length differences (1 element vs many)", () => {
      // Merged: [1, 2, 3, 4, 5, 6] -> median (3+4)/2 = 3.5
      expect(findMedianSortedArrays([1], [2, 3, 4, 5, 6])).toBe(3.5);
    });

    it("should handle all elements in nums1 being smaller than nums2", () => {
      // Merged: [1, 2, 3, 4, 5] -> median 3
      expect(findMedianSortedArrays([1, 2], [3, 4, 5])).toBe(3.0);
    });

    it("should handle all elements in nums1 being larger than nums2", () => {
      // Merged: [1, 2, 3, 4, 5] -> median 3
      expect(findMedianSortedArrays([4, 5], [1, 2, 3])).toBe(3.0);
    });

    it("should handle negative numbers correctly", () => {
      // Merged: [-5, -4, -3, -2] -> median (-4 + -3)/2 = -3.5
      expect(findMedianSortedArrays([-5, -3], [-4, -2])).toBe(-3.5);
    });

    it("should handle arrays with many duplicate numbers", () => {
      // Merged: [2, 2, 2, 2, 2, 2] -> median 2
      expect(findMedianSortedArrays([2, 2, 2], [2, 2, 2])).toBe(2.0);
    });

    it("should handle single elements in both arrays", () => {
      // Merged: [1, 2] -> median 1.5
      expect(findMedianSortedArrays([1], [2])).toBe(1.5);
    });
  });
});
