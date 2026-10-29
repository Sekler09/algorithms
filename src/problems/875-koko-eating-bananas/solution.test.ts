import { describe, it, expect } from "vitest";
import { minEatingSpeed } from "./solution";

describe("875. Koko Eating Bananas", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: piles = [3,6,7,11], h = 8 -> 4", () => {
      // At k = 4:
      // - ceil(3/4) + ceil(6/4) + ceil(7/4) + ceil(11/4) = 1 + 2 + 2 + 3 = 8.
      // k = 3 needs 1 + 2 + 3 + 4 = 10 hours, which exceeds h.
      expect(minEatingSpeed([3, 6, 7, 11], 8)).toBe(4);
    });

    it("should pass Example 2: piles = [30,11,23,4,20], h = 5 -> 30", () => {
      // With exactly one hour per pile, Koko must finish every pile in a single
      // hour, so k must be at least the largest pile.
      expect(minEatingSpeed([30, 11, 23, 4, 20], 5)).toBe(30);
    });

    it("should pass Example 3: piles = [30,11,23,4,20], h = 6 -> 23", () => {
      // At k = 23: 2 + 1 + 1 + 1 + 1 = 6 hours.
      expect(minEatingSpeed([30, 11, 23, 4, 20], 6)).toBe(23);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should return the minimum possible speed of 1 when time is plentiful", () => {
      expect(minEatingSpeed([1, 1, 1, 1], 10)).toBe(1);
      expect(minEatingSpeed([7], 100)).toBe(1);
    });

    it("should return the largest pile when h equals the number of piles", () => {
      // Each pile must be finished in exactly one hour, so k >= max(piles).
      expect(minEatingSpeed([5, 3, 8, 7], 4)).toBe(8);
      expect(minEatingSpeed([1, 1, 1], 3)).toBe(1); // max(piles) is 1
    });

    it("should handle a single pile", () => {
      // ceil(10^9 / k) <= 2 means k >= 5 * 10^8.
      expect(minEatingSpeed([1000000000], 2)).toBe(500000000);
      expect(minEatingSpeed([1000000000], 1000000000)).toBe(1);
    });

    it("should find the smallest k that just fits within h", () => {
      // k = 3: 1 + 2 + 3 + 4 = 10 hours (exactly h).
      expect(minEatingSpeed([3, 6, 7, 11], 10)).toBe(3);
    });

    it("should handle equal piles where leftover hours stay unused", () => {
      // k = 2: 4 * ceil(5/2) = 12 > 9; k = 3: 4 * ceil(5/3) = 8 <= 9.
      expect(minEatingSpeed([5, 5, 5, 5], 9)).toBe(3);
    });

    it("should handle a huge pile among tiny ones", () => {
      // h equals the pile count, so every pile must take one hour —
      // even a 10^9 pile forces k up to 10^9.
      expect(minEatingSpeed([1, 1, 1, 1000000000], 4)).toBe(1000000000);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle 10^4 piles of max size within the hour budget", () => {
      // k = 10^4: 10^4 piles * ceil(10^9 / 10^4) = 10^9 hours (exactly h).
      // k = 10^4 - 1: ceil(10^9 / 9999) = 100011, total > 10^9.
      const piles = new Array(10000).fill(1000000000);
      expect(minEatingSpeed(piles, 1000000000)).toBe(10000);
    });

    it("should handle h far larger than the total banana count", () => {
      // Even k = 1 finishes all 10^4 bananas in 10^4 hours, well under h.
      const piles = new Array(10000).fill(1);
      expect(minEatingSpeed(piles, 1000000000)).toBe(1);
    });
  });
});
