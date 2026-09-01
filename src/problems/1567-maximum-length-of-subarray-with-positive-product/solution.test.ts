import { describe, it, expect } from "vitest";
import { getMaxLen } from "./solution";

describe("1567. Maximum Length of Subarray With Positive Product", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [1,-2,-3,4] -> 4", () => {
      // The whole array has a positive product (1 * -2 * -3 * 4 = 24).
      expect(getMaxLen([1, -2, -3, 4])).toBe(4);
    });

    it("should pass Example 2: [0,1,-2,-3,-4] -> 3", () => {
      // The longest subarray with positive product is [1,-2,-3] which has a length of 3.
      // Note: [1,-2,-3,-4] also has a positive product and length 4.
      // Wait, 1 * -2 * -3 * -4 = -24 (negative).
      // So [1, -2, -3] is length 3, or [-2, -3, -4] is length 3.
      expect(getMaxLen([0, 1, -2, -3, -4])).toBe(3);
    });

    it("should pass Example 3: [-1,-2,-3,0,1] -> 2", () => {
      // The longest subarray with positive product is [-1,-2] or [-2,-3], both length 2.
      expect(getMaxLen([-1, -2, -3, 0, 1])).toBe(2);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle single-element arrays correctly", () => {
      expect(getMaxLen([5])).toBe(1); // Positive
      expect(getMaxLen([-5])).toBe(0); // Negative
      expect(getMaxLen([0])).toBe(0); // Zero
    });

    it("should return the full length if all elements are positive", () => {
      expect(getMaxLen([1, 2, 3, 4, 5])).toBe(5);
    });

    it("should handle arrays with all negative numbers", () => {
      // Even count of negatives: entire array is valid
      expect(getMaxLen([-1, -2, -3, -4])).toBe(4);
      // Odd count of negatives: must drop one negative (either first or last)
      expect(getMaxLen([-1, -2, -3, -4, -5])).toBe(4);
    });

    it("should return 0 if the array contains only zeros", () => {
      expect(getMaxLen([0, 0, 0, 0])).toBe(0);
    });

    it("should handle arrays with no valid positive product subarrays", () => {
      // Single negative surrounded by zeros
      expect(getMaxLen([0, -1, 0])).toBe(0);
      expect(getMaxLen([-1])).toBe(0);
    });
  });

  describe("Zero Separation & Negative Counting Traps", () => {
    it("should correctly reset counts when encountering a zero", () => {
      // [1, 2] (len 2), 0, [-1, -2] (len 2), 0, [3, 4, 5] (len 3)
      expect(getMaxLen([1, 2, 0, -1, -2, 0, 3, 4, 5])).toBe(3);
    });

    it("should handle an odd number of negatives bounded by zeros", () => {
      // [-1, -2, -3] has 3 negatives.
      // Valid subarrays: [-1, -2] (len 2) or [-2, -3] (len 2). Max = 2.
      expect(getMaxLen([0, -1, -2, -3, 0])).toBe(2);
    });

    it("should handle an even number of negatives bounded by zeros", () => {
      // [-1, -2, -3, -4] has 4 negatives. Entire segment is valid.
      expect(getMaxLen([0, -1, -2, -3, -4, 0])).toBe(4);
    });

    it("should correctly drop the first negative when total negatives in segment are odd", () => {
      // Segment: [-1, 2, 3, -4, 5] (2 negatives -> valid, len 5)
      // Wait, let's use 3 negatives: [-1, 2, 3, -4, 5, -6]
      // Total negatives = 3.
      // Drop first: [2, 3, -4, 5, -6] -> len 5
      // Drop last: [-1, 2, 3, -4, 5] -> len 5
      expect(getMaxLen([-1, 2, 3, -4, 5, -6])).toBe(5);
    });

    it("should correctly drop the last negative when it yields a longer subarray", () => {
      // Segment: [1, 2, -3, 4, 5, -6, 7, 8, 9]
      // Negatives at index 2 (-3) and index 5 (-6). Total = 2 (even, so len 9).
      // Let's make it 3 negatives: [1, 2, -3, 4, 5, -6, 7, 8, -9]
      // Drop first negative (-3): [4, 5, -6, 7, 8, -9] -> len 6
      // Drop last negative (-9): [1, 2, -3, 4, 5, -6, 7, 8] -> len 8
      expect(getMaxLen([1, 2, -3, 4, 5, -6, 7, 8, -9])).toBe(8);
    });

    it("should handle trailing zeros correctly", () => {
      expect(getMaxLen([1, -1, 1, 0, 0])).toBe(1); // [1, -1, 1] is len 3? No, 1*-1*1 = -1.
      // Wait, [1, -1, 1] has one negative. Max valid is [1] or [1] at the end. Length 1.
      // Let's use: [1, -1, -1, 0, 0] -> [1, -1, -1] is len 3.
      expect(getMaxLen([1, -1, -1, 0, 0])).toBe(3);
    });

    it("should handle leading zeros correctly", () => {
      expect(getMaxLen([0, 0, -1, -1, 1])).toBe(3);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum length array of all 1s in O(N) time", () => {
      // A naive O(N^2) or O(N^3) approach checking all subarrays will TLE here.
      const largePositiveArray = new Array(100000).fill(1);
      expect(getMaxLen(largePositiveArray)).toBe(100000);
    });

    it("should handle maximum length array of all -1s in O(N) time", () => {
      // 100,001 negatives. We must drop exactly one to get a positive product.
      const largeNegativeArray = new Array(100001).fill(-1);
      expect(getMaxLen(largeNegativeArray)).toBe(100000);
    });

    it("should handle maximum length array with alternating signs", () => {
      // Alternating 1 and -1.
      // Length 100,000 means exactly 50,000 negatives (even), so the whole array is valid.
      const alternatingArray = Array.from({ length: 100000 }, (_, i) =>
        i % 2 === 0 ? 1 : -1,
      );
      expect(getMaxLen(alternatingArray)).toBe(100000);
    });

    it("should handle maximum length array with sparse negatives and zeros", () => {
      // 49999 ones, one -1, 49999 ones, one 0, 1 one
      // Total length = 100000
      // First segment: 49999 ones, one -1, 49999 ones.
      // Total negatives = 1. Max valid subarray = 49999 (either drop the -1 and take left, or drop -1 and take right).
      const sparseArray = [
        ...new Array(49999).fill(1),
        -1,
        ...new Array(49999).fill(1),
        0,
        1,
      ];
      expect(getMaxLen(sparseArray)).toBe(49999);
    });
  });
});
