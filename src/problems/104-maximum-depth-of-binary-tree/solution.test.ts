import { describe, it, expect } from "vitest";
import { maxDepth } from "./solution";
import { arrayToTree } from "@/utils";

describe("104. Maximum Depth of Binary Tree", () => {
  const testMaxDepth = (arr: (number | null)[], expected: number) => {
    const result = maxDepth(arrayToTree(arr));
    expect(result).toBe(expected);
  };

  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [3,9,20,null,null,15,7] -> 3", () => {
      testMaxDepth([3, 9, 20, null, null, 15, 7], 3);
    });

    it("should pass Example 2: [1,null,2] -> 2", () => {
      testMaxDepth([1, null, 2], 2);
    });

    it("should pass Example 3: [] -> 0", () => {
      testMaxDepth([], 0);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should return 0 for an empty tree", () => {
      testMaxDepth([], 0);
    });

    it("should return 1 for a single-node tree", () => {
      testMaxDepth([42], 1);
    });

    it("should count depth, not node count", () => {
      // Three nodes hanging off one branch: depth 3, not 3 levels of 2.
      testMaxDepth([1, 2, null, null, 3], 3);
    });

    it("should handle a left-skewed tree (one node per level)", () => {
      testMaxDepth([1, 2, null, 3, null, 4], 4);
    });

    it("should handle a right-skewed tree (one node per level)", () => {
      testMaxDepth([1, null, 2, null, 3], 3);
    });

    it("should take the deepest branch of an unbalanced tree", () => {
      //      1
      //     / \
      //    2   3
      //   /     \
      //  4       5
      //           \
      //            6
      testMaxDepth([1, 2, 3, 4, null, null, 5, null, null, null, 6], 4);
    });

    it("should handle a perfect tree", () => {
      testMaxDepth([1, 2, 3, 4, 5, 6, 7], 3);
    });

    it("should handle negative and zero values", () => {
      testMaxDepth([-10, 9, -20, null, null, 15, 7], 3);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle a deep left-skewed tree", () => {
      // The solution is recursive, so keep the depth within the JS call-stack
      // budget while still exercising long recursion chains.
      const n = 5000;
      const arr: (number | null)[] = [];
      for (let i = 1; i <= n; i++) {
        arr.push(i);
        if (i < n) arr.push(null);
      }
      testMaxDepth(arr, n);
    });

    it("should handle a wide tree with many leaves", () => {
      // A perfect tree of depth 12: 4095 nodes, shallow recursion.
      const depth = 12;
      const size = 2 ** depth - 1;
      const arr: (number | null)[] = Array.from({ length: size }, (_, i) => i);
      testMaxDepth(arr, depth);
    });
  });
});
