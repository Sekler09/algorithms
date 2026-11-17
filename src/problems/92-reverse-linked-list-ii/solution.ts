/*
 * @lc app=leetcode id=92 lang=typescript
 *
 * [92] Reverse Linked List II
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

export function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number,
): ListNode | null {
  let leftSide = null;
  let leftSideEnd = null;
  let count = 1;

  while (count < left) {
    if (!leftSide) leftSide = head;
    leftSideEnd = head;
    head = head!.next;
    count++;
  }

  let start = head;
  let end = head;

  count--;

  while (count < right) {
    end = head;
    head = head!.next;
    count++;
  }

  end!.next = null;

  const reversedTail = reverseListWithTail(start, head);

  if (left > 1) leftSideEnd!.next = reversedTail;

  return leftSide || reversedTail;
}

function reverseListWithTail(
  head: ListNode | null,
  tail: ListNode | null,
): ListNode | null {
  let curr = head;
  let prev = tail;
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
