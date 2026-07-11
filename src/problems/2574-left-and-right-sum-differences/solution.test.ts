import { describe, it, expect } from "vitest";
import { leftRightDifference } from "./solution";

describe("2574. Left and Right Sum Differences", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [10, 4, 8, 3]", () => {
      // leftSum = [0, 10, 14, 22]
      // rightSum = [15, 11, 3, 0]
      // |0-15|=15, |10-11|=1, |14-3|=11, |22-0|=22
      expect(leftRightDifference([10, 4, 8, 3])).toEqual([15, 1, 11, 22]);
    });

    it("should pass Example 2: [1]", () => {
      // leftSum = [0]
      // rightSum = [0]
      expect(leftRightDifference([1])).toEqual([0]);
    });
  });

  describe("Base Cases & Small Arrays", () => {
    it("should return [0] for a single element array", () => {
      expect(leftRightDifference([100])).toEqual([0]);
      expect(leftRightDifference([10000])).toEqual([0]);
    });

    it("should handle two element arrays correctly", () => {
      // [1, 2] -> left=[0, 1], right=[2, 0] -> |0-2|=2, |1-0|=1
      expect(leftRightDifference([1, 2])).toEqual([2, 1]);
    });

    it("should handle two identical elements", () => {
      // [5, 5] -> left=[0, 5], right=[5, 0] -> |0-5|=5, |5-0|=5
      expect(leftRightDifference([5, 5])).toEqual([5, 5]);
    });
  });

  describe('Symmetric Arrays (The "Zero" Middle)', () => {
    it("should return 0 for the exact middle of a symmetric array", () => {
      // [1, 2, 3, 2, 1]
      // left = [0, 1, 3, 6, 8]
      // right = [8, 6, 3, 1, 0]
      // diffs = [8, 5, 0, 5, 8]
      expect(leftRightDifference([1, 2, 3, 2, 1])).toEqual([8, 5, 0, 5, 8]);
    });

    it("should handle a symmetric array of even length (no exact middle)", () => {
      // [1, 2, 2, 1]
      // left = [0, 1, 3, 5]
      // right = [5, 3, 1, 0]
      // diffs = [5, 2, 2, 5]
      expect(leftRightDifference([1, 2, 2, 1])).toEqual([5, 2, 2, 5]);
    });
  });

  describe("Uniform Arrays", () => {
    it("should handle an array where all elements are the same", () => {
      // [2, 2, 2, 2]
      // left = [0, 2, 4, 6]
      // right = [6, 4, 2, 0]
      // diffs = [6, 2, 2, 6]
      expect(leftRightDifference([2, 2, 2, 2])).toEqual([6, 2, 2, 6]);
    });

    it("should handle a larger uniform array", () => {
      // [10, 10, 10, 10, 10]
      // left = [0, 10, 20, 30, 40]
      // right = [40, 30, 20, 10, 0]
      // diffs = [40, 20, 0, 20, 40]
      expect(leftRightDifference([10, 10, 10, 10, 10])).toEqual([
        40, 20, 0, 20, 40,
      ]);
    });
  });

  describe("Strictly Increasing / Decreasing", () => {
    it("should handle strictly increasing numbers", () => {
      // [1, 2, 3, 4, 5]
      // left = [0, 1, 3, 6, 10]
      // right = [14, 12, 9, 5, 0]
      // diffs = [14, 11, 6, 1, 10]
      expect(leftRightDifference([1, 2, 3, 4, 5])).toEqual([14, 11, 6, 1, 10]);
    });

    it("should handle strictly decreasing numbers", () => {
      // [5, 4, 3, 2, 1]
      // left = [0, 5, 9, 12, 14]
      // right = [10, 6, 3, 1, 0]
      // diffs = [10, 1, 6, 11, 14]
      expect(leftRightDifference([5, 4, 3, 2, 1])).toEqual([10, 1, 6, 11, 14]);
    });
  });

  describe("Large Values & Constraints", () => {
    it("should handle maximum constraint values without overflow", () => {
      // Max value is 10^4, max length is 1000. Max sum is 10^7.
      // [10000, 10000, 10000]
      // left = [0, 10000, 20000]
      // right = [20000, 10000, 0]
      // diffs = [20000, 0, 20000]
      expect(leftRightDifference([10000, 10000, 10000])).toEqual([
        20000, 0, 20000,
      ]);
    });

    it("should handle an array of maximum length with max values", () => {
      // 1000 elements of 10000.
      // The first element will have leftSum=0, rightSum=9990000 -> diff=9990000
      const nums = new Array(1000).fill(10000);
      const result = leftRightDifference(nums);

      expect(result.length).toBe(1000);
      expect(result[0]).toBe(9990000);
      expect(result[999]).toBe(9990000);
      // Middle elements will have smaller differences
      expect(result[499]).toBe(10000);
      expect(result[500]).toBe(10000);
    });
  });
});
