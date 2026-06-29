import { describe, it, expect } from "vitest";
import { twoSum } from "./solution";

describe("Two Sum (LeetCode #1)", () => {
  // --- Official LeetCode Examples ---
  it("Example 1: should return [0, 1] for [2,7,11,15] target 9", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it("Example 2: should return [1, 2] for [3,2,4] target 6", () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it("Example 3: should return [0, 1] for [3,3] target 6", () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  // --- Edge Cases based on Constraints ---
  it("should handle minimum array length (2 elements)", () => {
    // Constraint: 2 <= nums.length <= 10^4
    expect(twoSum([1, 5], 6)).toEqual([0, 1]);
  });

  it("should handle negative numbers in the array", () => {
    // Constraint: -10^9 <= nums[i] <= 10^9
    expect(twoSum([-3, 4, 3, 90], 0)).toEqual([0, 2]);
  });

  it("should handle a negative target", () => {
    // Constraint: -10^9 <= target <= 10^9
    expect(twoSum([-5, 0, -2, -8], -7)).toEqual([0, 2]);
  });

  it("should handle large numbers (boundary near 10^9)", () => {
    expect(twoSum([1000000000, -1000000000], 0)).toEqual([0, 1]);
  });

  it("should handle large negative numbers", () => {
    expect(twoSum([-1000000000, 0, 100], -1000000000)).toEqual([0, 1]);
  });
});
