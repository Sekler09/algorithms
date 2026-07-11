import { describe, it, expect } from "vitest";
import { sumOfFlooredPairs } from "./solution";

describe("1862. Sum of Floored Pairs", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [2, 5, 9] -> 10", () => {
      // 2/2=1, 2/5=0, 2/9=0 (1)
      // 5/2=2, 5/5=1, 5/9=0 (3)
      // 9/2=4, 9/5=1, 9/9=1 (6)
      // Total = 10
      expect(sumOfFlooredPairs([2, 5, 9])).toBe(10);
    });

    it("should pass Example 2: [7, 7, 7, 7, 7, 7, 7] -> 49", () => {
      // Every pair results in floor(7/7) = 1.
      // Total pairs = 7 * 7 = 49.
      expect(sumOfFlooredPairs([7, 7, 7, 7, 7, 7, 7])).toBe(49);
    });
  });

  describe("Base Cases & Single Elements", () => {
    it("should return 1 for a single element array", () => {
      expect(sumOfFlooredPairs([5])).toBe(1);
      expect(sumOfFlooredPairs([100000])).toBe(1);
    });

    it("should return 4 for two identical elements", () => {
      // [3, 3] -> 3/3=1, 3/3=1, 3/3=1, 3/3=1 -> 4
      expect(sumOfFlooredPairs([3, 3])).toBe(4);
    });
  });

  describe("Identical Elements (The N^2 Trap)", () => {
    it("should correctly calculate N^2 for an array of all 1s", () => {
      // 100 elements of 1. Every pair is floor(1/1) = 1. Total = 100 * 100 = 10000.
      const nums = new Array(100).fill(1);
      expect(sumOfFlooredPairs(nums)).toBe(10000);
    });

    it("should correctly calculate N^2 for an array of all 5s", () => {
      // 50 elements of 5. Every pair is floor(5/5) = 1. Total = 50 * 50 = 2500.
      const nums = new Array(50).fill(5);
      expect(sumOfFlooredPairs(nums)).toBe(2500);
    });
  });

  describe("Modulo Arithmetic (The 10^9 + 7 Trap)", () => {
    it("should apply modulo 10^9 + 7 when the sum exceeds the limit", () => {
      // 100,000 elements of 100,000.
      // Total sum = 100,000 * 100,000 = 10,000,000,000.
      // 10,000,000,000 % 1,000,000,007 = 999,999,937
      const nums = new Array(100000).fill(100000);
      expect(sumOfFlooredPairs(nums)).toBe(999999937);
    });

    it("should apply modulo 10^9 + 7 for an array of all 1s at max constraint", () => {
      // 100,000 elements of 1. Total sum = 10^10.
      const nums = new Array(100000).fill(1);
      expect(sumOfFlooredPairs(nums)).toBe(999999937);
    });
  });

  describe("Divisibility & Multiples", () => {
    it("should handle powers of 2 correctly", () => {
      // [1, 2, 4, 8]
      // 1: 1/1=1 (1)
      // 2: 2/1=2, 2/2=1 (3)
      // 4: 4/1=4, 4/2=2, 4/4=1 (7)
      // 8: 8/1=8, 8/2=4, 8/4=2, 8/8=1 (15)
      // Total = 1 + 3 + 7 + 15 = 26
      expect(sumOfFlooredPairs([1, 2, 4, 8])).toBe(26);
    });

    it("should handle a mix of multiples and non-multiples", () => {
      // [2, 3, 6]
      // 2: 2/2=1, 2/3=0, 2/6=0 (1)
      // 3: 3/2=1, 3/3=1, 3/6=0 (2)
      // 6: 6/2=3, 6/3=2, 6/6=1 (6)
      // Total = 1 + 2 + 6 = 9
      expect(sumOfFlooredPairs([2, 3, 6])).toBe(9);
    });
  });

  describe("Strictly Increasing / Decreasing", () => {
    it("should handle strictly increasing small numbers", () => {
      // [1, 2, 3]
      // 1: 1 (1)
      // 2: 2/1=2, 2/2=1 (3)
      // 3: 3/1=3, 3/2=1, 3/3=1 (5)
      // Total = 9
      expect(sumOfFlooredPairs([1, 2, 3])).toBe(9);
    });

    it("should handle primes correctly", () => {
      // [2, 3, 5, 7]
      // 2: 1 (1)
      // 3: 3/2=1, 3/3=1 (2)
      // 5: 5/2=2, 5/3=1, 5/5=1 (4)
      // 7: 7/2=3, 7/3=2, 7/5=1, 7/7=1 (7)
      // Total = 14
      expect(sumOfFlooredPairs([2, 3, 5, 7])).toBe(14);
    });
  });

  describe("Large Differences", () => {
    it("should handle 1 and a very large number", () => {
      // [1, 100000]
      // 1: 1/1=1, 1/100000=0 (1)
      // 100000: 100000/1=100000, 100000/100000=1 (100001)
      // Total = 100002
      expect(sumOfFlooredPairs([1, 100000])).toBe(100002);
    });

    it("should ignore smaller numbers dividing larger numbers (floor is 0)", () => {
      // [10, 20, 30, 40, 50]
      // Only pairs where i >= j contribute.
      // 10/10=1
      // 20/10=2, 20/20=1 -> 3
      // 30/10=3, 30/20=1, 30/30=1 -> 5
      // 40/10=4, 40/20=2, 40/30=1, 40/40=1 -> 8
      // 50/10=5, 50/20=2, 50/30=1, 50/40=1, 50/50=1 -> 10
      // Total = 1 + 3 + 5 + 8 + 10 = 27
      expect(sumOfFlooredPairs([10, 20, 30, 40, 50])).toBe(27);
    });
  });
});
