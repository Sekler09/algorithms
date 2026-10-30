/*
 * @lc app=leetcode id=206 lang=typescript
 *
 * [206] Reverse Linked List
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

export function reverseList(head: ListNode | null): ListNode | null {
  let curr = head;
  let prev = null;
  let next = head?.next || null;

  while (curr) {
    curr.next = prev;
    prev = curr;
    curr = next;
    next = next?.next || null;
  }

  return prev;
}
// @lc code=end
