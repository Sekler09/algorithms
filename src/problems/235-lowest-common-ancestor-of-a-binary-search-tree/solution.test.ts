import { describe, it, expect } from "vitest";
import { lowestCommonAncestor } from "./solution";
import { arrayToTree } from "@/utils";
import { TreeNode } from "@/types";

describe("235. Lowest Common Ancestor of a Binary Search Tree", () => {
  const findNode = (root: TreeNode | null, val: number): TreeNode => {
    // Iterative BST lookup: a recursive DFS would overflow on the deep
    // skewed tree used in the scale test.
    let node = root;
    while (node && node.val !== val) {
      node = val < node.val ? node.left : node.right;
    }
    return node!;
  };

  const testLCA = (arr: (number | null)[], pVal: number, qVal: number, expectedVal: number) => {
    const root = arrayToTree(arr);
    const result = lowestCommonAncestor(root, findNode(root, pVal), findNode(root, qVal));
    expect(result!.val).toBe(expectedVal);
  };

  describe("LeetCode Official Examples", () => {
    const tree = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5];

    it("should pass Example 1: LCA(2, 8) -> 6 (split at the root)", () => {
      testLCA(tree, 2, 8, 6);
    });

    it("should pass Example 2: LCA(2, 4) -> 2 (a node can be an ancestor of itself)", () => {
      testLCA(tree, 2, 4, 2);
    });

    it("should pass Example 3: [2,1], LCA(2, 1) -> 2", () => {
      testLCA([2, 1], 2, 1, 2);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    const tree = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5];

    it("should split at the root when p and q are deep in different subtrees", () => {
      testLCA(tree, 0, 9, 6);
    });

    it("should return the parent when q is a direct child of p", () => {
      testLCA(tree, 4, 5, 4);
    });

    it("should split at the branching parent below the root", () => {
      // 3 and 5 are the left/right children of 4, deep under node 2.
      testLCA(tree, 3, 5, 4);
    });

    it("should split at an interior node whose subtrees hold p and q", () => {
      // 0 hangs left of 2; 3 hangs right of 2 (under 4).
      testLCA(tree, 0, 3, 2);
    });

    it("should handle negative and mixed-sign values", () => {
      testLCA([-5, -10, 0, null, null, -2, 3], -10, 3, -5);
      testLCA([-5, -10, 0, null, null, -2, 3], -2, 3, 0);
    });

    it("should handle extreme values near +/- 10^9", () => {
      testLCA([1000000000, -1000000000], -1000000000, 1000000000, 1000000000);
    });

    it("should return the actual node object from the tree, not a copy", () => {
      const root = arrayToTree(tree);
      const result = lowestCommonAncestor(root, findNode(root, 2), findNode(root, 4));
      expect(result).toBe(findNode(root, 2));
    });
  });

  describe("Performance & Scale", () => {
    it("should find the LCA in a left-skewed BST of 10^5 nodes without recursion overflow", () => {
      // A descending chain n..1 where every node only has a left child: an
      // recursive solution would blow the call stack; an iterative walk down
      // the BST must cope.
      const n = 100000;
      const arr: (number | null)[] = [n];
      for (let v = n - 1; v >= 1; v--) arr.push(v, null);

      const root = arrayToTree(arr);
      const result = lowestCommonAncestor(root, findNode(root, 1), findNode(root, 2));
      expect(result!.val).toBe(2);
    });
  });
});
