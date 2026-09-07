import { describe, it, expect } from "vitest";
import { productExceptSelf } from "./solution";

describe("238. Product of Array Except Self", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [1,2,3,4] -> [24,12,8,6]", () => {
      expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
    });

    it("should pass Example 2: [-1,1,0,-3,3] -> [0,0,9,0,0]", () => {
      expect(productExceptSelf([-1, 1, 0, -3, 3]).map((v) => v + 0)).toEqual([
        0, 0, 9, 0, 0,
      ]);
    });
  });

  describe("Edge Cases & Zero Traps", () => {
    it("should handle the minimum length constraint (n = 2)", () => {
      expect(productExceptSelf([2, 3])).toEqual([3, 2]);
      expect(productExceptSelf([-5, 2])).toEqual([2, -5]);
      expect(productExceptSelf([0, 5])).toEqual([5, 0]);
    });

    it("should handle an array with exactly one zero", () => {
      // The zero's position gets the product of all other elements.
      // All other positions get 0.
      expect(productExceptSelf([0, 2, 3])).toEqual([6, 0, 0]);
      expect(productExceptSelf([2, 0, 3])).toEqual([0, 6, 0]);
      expect(productExceptSelf([2, 3, 0])).toEqual([0, 0, 6]);
    });

    it("should handle an array with exactly two zeros", () => {
      // Every element's "except self" product will include at least one zero.
      expect(productExceptSelf([0, 0, 3])).toEqual([0, 0, 0]);
      expect(productExceptSelf([0, 5, 0, 2])).toEqual([0, 0, 0, 0]);
    });

    it("should handle an array with all zeros", () => {
      expect(productExceptSelf([0, 0, 0, 0])).toEqual([0, 0, 0, 0]);
    });

    it("should handle arrays with 1s and -1s (identity elements)", () => {
      // Tests sign flipping logic without large magnitude products
      expect(productExceptSelf([1, 1, 1, 1])).toEqual([1, 1, 1, 1]);
      expect(productExceptSelf([-1, -1, -1, -1])).toEqual([-1, -1, -1, -1]);
      expect(productExceptSelf([1, -1, 1, -1])).toEqual([1, -1, 1, -1]);
    });
  });

  describe("Negative Numbers & Sign Flipping", () => {
    it("should handle an even number of negative numbers", () => {
      // Product of all is positive. Removing one negative makes the rest negative.
      expect(productExceptSelf([-1, -2, -3, -4])).toEqual([-24, -12, -8, -6]);
    });

    it("should handle an odd number of negative numbers", () => {
      // Product of all is negative. Removing one negative makes the rest positive.
      expect(productExceptSelf([-1, 2, -3])).toEqual([-6, 3, -2]);
      expect(productExceptSelf([-2, -3, -4])).toEqual([12, 8, 6]);
    });

    it("should handle mixed signs with zeros", () => {
      expect(productExceptSelf([-2, 0, 4, -1]).map((v) => v + 0)).toEqual([
        0, 8, 0, 0,
      ]);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum length array (n = 100,000) of all 1s in O(N) time", () => {
      // A naive O(N^2) nested loop approach will TLE here.
      // An O(N) prefix/suffix product approach will resolve this instantly.
      const largeOnesArray = new Array(100000).fill(1);
      const expected = new Array(100000).fill(1);
      expect(productExceptSelf(largeOnesArray)).toEqual(expected);
    });

    it("should handle maximum length array (n = 100,000) of alternating 1 and -1", () => {
      // 50,000 of 1s and 50,000 of -1s.
      // Removing one -1 leaves 49,999 -1s (odd), so the product is -1.
      // Removing one 1 leaves 50,000 -1s (even), so the product is 1.
      const alternatingArray = Array.from({ length: 100000 }, (_, i) =>
        i % 2 === 0 ? 1 : -1,
      );
      const expected = Array.from({ length: 100000 }, (_, i) =>
        i % 2 === 0 ? 1 : -1,
      );

      expect(productExceptSelf(alternatingArray)).toEqual(expected);
    });

    it("should handle maximum length array with valid 32-bit integer products", () => {
      // Constraints guarantee the product fits in a 32-bit integer.
      // We can safely use 2s and 3s. 3^19 is ~1.16 * 10^9, well within 32-bit signed int limit (2 * 10^9).
      // Let's use an array of twenty 2s and the rest 1s to keep products small but test scale.
      const scaledArray = new Array(100000).fill(1);
      for (let i = 0; i < 20; i++) {
        scaledArray[i] = 2;
      }

      const result = productExceptSelf(scaledArray);

      // For the first 20 elements, the product is 2^19 = 524288
      // For the remaining 99980 elements, the product is 2^20 = 1048576
      expect(result.slice(0, 20).every((val) => val === 524288)).toBe(true);
      expect(result.slice(20).every((val) => val === 1048576)).toBe(true);
    });
  });
});
