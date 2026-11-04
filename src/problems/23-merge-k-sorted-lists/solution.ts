/*
 * @lc app=leetcode id=23 lang=typescript
 *
 * [23] Merge k Sorted Lists
 */

import { ListNode } from "@/types";

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  let result = null;
  let curr = new ListNode();

  const queue = lists.filter((l) => !!l).sort((a, b) => b.val - a.val);

  while (queue.length) {
    let min = queue.pop() as ListNode;

    if (!result) {
      result = min;
    }
    curr.next = min;
    curr = curr.next;

    if (min.next) {
      min = min.next;

      let i = 0;
      while (i < queue.length && min.val < queue[i].val) {
        i++;
      }
      queue.splice(i, 0, min);
    }
  }

  return result;
}
// @lc code=end
