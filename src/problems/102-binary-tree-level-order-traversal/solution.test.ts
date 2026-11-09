import { describe, it, expect } from "vitest";
import { levelOrder } from "./solution";
import { arrayToTree } from "@/utils";

describe("102. Binary Tree Level Order Traversal", () => {
  const testLevelOrder = (arr: (number | null)[], expected: number[][]) => {
    const result = levelOrder(arrayToTree(arr));
    expect(result).toEqual(expected);
  };

  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [3,9,20,null,null,15,7] -> [[3],[9,20],[15,7]]", () => {
      testLevelOrder([3, 9, 20, null, null, 15, 7], [[3], [9, 20], [15, 7]]);
    });

    it("should pass Example 2: [1,2,3,4,5] -> [[1],[2,3],[4,5]]", () => {
      testLevelOrder([1, 2, 3, 4, 5], [[1], [2, 3], [4, 5]]);
    });

    it("should pass Example 3: [1,null,2] -> [[1],[2]]", () => {
      testLevelOrder([1, null, 2], [[1], [2]]);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should return an empty array for an empty tree", () => {
      testLevelOrder([], []);
    });

    it("should handle a single-node tree", () => {
      testLevelOrder([42], [[42]]);
    });

    it("should group a perfect tree into exponentially growing levels", () => {
      testLevelOrder([1, 2, 3, 4, 5, 6, 7], [[1], [2, 3], [4, 5, 6, 7]]);
    });

    it("should handle a left-skewed tree (one node per level)", () => {
      testLevelOrder([1, 2, null, 3, null, 4], [[1], [2], [3], [4]]);
    });

    it("should handle a right-skewed tree (one node per level)", () => {
      testLevelOrder([1, null, 2, null, 3], [[1], [2], [3]]);
    });

    it("should handle gaps inside a level", () => {
      // 1 has only a left child (2); 2 has only a right child (3).
      testLevelOrder([1, 2, null, null, 3], [[1], [2], [3]]);
    });

    it("should handle negative and zero values", () => {
      testLevelOrder(
        [-10, 9, -20, null, null, 15, 7],
        [[-10], [9, -20], [15, 7]],
      );
    });
  });

  describe("Performance & Scale", () => {
    it("should traverse a left-skewed tree of 10^5 nodes without recursion overflow", () => {
      // A chain 1..n where every node only has a left child: a recursive DFS
      // would blow the call stack at this depth; a queue-based walk must cope.
      const n = 100000;
      const arr: (number | null)[] = [];
      for (let i = 1; i <= n; i++) {
        arr.push(i);
        if (i < n) arr.push(null);
      }
      const expected = Array.from({ length: n }, (_, i) => [i + 1]);

      const result = levelOrder(arrayToTree(arr));
      expect(result.length).toBe(n);
      expect(result[n - 1]).toEqual([n]);
      expect(result).toEqual(expected);
    });
  });
});
