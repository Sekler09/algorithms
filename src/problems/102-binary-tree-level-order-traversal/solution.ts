/*
 * @lc app=leetcode id=102 lang=typescript
 *
 * [102] Binary Tree Level Order Traversal
 */

// @lc code=start
import { TreeNode } from "@/types";

export function levelOrder(root: TreeNode | null): number[][] {
  const levels = root ? [[]] : ([] as number[][]);

  let currLevel = root ? [root] : [];
  let nextLevel = [];

  while (currLevel.length) {
    const node = currLevel.shift() as TreeNode;

    levels[levels.length - 1].push(node.val);

    if (node.left) nextLevel.push(node.left);
    if (node.right) nextLevel.push(node.right);

    if (currLevel.length === 0 && nextLevel.length) {
      currLevel = nextLevel;
      nextLevel = [];
      levels.push([]);
    }
  }

  return levels;
}
// @lc code=end
