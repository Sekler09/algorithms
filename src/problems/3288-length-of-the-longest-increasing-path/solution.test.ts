import { describe, it, expect } from "vitest";
import { maxPathLength } from "./solution";

describe("3288. Length of the Longest Increasing Path", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [[3,1],[2,2],[4,1],[0,0],[5,3]], k = 1 -> 3", () => {
      // coordinates[1] is [2,2].
      // Valid paths containing [2,2]:
      // [0,0] -> [2,2] -> [5,3] (length 3)
      expect(
        maxPathLength(
          [
            [3, 1],
            [2, 2],
            [4, 1],
            [0, 0],
            [5, 3],
          ],
          1,
        ),
      ).toBe(3);
    });

    it("should pass Example 2: [[2,1],[7,0],[5,6]], k = 2 -> 2", () => {
      // coordinates[2] is [5,6].
      // Valid paths containing [5,6]:
      // [2,1] -> [5,6] (length 2)
      expect(
        maxPathLength(
          [
            [2, 1],
            [7, 0],
            [5, 6],
          ],
          2,
        ),
      ).toBe(2);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle n = 1 (k = 0)", () => {
      expect(maxPathLength([[10, 10]], 0)).toBe(1);
    });

    it("should handle a strictly increasing sequence where k is in the middle", () => {
      // [1,1] -> [2,2] -> [3,3] -> [4,4]
      // k = 1 (which is [2,2]). Path: [1,1] -> [2,2] -> [3,3] -> [4,4]
      expect(
        maxPathLength(
          [
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4],
          ],
          1,
        ),
      ).toBe(4);
    });

    it("should handle k being the absolute minimum point (no valid predecessors)", () => {
      // [1,1] -> [2,2] -> [3,3]
      // k = 0 (which is [1,1]). Path: [1,1] -> [2,2] -> [3,3]
      expect(
        maxPathLength(
          [
            [1, 1],
            [2, 2],
            [3, 3],
          ],
          0,
        ),
      ).toBe(3);
    });

    it("should handle k being the absolute maximum point (no valid successors)", () => {
      // [1,1] -> [2,2] -> [3,3]
      // k = 2 (which is [3,3]). Path: [1,1] -> [2,2] -> [3,3]
      expect(
        maxPathLength(
          [
            [1, 1],
            [2, 2],
            [3, 3],
          ],
          2,
        ),
      ).toBe(3);
    });

    it("should handle a case where no other points can form a path with k", () => {
      // [1,5], [2,4], [3,3], [4,2], [5,1] (strictly decreasing y)
      // k = 2 (which is [3,3]). No point has both x > 3 and y > 3, nor x < 3 and y < 3.
      // So the only path is [[3,3]] itself.
      expect(
        maxPathLength(
          [
            [1, 5],
            [2, 4],
            [3, 3],
            [4, 2],
            [5, 1],
          ],
          2,
        ),
      ).toBe(1);
    });

    it("should handle duplicate x or y coordinates (but distinct points)", () => {
      // [1,1], [1,2], [2,2], [3,3]
      // k = 1 (which is [1,2]).
      // Predecessors: none (since x must be strictly less than 1).
      // Successors: [3,3].
      // Path: [1,2] -> [3,3] (length 2)
      expect(
        maxPathLength(
          [
            [1, 1],
            [1, 2],
            [2, 2],
            [3, 3],
          ],
          1,
        ),
      ).toBe(2);
    });
  });

  describe("Logic & 2D LIS Traps", () => {
    it("should correctly handle points that are valid in 1D but invalid in 2D", () => {
      // [1,5], [5,1], [3,3]
      // k = 2 (which is [3,3]).
      // [1,5] has x < 3 but y > 3 (invalid)
      // [5,1] has x > 3 but y < 3 (invalid)
      expect(
        maxPathLength(
          [
            [1, 5],
            [5, 1],
            [3, 3],
          ],
          2,
        ),
      ).toBe(1);
    });

    it("should correctly pick the longest path among multiple valid branches", () => {
      // [1,1], [2,2], [3,3], [4,4], [10, 10]
      // k = 1 ([2,2]).
      expect(
        maxPathLength(
          [
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4],
            [10, 10],
          ],
          1,
        ),
      ).toBe(5);
    });

    it("should handle a 'V' shaped distribution of points around k", () => {
      // Points: [1,3], [2,2], [3,1], [4,4], [5,5]
      // k = 3 ([4,4]). Predecessors can only be [1,3] or [2,2] or [3,1] if they have x<4 and y<4.
      // Only [1,3] and [2,2] and [3,1] satisfy this. The longest chain ending at [4,4] is [1,3] -> [4,4] or [2,2] -> [4,4].
      // Total length = 2 + 1 (for [5,5]) = 3.
      expect(
        maxPathLength(
          [
            [1, 3],
            [2, 2],
            [3, 1],
            [4, 4],
            [5, 5],
          ],
          3,
        ),
      ).toBe(3);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum constraints (n = 100,000) with a strictly increasing sequence in O(N log N) time", () => {
      // A naive O(N^2) DP approach will TLE here.
      // An optimal O(N log N) approach (using Fenwick tree or Binary Search on Y coordinates after sorting by X) will pass.
      const n = 100000;
      const coordinates = Array.from({ length: n }, (_, i) => [i, i]);
      const k = Math.floor(n / 2);

      expect(maxPathLength(coordinates, k)).toBe(n);
    });

    it("should handle maximum constraints with a strictly decreasing sequence", () => {
      const n = 100000;
      const coordinates = Array.from({ length: n }, (_, i) => [i, n - i]);
      const k = Math.floor(n / 2);

      expect(maxPathLength(coordinates, k)).toBe(1);
    });

    it("should handle maximum constraints with large coordinate values (up to 10^9)", () => {
      // Ensures coordinate compression is used if employing a Fenwick tree,
      // or that values aren't used as direct array indices.
      const n = 100000;
      const coordinates = Array.from({ length: n }, (_, i) => [
        i * 10000,
        i * 10000,
      ]);
      const k = 50000;

      expect(maxPathLength(coordinates, k)).toBe(n);
    });
  });
});
