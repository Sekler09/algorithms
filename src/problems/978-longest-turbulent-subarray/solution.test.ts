import { describe, it, expect } from "vitest";
import { maxTurbulenceSize } from "./solution";

describe("978. Longest Turbulent Subarray", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [9,4,2,10,7,8,8,1,9] -> 5", () => {
      // The turbulent subarray is [10,7,8,1,9] (length 5)
      // Wait, actually [4,2,10,7,8] is length 5? No, 4>2<10>7<8. Yes, length 5.
      // Let's trace:
      // 9>4<2? No, 4>2. So [9,4,2] breaks.
      // 4>2<10>7<8: length 5.
      // 8=8 breaks.
      // 8<1>9: length 3.
      expect(maxTurbulenceSize([9, 4, 2, 10, 7, 8, 8, 1, 9])).toBe(5);
    });

    it("should pass Example 2: [4,8,12,16] -> 2", () => {
      // Strictly increasing. Any adjacent pair is a valid turbulent subarray of length 2.
      expect(maxTurbulenceSize([4, 8, 12, 16])).toBe(2);
    });

    it("should pass Example 3: [100] -> 1", () => {
      expect(maxTurbulenceSize([100])).toBe(1);
    });
  });

  describe("Base Cases & Small Arrays", () => {
    it("should return 1 for a single element", () => {
      expect(maxTurbulenceSize([1])).toBe(1);
      expect(maxTurbulenceSize([999])).toBe(1);
    });

    it("should return 2 for two different elements", () => {
      expect(maxTurbulenceSize([1, 2])).toBe(2);
      expect(maxTurbulenceSize([5, 3])).toBe(2);
    });

    it("should return 1 for two identical elements", () => {
      expect(maxTurbulenceSize([2, 2])).toBe(1);
      expect(maxTurbulenceSize([0, 0])).toBe(1);
    });
  });

  describe('Monotonic Arrays (The "No Turbulence" Trap)', () => {
    it("should return 2 for strictly increasing arrays", () => {
      expect(maxTurbulenceSize([1, 2, 3, 4, 5])).toBe(2);
      expect(maxTurbulenceSize([-5, -4, -3, -2, -1])).toBe(2);
    });

    it("should return 2 for strictly decreasing arrays", () => {
      expect(maxTurbulenceSize([5, 4, 3, 2, 1])).toBe(2);
    });
  });

  describe("Equal Elements & Breaking the Sequence", () => {
    it("should reset to 1 when all elements are equal", () => {
      expect(maxTurbulenceSize([5, 5, 5, 5, 5])).toBe(1);
    });

    it("should correctly handle equals breaking a sequence in the middle", () => {
      // [1, 3, 3, 2, 4] -> [1, 3] is len 2. [3, 2, 4] is len 3.
      expect(maxTurbulenceSize([1, 3, 3, 2, 4])).toBe(3);
    });

    it("should correctly handle equals at the very beginning", () => {
      // [2, 2, 1, 3, 2] -> [2, 1, 3, 2] is len 4.
      expect(maxTurbulenceSize([2, 2, 1, 3, 2])).toBe(4);
    });

    it("should correctly handle equals at the very end", () => {
      // [1, 3, 2, 4, 4] -> [1, 3, 2, 4] is len 4.
      expect(maxTurbulenceSize([1, 3, 2, 4, 4])).toBe(4);
    });

    it("should handle multiple equals scattered around", () => {
      // [1, 2, 2, 3, 1, 1, 4] -> max is [2, 3, 1] (len 3) or [1, 4] (len 2)
      expect(maxTurbulenceSize([1, 2, 2, 3, 1, 1, 4])).toBe(3);
    });
  });

  describe("Perfectly Turbulent Arrays", () => {
    it("should return full length for perfectly turbulent (odd length)", () => {
      // < > < >
      expect(maxTurbulenceSize([1, 3, 2, 4, 3])).toBe(5);
    });

    it("should return full length for perfectly turbulent (even length)", () => {
      // > < >
      expect(maxTurbulenceSize([4, 2, 5, 1])).toBe(4);
    });

    it("should handle perfectly turbulent with negative numbers", () => {
      // > < > <
      expect(maxTurbulenceSize([10, -5, 10, -5, 10])).toBe(5);
    });
  });

  describe("Complex & Edge Scenarios", () => {
    it("should find the max turbulent subarray when it is at the very end", () => {
      // [1, 1, 1, 1, 1, 1, 2, 1, 2] -> max is [1, 2, 1, 2] at the end (len 4)
      expect(maxTurbulenceSize([1, 1, 1, 1, 1, 1, 2, 1, 2])).toBe(4);
    });

    it("should find the max turbulent subarray when it is at the very beginning", () => {
      // [9, 2, 8, 1, 7, 7, 7, 7] -> max is [9, 2, 8, 1, 7] at the start (len 5)
      expect(maxTurbulenceSize([9, 2, 8, 1, 7, 7, 7, 7])).toBe(5);
    });

    it("should handle large numbers correctly", () => {
      expect(maxTurbulenceSize([1000000, 1, 1000000, 1, 1000000])).toBe(5);
    });
  });
});
