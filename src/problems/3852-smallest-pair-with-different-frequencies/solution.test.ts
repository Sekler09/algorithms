import { describe, it, expect } from "vitest";
import { minDistinctFreqPair } from "./solution";

describe("3852. Smallest Pair With Different Frequencies", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [1,1,2,2,3,4] -> [1,3]", () => {
      // Frequencies: 1:2, 2:2, 3:1, 4:1
      // Smallest x is 1 (freq 2). Smallest y > 1 with different freq is 3 (freq 1).
      expect(minDistinctFreqPair([1, 1, 2, 2, 3, 4])).toEqual([1, 3]);
    });

    it("should pass Example 2: [1,5] -> [-1,-1]", () => {
      // Both 1 and 5 have a frequency of 1. No valid pair exists.
      expect(minDistinctFreqPair([1, 5])).toEqual([-1, -1]);
    });

    it("should pass Example 3: [7] -> [-1,-1]", () => {
      // Only one distinct value in the array, so no pair is possible.
      expect(minDistinctFreqPair([7])).toEqual([-1, -1]);
    });
  });

  describe("Edge Cases & Frequency Traps", () => {
    it("should return [-1, -1] when all distinct elements have the exact same frequency", () => {
      expect(minDistinctFreqPair([2, 2, 3, 3, 4, 4])).toEqual([-1, -1]);
      expect(minDistinctFreqPair([1, 2, 3, 4, 5])).toEqual([-1, -1]);
    });

    it("should return [-1, -1] for an array with all identical elements", () => {
      expect(minDistinctFreqPair([5, 5])).toEqual([-1, -1]);
      expect(minDistinctFreqPair([9, 9, 9, 9, 9])).toEqual([-1, -1]);
    });

    it("should skip intermediate values that share the same frequency as x", () => {
      // x=2 (freq 2), y=3 (freq 2), y=4 (freq 2), y=5 (freq 1)
      // Must skip 3 and 4, and correctly return [2, 5]
      expect(minDistinctFreqPair([2, 2, 3, 3, 4, 4, 5])).toEqual([2, 5]);
    });

    it("should correctly identify the smallest valid y when multiple valid y's exist", () => {
      // x=1 (freq 3), y=2 (freq 2), y=3 (freq 1)
      // Both 2 and 3 have different frequencies from 1, but 2 is smaller.
      expect(minDistinctFreqPair([1, 1, 1, 2, 2, 3])).toEqual([1, 2]);
    });

    it("should handle cases where the smallest x has a unique frequency", () => {
      // x=1 (freq 1), y=2 (freq 2)
      expect(minDistinctFreqPair([1, 2, 2])).toEqual([1, 2]);
    });

    it("should handle disjoint frequency groups", () => {
      // 1: freq 1, 2: freq 2, 3: freq 3
      // x=1 (freq 1). Smallest y > 1 with freq != 1 is 2 (freq 2).
      expect(minDistinctFreqPair([1, 2, 2, 3, 3, 3])).toEqual([1, 2]);
    });

    it("should handle arrays where the only valid pair is at the very end", () => {
      // 1, 2, 3, 4 all have freq 2. 5 has freq 1.
      expect(minDistinctFreqPair([1, 1, 2, 2, 3, 3, 4, 4, 5])).toEqual([1, 5]);
    });
  });

  describe("Constraints & Boundary Values", () => {
    it("should handle the minimum length constraint (length 1)", () => {
      expect(minDistinctFreqPair([1])).toEqual([-1, -1]);
      expect(minDistinctFreqPair([100])).toEqual([-1, -1]);
    });

    it("should handle the maximum value constraint (nums[i] = 100)", () => {
      // 99 has freq 1, 100 has freq 2
      expect(minDistinctFreqPair([99, 100, 100])).toEqual([99, 100]);
    });

    it("should handle the maximum length constraint (length 100) efficiently", () => {
      // Create an array of length 100 with varied frequencies
      const nums: number[] = [];
      for (let i = 1; i <= 50; i++) {
        nums.push(i); // freq 1 for values 1..50
      }
      for (let i = 51; i <= 75; i++) {
        nums.push(i, i); // freq 2 for values 51..75
      }
      // Smallest x is 1 (freq 1). Smallest y > 1 with freq != 1 is 51 (freq 2).
      expect(minDistinctFreqPair(nums)).toEqual([1, 51]);
    });

    it("should handle sparse values within the 1-100 range", () => {
      // Values are not contiguous, but the logic should still hold
      // 10 (freq 1), 50 (freq 2), 90 (freq 1)
      // x=10 (freq 1). Smallest y > 10 with freq != 1 is 50 (freq 2).
      expect(minDistinctFreqPair([10, 50, 50, 90])).toEqual([10, 50]);
    });
  });
});
