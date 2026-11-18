/*
 * @lc app=leetcode id=235 lang=typescript
 *
 * [235] Lowest Common Ancestor of a Binary Search Tree
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

export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (!root || p === null || q === null) return null;

  let curr = root;

  const max = Math.max(p.val, q.val);
  const min = Math.min(p.val, q.val);

  while (!(min <= curr.val && max >= curr.val)) {
    if (max < curr.val) curr = curr.left!;
    else curr = curr.right!;
  }

  return curr;
}
// @lc code=end
