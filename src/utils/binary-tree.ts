import { TreeNode } from "@/types";

export const arrayToTree = (arr: (number | null)[]): TreeNode | null => {
  if (!arr.length || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length && i < arr.length) {
    const node = queue.shift()!;

    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]!);
      queue.push(node.left);
    }
    i++;

    if (arr[i] !== null && arr[i] !== undefined) {
      node.right = new TreeNode(arr[i]!);
      queue.push(node.right);
    }
    i++;
  }

  return root;
};
