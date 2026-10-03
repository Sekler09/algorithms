import { describe, it, expect } from "vitest";
import { threeSum } from "./solution";

// LeetCode allows any order for triplets and for values within a triplet.
const normalizeTriplets = (triplets: number[][]): number[][] =>
  triplets
    .map((t) => [...t].sort((a, b) => a - b))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

const expectTriplets = (actual: number[][], expected: number[][]) => {
  expect(normalizeTriplets(actual)).toEqual(normalizeTriplets(expected));
};

describe("15. 3Sum", () => {
  describe("LeetCode Official Examples", () => {
    it("Example 1: [-1,0,1,2,-1,-4] -> [[-1,-1,2],[-1,0,1]]", () => {
      expectTriplets(threeSum([-1, 0, 1, 2, -1, -4]), [
        [-1, -1, 2],
        [-1, 0, 1],
      ]);
    });

    it("Example 2: [0,1,1] -> []", () => {
      expectTriplets(threeSum([0, 1, 1]), []);
    });

    it("Example 3: [0,0,0] -> [[0,0,0]]", () => {
      expectTriplets(threeSum([0, 0, 0]), [[0, 0, 0]]);
    });
  });

  describe("Edge Cases & Deduplication Traps", () => {
    it("should handle the minimum length constraint (n = 3)", () => {
      expectTriplets(threeSum([1, 2, -3]), [[-3, 1, 2]]);
      expectTriplets(threeSum([1, 2, 3]), []);
      expectTriplets(threeSum([0, 0, 0]), [[0, 0, 0]]);
    });

    it("should return empty when all numbers are positive", () => {
      expectTriplets(threeSum([1, 2, 3, 4, 5]), []);
    });

    it("should return empty when all numbers are negative", () => {
      expectTriplets(threeSum([-5, -4, -3, -2, -1]), []);
    });

    it("should deduplicate triplets that come from repeated values", () => {
      expectTriplets(threeSum([-1, -1, -1, 0, 0, 1, 1, 2, 2]), [
        [-1, -1, 2],
        [-1, 0, 1],
      ]);
    });

    it("should include a triplet of three zeros only once", () => {
      expectTriplets(threeSum([0, 0, 0, 0]), [[0, 0, 0]]);
    });

    it("should find multiple distinct triplets", () => {
      expectTriplets(threeSum([-4, -2, -2, -1, 0, 1, 2, 3, 4]), [
        [-4, 0, 4],
        [-4, 1, 3],
        [-2, -2, 4],
        [-2, -1, 3],
        [-2, 0, 2],
        [-1, 0, 1],
      ]);
    });

    it("should handle arrays where the only valid triplet uses the same value thrice", () => {
      expectTriplets(threeSum([1, 1, -2]), [[-2, 1, 1]]);
    });

    it("should handle zeros mixed with positives and negatives", () => {
      expectTriplets(threeSum([-2, 0, 0, 2, 2]), [[-2, 0, 2]]);
    });
  });

  describe("Boundary Values", () => {
    it("should handle values near ±10^5", () => {
      expectTriplets(threeSum([-100000, 50000, 50000]), [
        [-100000, 50000, 50000],
      ]);
      expectTriplets(threeSum([100000, -50000, -50000]), [
        [-50000, -50000, 100000],
      ]);
      // No zero-sum triplet possible near the extremes
      expectTriplets(threeSum([-100000, -99999, 100000]), []);
    });

    it("should not miss when mixing large-magnitude opposites", () => {
      expectTriplets(threeSum([-100000, 0, 100000, 1, -1]), [
        [-100000, 0, 100000],
        [-1, 0, 1],
      ]);
    });
  });

  describe("Ordering Independence", () => {
    it("should accept any order of triplets and any order within a triplet", () => {
      const result = threeSum([-1, 0, 1, 2, -1, -4]);
      expectTriplets(result, [
        [1, 0, -1],
        [2, -1, -1],
      ]);
    });
  });

  describe("Scale", () => {
    it("should finish on a larger input without duplicate triplets", () => {
      const nums: number[] = [];
      for (let i = -50; i <= 50; i++) {
        nums.push(i, i);
      }

      const result = threeSum(nums);
      const normalized = normalizeTriplets(result);

      for (let i = 1; i < normalized.length; i++) {
        expect(normalized[i]).not.toEqual(normalized[i - 1]);
      }

      for (const t of result) {
        expect(t).toHaveLength(3);
        expect(t[0] + t[1] + t[2]).toBe(0);
      }

      const keys = new Set(normalized.map((t) => t.join(",")));
      expect(keys.has("-2,0,2")).toBe(true);
      expect(keys.has("-1,0,1")).toBe(true);
      expect(keys.has("0,0,0")).toBe(false);
    });
  });
});
