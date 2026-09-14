import { describe, it, expect } from "vitest";
import { lengthOfLIS } from "./solution";

describe("300. Longest Increasing Subsequence", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [10,9,2,5,3,7,101,18] -> 4", () => {
      // The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.
      expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
    });

    it("should pass Example 2: [0,1,0,3,2,3] -> 4", () => {
      // The longest increasing subsequence is [0, 1, 2, 3], therefore the length is 4.
      expect(lengthOfLIS([0, 1, 0, 3, 2, 3])).toBe(4);
    });

    it("should pass Example 3: [7,7,7,7,7,7,7] -> 1", () => {
      // The subsequence must be strictly increasing, so only one element can be chosen.
      expect(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])).toBe(1);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle the minimum length constraint (n = 1)", () => {
      expect(lengthOfLIS([42])).toBe(1);
      expect(lengthOfLIS([-10000])).toBe(1);
    });

    it("should handle an array that is already strictly increasing", () => {
      expect(lengthOfLIS([1, 2, 3, 4, 5])).toBe(5);
      expect(lengthOfLIS([-10, 0, 10, 20, 30])).toBe(5);
    });

    it("should handle an array that is strictly decreasing", () => {
      expect(lengthOfLIS([5, 4, 3, 2, 1])).toBe(1);
      expect(lengthOfLIS([100, 50, 0, -50, -100])).toBe(1);
    });

    it("should handle an array with all identical elements", () => {
      expect(lengthOfLIS([2, 2, 2, 2, 2])).toBe(1);
    });

    it("should handle arrays with negative numbers", () => {
      expect(lengthOfLIS([-5, -4, -3, -2, -1])).toBe(5);
      expect(lengthOfLIS([-1, -2, -3, -4, -5])).toBe(1);
      // [-3, 1, 5, 6] is a valid LIS of length 4
      expect(lengthOfLIS([-3, 1, -2, 5, -1, 6])).toBe(4);
    });

    it("should handle alternating sequences", () => {
      // [1, 3, 2, 4, 3, 5] -> LIS is [1, 2, 3, 5] or [1, 3, 4, 5], length 4
      expect(lengthOfLIS([1, 3, 2, 4, 3, 5])).toBe(4);
    });

    it("should handle sequences with local peaks and valleys", () => {
      // [10, 9, 2, 5, 3, 7, 101, 18, 19, 20] -> LIS is [2, 3, 7, 18, 19, 20], length 6
      expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18, 19, 20])).toBe(6);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum length constraint (n = 2500) strictly increasing in O(N) or O(N log N) time", () => {
      const nums = Array.from({ length: 2500 }, (_, i) => i);
      expect(lengthOfLIS(nums)).toBe(2500);
    });

    it("should handle maximum length constraint (n = 2500) strictly decreasing", () => {
      const nums = Array.from({ length: 2500 }, (_, i) => 2500 - i);
      expect(lengthOfLIS(nums)).toBe(1);
    });

    it("should handle maximum length constraint (n = 2500) with alternating values", () => {
      // This pattern tests the efficiency of the algorithm.
      // For i=0: 0, i=1: -1, i=2: 2, i=3: -3...
      // The LIS will pick all the positive even numbers: 0, 2, 4, 6... length 1250.
      const nums = Array.from({ length: 2500 }, (_, i) =>
        i % 2 === 0 ? i : -i,
      );
      expect(lengthOfLIS(nums)).toBe(1250);
    });

    it("should handle a large array with a single long increasing subsequence hidden among noise", () => {
      const nums: number[] = [];
      // First half: strictly decreasing (noise)
      for (let i = 0; i < 1250; i++) {
        nums.push(10000 - i);
      }
      // Second half: strictly increasing (the actual LIS)
      for (let i = 0; i < 1250; i++) {
        nums.push(i);
      }

      // The LIS is the second half, length 1250.
      expect(lengthOfLIS(nums)).toBe(1250);
    });
  });
});
