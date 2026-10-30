/*
 * @lc app=leetcode id=21 lang=typescript
 *
 * [21] Merge Two Sorted Lists
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

export function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  let list3 = null;
  let curr = null;

  while (list1 || list2) {
    let l1 = list1?.val ?? +Infinity;
    let l2 = list2?.val ?? +Infinity;
    if (l1 <= l2) {
      if (!list3) {
        list3 = list1;
        curr = list3;
      } else {
        curr.next = list1;
        curr = curr!.next;
      }
      list1 = list1!.next;
    } else {
      if (!list3) {
        list3 = list2;
        curr = list3;
      } else {
        curr.next = list2;
        curr = curr!.next;
      }
      list2 = list2!.next;
    }
  }

  return list3;
}
// @lc code=end
