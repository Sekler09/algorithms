import { ListNode } from "@/types";

export const createLinkedList = (arr: number[]): ListNode | null => {
  if (!arr.length) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  arr.forEach((val, i) => {
    if (!i) return;
    current.next = new ListNode(val);
    current = current.next;
  });

  return head;
};

export const linkedListToArray = (list: ListNode | null): number[] => {
  if (!list) return [];

  let curr: ListNode | null = list;

  const res = [];

  while (curr) {
    res.push(curr.val);
    curr = curr.next;
  }

  return res;
};
