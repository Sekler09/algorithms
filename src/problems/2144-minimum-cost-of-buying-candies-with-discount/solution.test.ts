import { describe, it, expect } from "vitest";
import { minimumCost } from "./solution";

describe("2144. Minimum Cost of Buying Candies With Discount", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [1, 2, 3]", () => {
      // Sorted descending: [3, 2, 1]
      // Buy 3 and 2, get 1 for free.
      // Cost = 3 + 2 = 5
      expect(minimumCost([1, 2, 3])).toBe(5);
    });

    it("should pass Example 2: [6, 5, 7, 9, 2, 2]", () => {
      // Sorted descending: [9, 7, 6, 5, 2, 2]
      // Buy 9 and 7, get 6 for free.
      // Buy 5 and 2, get 2 for free.
      // Cost = 9 + 7 + 5 + 2 = 23
      expect(minimumCost([6, 5, 7, 9, 2, 2])).toBe(23);
    });

    it("should pass Example 3: [5, 5]", () => {
      // Only 2 candies, not enough to trigger the "buy 2 get 1 free" discount.
      // Cost = 5 + 5 = 10
      expect(minimumCost([5, 5])).toBe(10);
    });
  });

  describe("Base Cases & Small Arrays", () => {
    it("should handle a single candy (no discount possible)", () => {
      expect(minimumCost([10])).toBe(10);
      expect(minimumCost([100])).toBe(100);
    });

    it("should handle exactly two candies (no discount possible)", () => {
      expect(minimumCost([10, 20])).toBe(30);
    });

    it("should handle exactly three candies (one free)", () => {
      // [10, 20, 30] -> sorted [30, 20, 10] -> buy 30, 20, free 10. Cost = 50.
      expect(minimumCost([10, 20, 30])).toBe(50);
    });

    it("should handle exactly four candies (one free)", () => {
      // [10, 20, 30, 40] -> sorted [40, 30, 20, 10]
      // Buy 40, 30 (free 20). Buy 10.
      // Cost = 40 + 30 + 10 = 80
      expect(minimumCost([10, 20, 30, 40])).toBe(80);
    });
  });

  describe('The "Sorting Order" Trap', () => {
    it("should maximize discount by greedily pairing the most expensive candies", () => {
      // If you don't sort descending, you might accidentally pay for cheaper candies and get expensive ones free,
      // which violates the rule that the free candy must be <= the minimum of the two bought.
      // [1, 2, 3, 4, 5, 6] -> sorted [6, 5, 4, 3, 2, 1]
      // Buy 6, 5 (free 4). Buy 3, 2 (free 1).
      // Cost = 6 + 5 + 3 + 2 = 16
      expect(minimumCost([1, 2, 3, 4, 5, 6])).toBe(16);
    });

    it("should handle an already descending sorted array", () => {
      // [9, 8, 7, 6, 5, 4]
      // Buy 9, 8 (free 7). Buy 6, 5 (free 4).
      // Cost = 9 + 8 + 6 + 5 = 28
      expect(minimumCost([9, 8, 7, 6, 5, 4])).toBe(28);
    });
  });

  describe("Uniform Arrays (All Same Prices)", () => {
    it("should handle an array where all candies have the same price", () => {
      // [5, 5, 5, 5, 5, 5] -> 4 paid, 2 free. Cost = 20.
      expect(minimumCost([5, 5, 5, 5, 5, 5])).toBe(20);
    });

    it("should handle an array of identical prices with a remainder", () => {
      // [10, 10, 10, 10, 10] -> 4 paid, 1 free. Cost = 40.
      expect(minimumCost([10, 10, 10, 10, 10])).toBe(40);
    });
  });

  describe("Remainder Traps (N % 3 != 0)", () => {
    it("should correctly charge for the remaining 1 candy", () => {
      // Length 7: [7, 6, 5, 4, 3, 2, 1]
      // Buy 7, 6 (free 5). Buy 4, 3 (free 2). Buy 1.
      // Cost = 7 + 6 + 4 + 3 + 1 = 21
      expect(minimumCost([1, 2, 3, 4, 5, 6, 7])).toBe(21);
    });

    it("should correctly charge for the remaining 2 candies", () => {
      // Length 8: [8, 7, 6, 5, 4, 3, 2, 1]
      // Buy 8, 7 (free 6). Buy 5, 4 (free 3). Buy 2, 1.
      // Cost = 8 + 7 + 5 + 4 + 2 + 1 = 27
      expect(minimumCost([1, 2, 3, 4, 5, 6, 7, 8])).toBe(27);
    });
  });

  describe("Large Constraints & Performance", () => {
    it("should handle maximum constraint length (10^4) efficiently", () => {
      // 10,000 elements, all value 100.
      // 10000 / 3 = 3333 free candies. 6667 paid candies.
      // Cost = 6667 * 100 = 666700
      const largeUniform = new Array(10000).fill(100);
      expect(minimumCost(largeUniform)).toBe(666700);
    });

    it("should handle large values without overflow", () => {
      // Max value is 100. Max length is 10^4. Max possible sum is 10^6.
      // Fits well within standard 32-bit integer limits, but good to verify.
      const largeValues = new Array(10000).fill(100);
      expect(minimumCost(largeValues)).toBeLessThanOrEqual(1000000);
    });

    it("should handle an array of strictly increasing large numbers", () => {
      // 1 to 10000
      const increasing = Array.from({ length: 10000 }, (_, i) => i + 1);
      const result = minimumCost(increasing);
      // Sanity check: the sum should be strictly less than the total sum of 1..10000 (which is 50,005,000)
      const totalSum = (10000 * 10001) / 2;
      expect(result).toBeLessThan(totalSum);
      expect(result).toBeGreaterThan(0);
    });
  });
});
