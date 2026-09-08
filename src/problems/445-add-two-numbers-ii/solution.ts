/*
 * @lc app=leetcode id=445 lang=typescript
 *
 * [445] Add Two Numbers II
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

export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let head1 = null;
  while (l1) {
    head1 = new ListNode(l1.val, head1);
    l1 = l1.next;
  }
  let head2 = null;
  while (l2) {
    head2 = new ListNode(l2.val, head2);
    l2 = l2.next;
  }

  let headSum = null;
  let plusOne = 0;
  while (head1 || head2 || plusOne) {
    let sum = (head1?.val || 0) + (head2?.val || 0) + plusOne;
    plusOne = 0;
    if (sum >= 10) {
      plusOne = 1;
      sum = sum % 10;
    }
    headSum = new ListNode(sum, headSum);
    head1 = head1?.next;
    head2 = head2?.next;
  }

  return headSum;
}
// @lc code=end
