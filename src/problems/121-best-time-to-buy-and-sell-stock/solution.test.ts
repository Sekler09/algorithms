import { describe, it, expect } from "vitest";
import { maxProfit } from "./solution";

describe("121. Best Time to Buy and Sell Stock", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [7,1,5,3,6,4] -> 5", () => {
      // Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5
      expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
    });

    it("should pass Example 2: [7,6,4,3,1] -> 0", () => {
      // Prices strictly decrease; no profitable transaction
      expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
    });
  });

  describe("Base Cases & Small Arrays", () => {
    it("should return 0 for a single-day array (cannot sell)", () => {
      // Constraint: 1 <= prices.length
      expect(maxProfit([1])).toBe(0);
      expect(maxProfit([10000])).toBe(0);
    });

    it("should handle two-day arrays", () => {
      expect(maxProfit([1, 2])).toBe(1);
      expect(maxProfit([2, 1])).toBe(0);
      expect(maxProfit([5, 5])).toBe(0);
    });

    it("should return 0 when all prices are identical", () => {
      expect(maxProfit([3, 3, 3, 3])).toBe(0);
    });
  });

  describe("Monotonic Series", () => {
    it("should take first-to-last profit on a strictly increasing series", () => {
      // Best buy is the earliest (lowest), sell is the latest (highest)
      expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
    });

    it("should return 0 on a strictly decreasing series", () => {
      expect(maxProfit([5, 4, 3, 2, 1])).toBe(0);
    });
  });

  describe("Min / Max Position Tricks", () => {
    it("should find profit when the minimum appears mid-array", () => {
      // Min at index 2 (price 1); best sell after that is 8
      expect(maxProfit([5, 4, 1, 3, 8, 2])).toBe(7);
    });

    it("should ignore a late minimum that has no profitable sell after it", () => {
      // Early profit 5→10 = 5 beats any trade after the trailing 1
      expect(maxProfit([5, 10, 1])).toBe(5);
    });

    it("should handle max price first, then a dip and recovery", () => {
      // Cannot sell before buying; best is buy 1 sell 4
      expect(maxProfit([10, 1, 3, 4, 2])).toBe(3);
    });

    it("should pick the global best among multiple peaks", () => {
      // Buy 1 sell 6 (=5) beats buy 2 sell 5 (=3) and buy 3 sell 4 (=1)
      expect(maxProfit([7, 1, 3, 2, 6, 4])).toBe(5);
    });
  });

  describe("Zero & Boundary Prices", () => {
    it("should handle zeros correctly", () => {
      expect(maxProfit([0, 0, 0])).toBe(0);
      expect(maxProfit([0, 5, 0, 3])).toBe(5);
      expect(maxProfit([3, 0, 0, 0])).toBe(0);
    });

    it("should handle maximum constraint prices (0..10^4)", () => {
      expect(maxProfit([0, 10000])).toBe(10000);
      expect(maxProfit([10000, 0])).toBe(0);
      expect(maxProfit([10000, 10000, 0, 10000])).toBe(10000);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum length (10^5) strictly decreasing in O(N)", () => {
      // Naive O(N^2) pair scan will TLE / hang here
      const prices = Array.from({ length: 100_000 }, (_, i) => 100_000 - i);
      expect(maxProfit(prices)).toBe(0);
    });

    it("should handle maximum length (10^5) strictly increasing in O(N)", () => {
      const prices = Array.from({ length: 100_000 }, (_, i) => i);
      expect(maxProfit(prices)).toBe(99_999);
    });

    it("should handle maximum length with a single valley near the end", () => {
      // All prices high, then one low followed by a recovery peak
      const prices = new Array(99_998).fill(5000);
      prices.push(0);
      prices.push(10000);
      expect(maxProfit(prices)).toBe(10000);
    });
  });
});
