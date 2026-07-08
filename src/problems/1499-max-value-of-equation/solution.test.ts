import { describe, it, expect } from "vitest";
import { findMaxValueOfEquation } from "./solution";

describe("1499. Maximum Value of Equation", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [[1,3],[2,0],[5,10],[6,-10]], k = 1", () => {
      // Valid pairs within k=1:
      // (1,3) & (2,0): 3+0+1 = 4
      // (5,10) & (6,-10): 10+(-10)+1 = 1
      expect(
        findMaxValueOfEquation(
          [
            [1, 3],
            [2, 0],
            [5, 10],
            [6, -10],
          ],
          1,
        ),
      ).toBe(4);
    });

    it("should pass Example 2: [[0,0],[3,0],[9,2]], k = 3", () => {
      // Only valid pair: (0,0) & (3,0): 0+0+3 = 3
      expect(
        findMaxValueOfEquation(
          [
            [0, 0],
            [3, 0],
            [9, 2],
          ],
          3,
        ),
      ).toBe(3);
    });
  });

  describe("Base Cases", () => {
    it("should handle two points within k", () => {
      // (0,1) & (1,2): 1+2+1 = 4
      expect(
        findMaxValueOfEquation(
          [
            [0, 1],
            [1, 2],
          ],
          1,
        ),
      ).toBe(4);
    });

    it("should handle two points exactly at distance k", () => {
      // (0,5) & (3,5): 5+5+3 = 13
      expect(
        findMaxValueOfEquation(
          [
            [0, 5],
            [3, 5],
          ],
          3,
        ),
      ).toBe(13);
    });
  });

  describe("Negative Coordinates", () => {
    it("should handle negative x values", () => {
      // (-5,10) & (-3,5): 10+5+2 = 17
      expect(
        findMaxValueOfEquation(
          [
            [-5, 10],
            [-3, 5],
          ],
          2,
        ),
      ).toBe(17);
    });

    it("should handle negative y values", () => {
      // (0,-5) & (1,-3): -5+(-3)+1 = -7
      expect(
        findMaxValueOfEquation(
          [
            [0, -5],
            [1, -3],
          ],
          1,
        ),
      ).toBe(-7);
    });

    it("should handle mixed positive and negative coordinates", () => {
      // (-2,10) & (1,20): 10+20+3 = 33 (best)
      // (-2,10) & (0,-5): 10+(-5)+2 = 7
      // (0,-5) & (1,20): -5+20+1 = 16
      expect(
        findMaxValueOfEquation(
          [
            [-2, 10],
            [0, -5],
            [1, 20],
          ],
          3,
        ),
      ).toBe(33);
    });
  });

  describe("Large k (All pairs valid)", () => {
    it("should find the global maximum when k is very large", () => {
      // Best: (0,100) & (100,100): 100+100+100 = 300
      expect(
        findMaxValueOfEquation(
          [
            [0, 100],
            [50, 1],
            [100, 100],
          ],
          1000,
        ),
      ).toBe(300);
    });
  });

  describe('The "Not Adjacent" Trap', () => {
    it("should find optimal pair that is not adjacent in the array", () => {
      // (0,1) & (1,100): 1+100+1 = 102
      // (1,100) & (3,1): 100+1+2 = 103 ← max
      expect(
        findMaxValueOfEquation(
          [
            [0, 1],
            [1, 100],
            [2, 1],
            [3, 1],
          ],
          3,
        ),
      ).toBe(103);
    });
  });

  describe('The "Deque Window Eviction" Trap', () => {
    it("should correctly evict old points from the deque", () => {
      // Best pair: (0,100) & (2,1): 100+1+2 = 103
      // (0,100) must be evicted when processing (3,1) because 3-0=3 > k=2
      expect(
        findMaxValueOfEquation(
          [
            [0, 100],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
          ],
          2,
        ),
      ).toBe(103);
    });
  });

  describe("Monotonic Deque Behavior", () => {
    it("should prefer higher (yi - xi) values even if they are older", () => {
      // At point (2,1):
      //   with (0,100): 100+1+2 = 103 ← best (yi-xi = 100)
      //   with (1,1): 1+1+1 = 3 (yi-xi = 0)
      expect(
        findMaxValueOfEquation(
          [
            [0, 100],
            [1, 1],
            [2, 1],
          ],
          2,
        ),
      ).toBe(103);
    });

    it("should handle case where newer point has better (yi - xi)", () => {
      // At point (2,1):
      //   with (0,1): 1+1+2 = 4 (yi-xi = 1)
      //   with (1,100): 100+1+1 = 102 ← best (yi-xi = 99)
      expect(
        findMaxValueOfEquation(
          [
            [0, 1],
            [1, 100],
            [2, 1],
          ],
          2,
        ),
      ).toBe(102);
    });
  });

  describe("Edge Cases with Same (yi - xi) Values", () => {
    it("should handle multiple points with same (yi - xi)", () => {
      // All have yi-xi=0
      // Best: (0,0) & (3,3): 0+3+3 = 6
      expect(
        findMaxValueOfEquation(
          [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3],
          ],
          3,
        ),
      ).toBe(6);
    });

    it("should handle decreasing (yi - xi) values", () => {
      // (0,10) yi-xi=10, (1,9) yi-xi=8, (2,8) yi-xi=6, (3,7) yi-xi=4
      // Best: (0,10) & (3,7): 10+7+3 = 20
      expect(
        findMaxValueOfEquation(
          [
            [0, 10],
            [1, 9],
            [2, 8],
            [3, 7],
          ],
          3,
        ),
      ).toBe(20);
    });
  });

  describe("Large Numbers", () => {
    it("should handle large coordinates without overflow", () => {
      // (0, 10^9) & (1, 10^9): 10^9 + 10^9 + 1 = 2*10^9 + 1
      expect(
        findMaxValueOfEquation(
          [
            [0, 1000000000],
            [1, 1000000000],
          ],
          1,
        ),
      ).toBe(2000000001);
    });

    it("should handle large negative coordinates", () => {
      // (-10^9, -10^9) & (0, 0): -10^9 + 0 + 10^9 = 0
      expect(
        findMaxValueOfEquation(
          [
            [-1000000000, -1000000000],
            [0, 0],
          ],
          1000000000,
        ),
      ).toBe(0);
    });
  });
});
