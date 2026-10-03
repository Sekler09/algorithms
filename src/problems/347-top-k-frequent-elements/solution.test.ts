import { describe, it, expect } from "vitest";
import { topKFrequent } from "./solution";

// LeetCode allows any order for the returned k elements.
const normalize = (nums: number[]): number[] => [...nums].sort((a, b) => a - b);

const expectTopK = (actual: number[], expected: number[]) => {
  expect(normalize(actual)).toEqual(normalize(expected));
};

describe("347. Top K Frequent Elements", () => {
  describe("LeetCode Official Examples", () => {
    it("Example 1: [1,1,1,2,2,3], k = 2 -> [1,2]", () => {
      expectTopK(topKFrequent([1, 1, 1, 2, 2, 3], 2), [1, 2]);
    });

    it("Example 2: [1], k = 1 -> [1]", () => {
      expectTopK(topKFrequent([1], 1), [1]);
    });
  });

  describe("Edge Cases & Frequency Traps", () => {
    it("should handle k = 1 (only the single most frequent element)", () => {
      expectTopK(topKFrequent([1, 1, 1, 2, 2, 3], 1), [1]);
      expectTopK(topKFrequent([4, 4, 4, 4], 1), [4]);
    });

    it("should return all unique elements when k equals the unique count", () => {
      expectTopK(topKFrequent([1, 2, 3], 3), [1, 2, 3]);
      expectTopK(topKFrequent([5, 5, 6, 6, 7], 3), [5, 6, 7]);
    });

    it("should handle an array where every element appears once", () => {
      // All frequencies are 1; any k elements are "top" — but answer is unique
      // only when k equals n. Here k = n.
      expectTopK(topKFrequent([1, 2, 3, 4], 4), [1, 2, 3, 4]);
    });

    it("should handle an array of identical elements", () => {
      expectTopK(topKFrequent([7, 7, 7, 7, 7], 1), [7]);
    });

    it("should handle negative numbers", () => {
      // Constraint: -10^4 <= nums[i] <= 10^4
      expectTopK(topKFrequent([-1, -1, -1, -2, -2, -3], 2), [-1, -2]);
      expectTopK(topKFrequent([-1, 0, 0, 1, 1, 1], 2), [0, 1]);
    });

    it("should handle zeros as a frequent value", () => {
      expectTopK(topKFrequent([0, 0, 0, 1, 1, 2], 2), [0, 1]);
      expectTopK(topKFrequent([0], 1), [0]);
    });

    it("should pick higher frequency over lower when frequencies differ clearly", () => {
      // 1 appears 4x, 2 appears 3x, 3 appears 2x, 4 appears 1x
      expectTopK(topKFrequent([1, 1, 1, 1, 2, 2, 2, 3, 3, 4], 2), [1, 2]);
      expectTopK(topKFrequent([1, 1, 1, 1, 2, 2, 2, 3, 3, 4], 3), [1, 2, 3]);
    });

    it("should handle minimum length constraint (n = 1)", () => {
      expectTopK(topKFrequent([42], 1), [42]);
      expectTopK(topKFrequent([-10], 1), [-10]);
    });
  });

  describe("Boundary Values", () => {
    it("should handle values near ±10^4", () => {
      expectTopK(
        topKFrequent([-10000, -10000, 10000, 10000, 10000, 0], 2),
        [10000, -10000],
      );
    });

    it("should handle a skewed frequency distribution", () => {
      // One element dominates; next two barely appear
      const nums = [9, 9, 9, 9, 9, 8, 8, 7];
      expectTopK(topKFrequent(nums, 1), [9]);
      expectTopK(topKFrequent(nums, 2), [9, 8]);
      expectTopK(topKFrequent(nums, 3), [9, 8, 7]);
    });
  });

  describe("Ordering Independence", () => {
    it("should accept any order of the top-k elements", () => {
      const result = topKFrequent([1, 1, 1, 2, 2, 3], 2);
      // Compare against a differently ordered expected set
      expectTopK(result, [2, 1]);
    });
  });

  describe("Scale", () => {
    it("should finish on a larger input and return exactly k unique elements", () => {
      // Build: value i appears (i + 1) times for i in 0..99 → clear frequency ranking
      const nums: number[] = [];
      for (let i = 0; i < 100; i++) {
        for (let c = 0; c <= i; c++) {
          nums.push(i);
        }
      }

      const k = 5;
      const result = topKFrequent(nums, k);

      expect(result).toHaveLength(k);
      expect(new Set(result).size).toBe(k);
      // Top 5 most frequent: 99, 98, 97, 96, 95
      expectTopK(result, [99, 98, 97, 96, 95]);
    });
  });
});
