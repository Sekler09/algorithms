import { describe, it, expect } from "vitest";
import { sumOfMultiples } from "./solution";

describe("2652. Sum Multiples", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: n = 7 -> 21", () => {
      // Multiples: 3, 5, 6, 7. Sum = 21
      expect(sumOfMultiples(7)).toBe(21);
    });

    it("should pass Example 2: n = 10 -> 40", () => {
      // Multiples: 3, 5, 6, 7, 9, 10. Sum = 40
      expect(sumOfMultiples(10)).toBe(40);
    });

    it("should pass Example 3: n = 9 -> 30", () => {
      // Multiples: 3, 5, 6, 7, 9. Sum = 30
      expect(sumOfMultiples(9)).toBe(30);
    });
  });

  describe("Base Cases & Small Values", () => {
    it("should return 0 for n = 1", () => {
      expect(sumOfMultiples(1)).toBe(0);
    });

    it("should return 0 for n = 2", () => {
      expect(sumOfMultiples(2)).toBe(0);
    });

    it("should return 3 for n = 3 (first multiple of 3)", () => {
      expect(sumOfMultiples(3)).toBe(3);
    });

    it("should return 8 for n = 5 (first multiple of 5)", () => {
      // 3 + 5 = 8
      expect(sumOfMultiples(5)).toBe(8);
    });

    it("should return 14 for n = 6", () => {
      // 3 + 5 + 6 = 14
      expect(sumOfMultiples(6)).toBe(14);
    });
  });

  describe("Overlapping Multiples (The Duplicate Trap)", () => {
    it("should count 15 only once (multiple of 3 and 5)", () => {
      // Multiples up to 15: 3, 5, 6, 7, 9, 10, 12, 14, 15
      // Sum = 3+5+6+7+9+10+12+14+15 = 81
      expect(sumOfMultiples(15)).toBe(81);
    });

    it("should count 21 only once (multiple of 3 and 7)", () => {
      // Multiples up to 21: 3,5,6,7,9,10,12,14,15,18,20,21
      // Sum = 140
      expect(sumOfMultiples(21)).toBe(140);
    });

    it("should count 35 only once (multiple of 5 and 7)", () => {
      // Sum of valid multiples up to 35 is 342
      expect(sumOfMultiples(35)).toBe(342);
    });

    it("should count 105 only once (multiple of 3, 5, and 7)", () => {
      // 105 is the LCM of 3, 5, 7. It must be counted exactly once.
      // Sum of valid multiples up to 105 is 3045
      expect(sumOfMultiples(105)).toBe(3045);
    });
  });

  describe("Larger Values", () => {
    it("should handle n = 100", () => {
      // Sum = 2838
      expect(sumOfMultiples(100)).toBe(2838);
    });

    it("should handle n = 1000", () => {
      // Sum = 272066
      expect(sumOfMultiples(1000)).toBe(272066);
    });
  });
});
