/*
 * @lc app=leetcode id=104 lang=typescript
 *
 * [104] Maximum Depth of Binary Tree
 */

import { TreeNode } from "@/types";

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

export function maxDepth(root: TreeNode | null): number {
  const step = (node: TreeNode | null, level: number): number =>
    node
      ? Math.max(step(node.left, level + 1), step(node.right, level + 1))
      : level;

  return step(root, 0);
}
// @lc code=end
