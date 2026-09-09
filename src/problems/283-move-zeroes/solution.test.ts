import { describe, it, expect } from "vitest";
import { moveZeroes } from "./solution";

describe("283. Move Zeroes", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [0,1,0,3,12] -> [1,3,12,0,0]", () => {
      const nums = [0, 1, 0, 3, 12];
      moveZeroes(nums);
      expect(nums).toEqual([1, 3, 12, 0, 0]);
    });

    it("should pass Example 2: [0] -> [0]", () => {
      const nums = [0];
      moveZeroes(nums);
      expect(nums).toEqual([0]);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle an array with no zeros", () => {
      const nums = [1, 2, 3, 4, 5];
      moveZeroes(nums);
      expect(nums).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle an array with all zeros", () => {
      const nums = [0, 0, 0, 0];
      moveZeroes(nums);
      expect(nums).toEqual([0, 0, 0, 0]);
    });

    it("should handle zeros only at the beginning", () => {
      const nums = [0, 0, 1, 2, 3];
      moveZeroes(nums);
      expect(nums).toEqual([1, 2, 3, 0, 0]);
    });

    it("should handle zeros only at the end", () => {
      const nums = [1, 2, 3, 0, 0];
      moveZeroes(nums);
      expect(nums).toEqual([1, 2, 3, 0, 0]);
    });

    it("should handle alternating zeros and non-zeros", () => {
      const nums = [0, 1, 0, 2, 0, 3];
      moveZeroes(nums);
      expect(nums).toEqual([1, 2, 3, 0, 0, 0]);
    });

    it("should handle a single non-zero element", () => {
      const nums = [42];
      moveZeroes(nums);
      expect(nums).toEqual([42]);
    });

    it("should handle negative numbers and zeros", () => {
      const nums = [0, -1, 0, -2, 0, -3];
      moveZeroes(nums);
      expect(nums).toEqual([-1, -2, -3, 0, 0, 0]);
    });

    it("should strictly maintain the relative order of non-zero elements", () => {
      // A common bug is sorting the array or using a stable sort that messes up order
      const nums = [0, 5, 0, 3, 0, 1, 0, 4];
      moveZeroes(nums);
      expect(nums).toEqual([5, 3, 1, 4, 0, 0, 0, 0]);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum length array (10,000) of all zeros in O(N) time", () => {
      // A naive O(N^2) approach (like splicing and pushing) will TLE here.
      const nums = new Array(10000).fill(0);
      moveZeroes(nums);
      expect(nums.every((n) => n === 0)).toBe(true);
    });

    it("should handle maximum length array (10,000) with no zeros in O(N) time", () => {
      const nums = Array.from({ length: 10000 }, (_, i) => i + 1);
      moveZeroes(nums);
      expect(nums).toEqual(Array.from({ length: 10000 }, (_, i) => i + 1));
    });

    it("should handle maximum length array (10,000) with alternating 0 and 1", () => {
      const nums = Array.from({ length: 10000 }, (_, i) =>
        i % 2 === 0 ? 0 : 1,
      );
      moveZeroes(nums);
      const expected = [...new Array(5000).fill(1), ...new Array(5000).fill(0)];
      expect(nums).toEqual(expected);
    });

    it("should handle maximum length array with a single non-zero at the very end", () => {
      // Tests if the algorithm avoids unnecessary swaps or O(N^2) behavior
      // when the only non-zero element is already in its correct final position.
      const nums = [...new Array(9999).fill(0), 1];
      moveZeroes(nums);
      expect(nums).toEqual([1, ...new Array(9999).fill(0)]);
    });

    it("should handle maximum length array with a single non-zero at the very beginning", () => {
      // Tests if the algorithm correctly shifts the single non-zero element
      // without excessive operations or losing the value.
      const nums = [1, ...new Array(9999).fill(0)];
      moveZeroes(nums);
      expect(nums).toEqual([1, ...new Array(9999).fill(0)]);
    });
  });
});
