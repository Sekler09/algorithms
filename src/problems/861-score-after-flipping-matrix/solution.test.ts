import { describe, it, expect } from "vitest";
import { matrixScore } from "./solution";

describe("861. Score After Flipping Matrix", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: mixed matrix requiring row and column toggles", () => {
      // Original:
      // 0 0 1 1 -> toggle row -> 1 1 0 0 (12)
      // 1 0 1 0 -> keep row  -> 1 0 1 0 (10)
      // 1 1 0 0 -> keep row  -> 1 1 0 0 (12)
      // After row toggles, cols 2 and 3 have more 0s than 1s, so toggle them.
      // Final:
      // 1 1 1 1 (15)
      // 1 0 0 1 (9)
      // 1 1 1 1 (15)
      // Sum = 15 + 9 + 15 = 39
      expect(
        matrixScore([
          [0, 0, 1, 1],
          [1, 0, 1, 0],
          [1, 1, 0, 0],
        ]),
      ).toBe(39);
    });

    it("should pass Example 2: single element matrix", () => {
      expect(matrixScore([[0]])).toBe(1);
    });
  });

  describe("Base Cases & Small Matrices", () => {
    it("should return 1 for a 1x1 matrix with 0", () => {
      expect(matrixScore([[0]])).toBe(1);
    });

    it("should return 1 for a 1x1 matrix with 1", () => {
      expect(matrixScore([[1]])).toBe(1);
    });

    it("should handle a single row matrix", () => {
      // [0, 1, 0, 1] -> toggle row -> [1, 0, 1, 0] -> then toggle cols 1 and 3 -> [1, 1, 1, 1] -> 15
      expect(matrixScore([[0, 1, 0, 1]])).toBe(15);

      // [1, 0, 1, 0] -> keep row -> [1, 0, 1, 0] -> toggle cols 1 and 3 -> [1, 1, 1, 1] -> 15
      expect(matrixScore([[1, 0, 1, 0]])).toBe(15);
    });

    it("should handle a single column matrix", () => {
      // [[0], [1], [0]] -> toggle rows 0 and 2 -> [[1], [1], [1]] -> 1+1+1 = 3
      expect(matrixScore([[0], [1], [0]])).toBe(3);
    });
  });

  describe("Uniform Matrices (All 0s or All 1s)", () => {
    it("should maximize score for an all-zeros matrix", () => {
      // Toggle all rows -> all 1s. No column toggles needed.
      // 3x3 -> 7 + 7 + 7 = 21
      expect(
        matrixScore([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ]),
      ).toBe(21);
    });

    it("should maximize score for an all-ones matrix", () => {
      // Already optimal. No toggles needed.
      // 2x2 -> 3 + 3 = 6
      expect(
        matrixScore([
          [1, 1],
          [1, 1],
        ]),
      ).toBe(6);
    });
  });

  describe('The "Greedy Row Toggle" Trap', () => {
    it("should force row toggles when the first column is 0", () => {
      // First col is 0, so row MUST be toggled to make the MSB 1.
      // [0, 1] -> [1, 0]
      // [0, 0] -> [1, 1]
      // Col 1 has [0, 1] -> one 1, one 0. Keep or toggle doesn't matter, sum is same.
      // If keep: [1, 0] (2) + [1, 1] (3) = 5
      expect(
        matrixScore([
          [0, 1],
          [0, 0],
        ]),
      ).toBe(5);
    });

    it("should handle a matrix where every row needs toggling", () => {
      // All rows start with 0.
      // [0, 0, 0] -> [1, 1, 1] (7)
      // [0, 1, 1] -> [1, 0, 0] (4)
      // Sum = 11
      expect(
        matrixScore([
          [0, 0, 0],
          [0, 1, 1],
        ]),
      ).toBe(11);
    });
  });

  describe('The "Column Toggle" Trap', () => {
    it("should toggle columns when there are more 0s than 1s", () => {
      // First col is already 1s.
      // [1, 0, 0]
      // [1, 0, 0]
      // [1, 0, 0]
      // Col 1 and 2 are all 0s -> toggle them.
      // Result: all 1s -> 7 + 7 + 7 = 21
      expect(
        matrixScore([
          [1, 0, 0],
          [1, 0, 0],
          [1, 0, 0],
        ]),
      ).toBe(21);
    });

    it("should NOT toggle columns when there are more 1s than 0s", () => {
      // [1, 1, 0] (6)
      // [1, 1, 0] (6)
      // [1, 0, 1] (5)
      // Col 1 has two 1s -> keep. Col 2 has one 1, two 0s -> toggle.
      // Result:
      // [1, 1, 1] (7)
      // [1, 1, 1] (7)
      // [1, 0, 0] (4)
      // Sum = 18
      expect(
        matrixScore([
          [1, 1, 0],
          [1, 1, 0],
          [1, 0, 1],
        ]),
      ).toBe(18);
    });
  });

  describe("Complex & Mixed Scenarios", () => {
    it("should handle a 2x2 matrix requiring both row and column toggles", () => {
      // [0, 1] -> toggle row -> [1, 0]
      // [1, 0] -> keep row  -> [1, 0]
      // Col 1 is [0, 0] -> toggle -> [1, 1]
      // Result:
      // [1, 1] (3)
      // [1, 1] (3)
      // Sum = 6
      expect(
        matrixScore([
          [0, 1],
          [1, 0],
        ]),
      ).toBe(6);
    });

    it("should handle maximum constraint limits (20x20) without performance issues", () => {
      // 20x20 matrix of all 1s.
      // Each row is 2^20 - 1 = 1048575.
      // Total sum = 20 * 1048575 = 20971500.
      const grid = Array(20)
        .fill(null)
        .map(() => Array(20).fill(1));
      expect(matrixScore(grid)).toBe(20971500);
    });
  });
});
