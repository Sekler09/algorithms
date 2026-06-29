/*
 * @lc app=leetcode id=2 lang=typescript
 *
 * [2] Add Two Numbers
 */

import { ListNode } from "@/types";

// @lc code=start

export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let rem = 0;
  let resHead = null;
  let currentRes = null;

  let head1 = l1;
  let head2 = l2;

  while (head1 || head2) {
    let num = (head1?.val ?? 0) + (head2?.val ?? 0) + rem;
    if (num >= 10) rem = 1;
    else rem = 0;

    num %= 10;

    if (!currentRes) {
      resHead = new ListNode(num);
      currentRes = resHead;
    } else {
      currentRes.next = new ListNode(num);
      currentRes = currentRes.next;
    }

    head1 = head1?.next ?? null;
    head2 = head2?.next ?? null;
  }

  if (rem) currentRes!.next = new ListNode(rem);

  return resHead;
}
// @lc code=end
