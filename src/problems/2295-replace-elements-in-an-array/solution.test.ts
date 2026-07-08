import { describe, it, expect } from "vitest";
import { arrayChange } from "./solution";

describe("2295. Replace Elements in an Array", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: basic replacements", () => {
      // [1,2,4,6] -> [3,2,4,6] -> [3,2,7,6] -> [3,2,7,1]
      expect(
        arrayChange(
          [1, 2, 4, 6],
          [
            [1, 3],
            [4, 7],
            [6, 1],
          ],
        ),
      ).toEqual([3, 2, 7, 1]);
    });

    it("should pass Example 2: single element array", () => {
      expect(
        arrayChange(
          [1, 2],
          [
            [1, 3],
            [2, 4],
          ],
        ),
      ).toEqual([3, 4]);
    });
  });

  describe("Base Cases", () => {
    it("should handle a single element array with one operation", () => {
      expect(arrayChange([5], [[5, 10]])).toEqual([10]);
    });

    it("should handle a single element array with multiple chained operations", () => {
      // 5 -> 10 -> 20 -> 30
      expect(
        arrayChange(
          [5],
          [
            [5, 10],
            [10, 20],
            [20, 30],
          ],
        ),
      ).toEqual([30]);
    });

    it("should return the original array when operations is empty", () => {
      expect(arrayChange([1, 2, 3], [])).toEqual([1, 2, 3]);
    });
  });

  describe("Chained Operations (The Critical Trap)", () => {
    it("should handle a -> b, then b -> c chain", () => {
      // 1 becomes 2, then that 2 becomes 3
      expect(
        arrayChange(
          [1, 4, 5],
          [
            [1, 2],
            [2, 3],
          ],
        ),
      ).toEqual([3, 4, 5]);
    });

    it("should handle a long chain on the same element", () => {
      // 1 -> 10 -> 100 -> 1000 -> 10000
      expect(
        arrayChange(
          [1, 2, 3],
          [
            [1, 10],
            [10, 100],
            [100, 1000],
            [1000, 10000],
          ],
        ),
      ).toEqual([10000, 2, 3]);
    });

    it("should handle chains on multiple different elements simultaneously", () => {
      // 1 -> 100, 2 -> 200, then 100 -> 999, 200 -> 888
      expect(
        arrayChange(
          [1, 2, 3],
          [
            [1, 100],
            [2, 200],
            [100, 999],
            [200, 888],
          ],
        ),
      ).toEqual([999, 888, 3]);
    });

    it("should handle chain where new value equals an existing unrelated value position", () => {
      // Tricky: after 1->5, the array is [5,5,3] temporarily? No - problem says newi doesn't exist yet.
      // So: [1, 2, 3], 1->4, 4->5, 5->6
      expect(
        arrayChange(
          [1, 2, 3],
          [
            [1, 4],
            [4, 5],
            [5, 6],
          ],
        ),
      ).toEqual([6, 2, 3]);
    });
  });

  describe("Position-Based Operations", () => {
    it("should replace the first element correctly", () => {
      expect(arrayChange([1, 2, 3, 4, 5], [[1, 99]])).toEqual([99, 2, 3, 4, 5]);
    });

    it("should replace the last element correctly", () => {
      expect(arrayChange([1, 2, 3, 4, 5], [[5, 99]])).toEqual([1, 2, 3, 4, 99]);
    });

    it("should replace the middle element correctly", () => {
      expect(arrayChange([1, 2, 3, 4, 5], [[3, 99]])).toEqual([1, 2, 99, 4, 5]);
    });

    it("should preserve positions of untouched elements", () => {
      expect(
        arrayChange(
          [10, 20, 30, 40, 50],
          [
            [20, 21],
            [40, 41],
          ],
        ),
      ).toEqual([10, 21, 30, 41, 50]);
    });
  });

  describe("Value Range Tests", () => {
    it("should handle negative numbers", () => {
      expect(
        arrayChange(
          [-1, -2, -3],
          [
            [-1, -10],
            [-3, -30],
          ],
        ),
      ).toEqual([-10, -2, -30]);
    });

    it("should handle mixed positive and negative numbers", () => {
      expect(
        arrayChange(
          [-5, 0, 5],
          [
            [-5, 50],
            [5, -50],
          ],
        ),
      ).toEqual([50, 0, -50]);
    });

    it("should handle large numbers (up to 10^9)", () => {
      expect(arrayChange([1000000000, 1], [[1000000000, 999999999]])).toEqual([
        999999999, 1,
      ]);
    });

    it("should handle replacing with negative value", () => {
      expect(arrayChange([1, 2, 3], [[2, -100]])).toEqual([1, -100, 3]);
    });
  });

  describe("Order of Operations", () => {
    it("should apply operations in the exact given order", () => {
      // Order matters! 1->2 then 3->2 is invalid per constraints, but 1->2 then 2->3 is valid.
      // [1, 3, 5]: 1->10, 3->30, 5->50
      expect(
        arrayChange(
          [1, 3, 5],
          [
            [1, 10],
            [3, 30],
            [5, 50],
          ],
        ),
      ).toEqual([10, 30, 50]);
    });

    it('should handle operations that "cycle" through values', () => {
      // 1 -> 2 (now array is [2, 3, 4])
      // 2 -> 3 (now array is [3, 3, 4]) -- wait, 3 already exists!
      // Per constraints, newi never exists in nums at time of operation.
      // So valid chain: 1->10, 10->100
      expect(
        arrayChange(
          [1, 2, 3],
          [
            [1, 10],
            [10, 100],
          ],
        ),
      ).toEqual([100, 2, 3]);
    });
  });

  describe("Multiple Operations on Different Elements", () => {
    it("should handle many operations on different elements", () => {
      expect(
        arrayChange(
          [1, 2, 3, 4, 5],
          [
            [1, 10],
            [2, 20],
            [3, 30],
            [4, 40],
            [5, 50],
          ],
        ),
      ).toEqual([10, 20, 30, 40, 50]);
    });

    it("should handle operations in reverse value order", () => {
      expect(
        arrayChange(
          [1, 2, 3, 4, 5],
          [
            [5, 50],
            [4, 40],
            [3, 30],
            [2, 20],
            [1, 10],
          ],
        ),
      ).toEqual([10, 20, 30, 40, 50]);
    });
  });

  describe("Edge Cases with Array Size", () => {
    it("should handle array of size 2", () => {
      expect(arrayChange([1, 2], [[1, 100]])).toEqual([100, 2]);
    });

    it("should handle array where every element is replaced", () => {
      expect(
        arrayChange(
          [1, 2, 3],
          [
            [1, 10],
            [2, 20],
            [3, 30],
          ],
        ),
      ).toEqual([10, 20, 30]);
    });

    it("should handle array where no element is replaced", () => {
      expect(arrayChange([1, 2, 3], [])).toEqual([1, 2, 3]);
    });
  });

  describe("Complex Chained Scenarios", () => {
    it("should handle interleaved chains on different elements", () => {
      // [1, 2, 3, 4]
      // 1 -> 10: [10, 2, 3, 4]
      // 2 -> 20: [10, 20, 3, 4]
      // 10 -> 100: [100, 20, 3, 4]
      // 20 -> 200: [100, 200, 3, 4]
      expect(
        arrayChange(
          [1, 2, 3, 4],
          [
            [1, 10],
            [2, 20],
            [10, 100],
            [20, 200],
          ],
        ),
      ).toEqual([100, 200, 3, 4]);
    });

    it("should handle the longest possible chain on a single position", () => {
      // Start with [1, 2]
      // Chain: 1 -> 2 is invalid (2 exists), so: 1 -> 10 -> 100 -> 1000 -> 10000 -> 100000
      expect(
        arrayChange(
          [1, 2],
          [
            [1, 10],
            [10, 100],
            [100, 1000],
            [1000, 10000],
            [10000, 100000],
          ],
        ),
      ).toEqual([100000, 2]);
    });
  });
});
