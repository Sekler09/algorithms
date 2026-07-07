import { describe, it, expect } from "vitest";
import { maxPoints } from "./solution";

describe("149. Max Points on a Line", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: 3 points on a diagonal", () => {
      expect(
        maxPoints([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
      ).toBe(3);
    });

    it("should pass Example 2: complex arrangement", () => {
      // The 4 points forming the line are: (1,4), (2,3), (3,2), (4,1)
      expect(
        maxPoints([
          [1, 1],
          [3, 2],
          [5, 3],
          [4, 1],
          [2, 3],
          [1, 4],
        ]),
      ).toBe(4);
    });
  });

  describe("Base Cases", () => {
    it("should return 1 for a single point", () => {
      expect(maxPoints([[0, 0]])).toBe(1);
    });

    it("should return 2 for two points", () => {
      expect(
        maxPoints([
          [0, 0],
          [1, 1],
        ]),
      ).toBe(2);
      expect(
        maxPoints([
          [0, 0],
          [100, 100],
        ]),
      ).toBe(2);
    });
  });

  describe("Axis-Aligned Lines (Division by Zero Traps)", () => {
    it("should handle vertical lines (x is constant, dx = 0)", () => {
      expect(
        maxPoints([
          [1, 1],
          [1, 2],
          [1, 3],
          [1, 4],
          [1, 5],
        ]),
      ).toBe(5);
    });

    it("should handle horizontal lines (y is constant, dy = 0)", () => {
      expect(
        maxPoints([
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
        ]),
      ).toBe(5);
    });
  });

  describe("Negative Coordinates & Origin", () => {
    it("should handle lines passing through the origin", () => {
      expect(
        maxPoints([
          [-1, -1],
          [0, 0],
          [1, 1],
          [2, 2],
        ]),
      ).toBe(4);
    });

    it("should handle negative slopes", () => {
      // y = -x + 2 -> (0,2), (1,1), (2,0), (3,-1)
      expect(
        maxPoints([
          [0, 2],
          [1, 1],
          [2, 0],
          [3, -1],
        ]),
      ).toBe(4);
    });

    it("should handle mixed positive and negative coordinates", () => {
      expect(
        maxPoints([
          [-5, -5],
          [0, 0],
          [5, 5],
          [10, 10],
        ]),
      ).toBe(4);
    });
  });

  describe('The "Parallel Lines" Trap', () => {
    it("should not count points from parallel lines together", () => {
      // Line 1: (0,0), (1,1), (2,2) -> slope 1
      // Line 2: (0,1), (1,2), (2,3) -> slope 1
      // Max points on a single line is 3, not 6.
      expect(
        maxPoints([
          [0, 0],
          [1, 1],
          [2, 2],
          [0, 1],
          [1, 2],
          [2, 3],
        ]),
      ).toBe(3);
    });
  });

  describe('The "Star/Cross" Pattern Trap', () => {
    it("should handle multiple lines intersecting at a single point", () => {
      // (0,0) is the center.
      // Horizontal: (-1,0), (0,0), (1,0) -> 3 points
      // Vertical: (0,-1), (0,0), (0,1) -> 3 points
      // Diagonal: (-1,-1), (0,0), (1,1) -> 3 points
      expect(
        maxPoints([
          [-1, 0],
          [0, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [1, 1],
        ]),
      ).toBe(3);
    });
  });

  describe("Precision & GCD Traps", () => {
    it("should correctly identify slopes that are mathematically equal but look different", () => {
      // (0,0) to (2,3) -> slope 3/2
      // (0,0) to (4,6) -> slope 6/4 = 3/2
      // (0,0) to (6,9) -> slope 9/6 = 3/2
      // If you use floating point division, 6/4 might evaluate slightly differently than 3/2.
      expect(
        maxPoints([
          [0, 0],
          [2, 3],
          [4, 6],
          [6, 9],
        ]),
      ).toBe(4);
    });

    it("should handle large coordinates without floating point errors", () => {
      expect(
        maxPoints([
          [0, 0],
          [10000, 10000],
          [-10000, -10000],
        ]),
      ).toBe(3);
    });
  });
});
