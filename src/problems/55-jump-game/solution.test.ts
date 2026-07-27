import { describe, it, expect } from "vitest";
import { canJump } from "./solution";

describe("55. Jump Game", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [2,3,1,1,4] -> true", () => {
      // Jump 1 step from index 0 to 1, then 3 steps to the last index.
      expect(canJump([2, 3, 1, 1, 4])).toBe(true);
    });

    it("should pass Example 2: [3,2,1,0,4] -> false", () => {
      // You will always arrive at index 3 no matter what.
      // Its maximum jump length is 0, making it impossible to reach the last index.
      expect(canJump([3, 2, 1, 0, 4])).toBe(false);
    });
  });

  describe("Edge Cases & Reachability Traps", () => {
    it("should return true for a single-element array (already at the last index)", () => {
      expect(canJump([0])).toBe(true);
      expect(canJump([5])).toBe(true);
    });

    it("should return true if the first jump can reach or exceed the last index", () => {
      expect(canJump([10, 0, 0, 0, 0])).toBe(true);
      expect(canJump([5, 0, 0, 0, 0])).toBe(true);
    });

    it("should return false if the first element is 0 and length > 1", () => {
      expect(canJump([0, 1])).toBe(false);
      expect(canJump([0, 2, 3])).toBe(false);
    });

    it("should handle arrays with all 1s (barely reachable)", () => {
      expect(canJump([1, 1, 1, 1])).toBe(true);
      expect(canJump([1, 1, 1, 1, 1])).toBe(true);
    });

    it("should handle arrays with all 0s (length > 1)", () => {
      expect(canJump([0, 0])).toBe(false);
      expect(canJump([0, 0, 0, 0])).toBe(false);
    });

    it("should handle a zero trap that can be jumped OVER", () => {
      // Index 0 can jump to index 2, bypassing the 0 at index 1
      expect(canJump([2, 0, 1, 1, 4])).toBe(true);
      // Index 0 jumps to index 1, which jumps over 0 at index 2 to index 4
      expect(canJump([3, 2, 0, 1, 4])).toBe(true);
    });

    it("should handle a zero trap that CANNOT be jumped over", () => {
      expect(canJump([1, 0, 1, 1, 1])).toBe(false);
      expect(canJump([1, 1, 0, 1, 1])).toBe(false);
    });

    it("should handle zeros at the end of the array", () => {
      // Can jump directly to the last index
      expect(canJump([2, 0, 0])).toBe(true);
      expect(canJump([3, 1, 0, 0])).toBe(true);
    });

    it("should handle large jumps at the end that are blocked earlier", () => {
      expect(canJump([1, 1, 1, 0, 10])).toBe(false);
      expect(canJump([2, 1, 0, 0, 5])).toBe(false);
    });

    it("should handle alternating 1s and 0s", () => {
      expect(canJump([1, 1, 1, 1, 0])).toBe(true); // Reachable
      expect(canJump([1, 0, 1, 0, 1])).toBe(false); // Unreachable trap
    });

    it("should handle a very long array that is reachable", () => {
      const reachableArray = new Array(10000).fill(1);
      expect(canJump(reachableArray)).toBe(true);
    });

    it("should handle a very long array that is unreachable due to a late zero trap", () => {
      const unreachableArray = new Array(9999).fill(1);
      unreachableArray.push(0, 1); // Trap at the second to last position
      expect(canJump(unreachableArray)).toBe(false);
    });

    it("should handle strictly decreasing jumps that fail at the end", () => {
      expect(canJump([5, 4, 3, 2, 1, 0])).toBe(true); // Can reach the end from index 0
      expect(canJump([4, 3, 2, 1, 0, 1])).toBe(false); // Gets stuck at the 0
    });

    it("should handle cases where multiple paths exist but only one works", () => {
      // Path 1: 0->1->3 (stuck at 0)
      // Path 2: 0->2->4 (success)
      expect(canJump([2, 1, 2, 0, 1])).toBe(true);
    });
  });
});
