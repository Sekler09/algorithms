import { describe, it, expect } from "vitest";
import { rotate } from "./solution";

describe("189. Rotate Array", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: nums = [1,2,3,4,5,6,7], k = 3 -> [5,6,7,1,2,3,4]", () => {
      const nums = [1, 2, 3, 4, 5, 6, 7];
      rotate(nums, 3);
      expect(nums).toEqual([5, 6, 7, 1, 2, 3, 4]);
    });

    it("should pass Example 2: nums = [-1,-100,3,99], k = 2 -> [3,99,-1,-100]", () => {
      const nums = [-1, -100, 3, 99];
      rotate(nums, 2);
      expect(nums).toEqual([3, 99, -1, -100]);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle k = 0 (no rotation)", () => {
      const nums = [1, 2, 3];
      rotate(nums, 0);
      expect(nums).toEqual([1, 2, 3]);
    });

    it("should handle k exactly equal to the array length", () => {
      // Rotating by the array length results in the original array
      const nums = [1, 2, 3, 4];
      rotate(nums, 4);
      expect(nums).toEqual([1, 2, 3, 4]);
    });

    it("should handle k greater than the array length", () => {
      // k = 10 with length 4 is equivalent to k = 2 (10 % 4 = 2)
      const nums = [1, 2, 3, 4];
      rotate(nums, 10);
      expect(nums).toEqual([3, 4, 1, 2]);
    });

    it("should handle an array with a single element", () => {
      const nums = [42];
      rotate(nums, 5);
      expect(nums).toEqual([42]);
    });

    it("should handle an array with all identical elements", () => {
      const nums = [7, 7, 7, 7, 7];
      rotate(nums, 3);
      expect(nums).toEqual([7, 7, 7, 7, 7]);
    });

    it("should handle negative numbers correctly", () => {
      const nums = [-5, -2, -9, -1];
      rotate(nums, 1);
      expect(nums).toEqual([-1, -5, -2, -9]);
    });

    it("should handle k being a multiple of the array length plus a remainder", () => {
      // length = 3, k = 7 (7 % 3 = 1)
      const nums = [1, 2, 3];
      rotate(nums, 7);
      expect(nums).toEqual([3, 1, 2]);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum constraints (n = 100,000, k = 100,000) in O(N) time", () => {
      // A naive approach using `nums.unshift(nums.pop())` in a loop runs in O(N * K) time
      // and will instantly Time Limit Exceeded (TLE) on this test.
      // An optimal O(N) time, O(1) space solution (e.g., array reversal) will pass instantly.
      const n = 100000;
      const k = 100000;
      const nums = Array.from({ length: n }, (_, i) => i + 1);

      rotate(nums, k);

      // Since k = n, the array should remain unchanged
      expect(nums[0]).toBe(1);
      expect(nums[n - 1]).toBe(n);
      expect(nums.every((val, idx) => val === idx + 1)).toBe(true);
    });

    it("should handle maximum constraints with a large effective rotation", () => {
      const n = 100000;
      const k = 50000; // Exactly half the array
      const nums = Array.from({ length: n }, (_, i) => i + 1);

      rotate(nums, k);

      // The first element should now be the one that was at index 50000
      expect(nums[0]).toBe(50001);
      expect(nums[n - 1]).toBe(50000);
      expect(nums[49999]).toBe(100000);
      expect(nums[50000]).toBe(1);
    });

    it("should handle maximum constraints with k = 1 on a large array", () => {
      // Tests if the algorithm avoids O(N^2) behavior even for small k
      const n = 100000;
      const nums = Array.from({ length: n }, (_, i) => i + 1);

      rotate(nums, 1);

      expect(nums[0]).toBe(n);
      expect(nums[1]).toBe(1);
      expect(nums[n - 1]).toBe(n - 1);
    });
  });
});
