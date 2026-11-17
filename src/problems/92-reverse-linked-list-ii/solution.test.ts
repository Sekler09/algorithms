import { describe, it, expect } from "vitest";
import { reverseBetween } from "./solution";
import { createLinkedList, linkedListToArray } from "@/utils";
import { ListNode } from "@/types";

describe("92. Reverse Linked List II", () => {
  const testReverse = (arr: number[], left: number, right: number, expected: number[]) => {
    const result = linkedListToArray(reverseBetween(createLinkedList(arr), left, right));
    expect(result).toEqual(expected);
  };

  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [1,2,3,4,5], left=2, right=4 -> [1,4,3,2,5]", () => {
      testReverse([1, 2, 3, 4, 5], 2, 4, [1, 4, 3, 2, 5]);
    });

    it("should pass Example 2: [5], left=1, right=1 -> [5]", () => {
      testReverse([5], 1, 1, [5]);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should reverse the whole list when left=1 and right=n", () => {
      testReverse([1, 2, 3, 4, 5], 1, 5, [5, 4, 3, 2, 1]);
    });

    it("should handle a two-node list reversed in full", () => {
      testReverse([1, 2], 1, 2, [2, 1]);
    });

    it("should leave the list unchanged when left === right", () => {
      testReverse([1, 2, 3], 2, 2, [1, 2, 3]);
    });

    it("should handle a reversal starting at the head (left=1) with head replacement", () => {
      testReverse([1, 2, 3], 1, 2, [2, 1, 3]);
    });

    it("should handle a reversal ending at the tail (right=n)", () => {
      testReverse([1, 2, 3, 4], 3, 4, [1, 2, 4, 3]);
    });

    it("should handle the largest single reversal window on a minimal list", () => {
      testReverse([1, 2], 1, 1, [1, 2]);
    });

    it("should handle negative and zero values", () => {
      testReverse([0, -1, 2, -3, 4], 2, 4, [0, -3, 2, -1, 4]);
    });

    it("should handle lists with all duplicate values", () => {
      testReverse([7, 7, 7], 1, 3, [7, 7, 7]);
    });

    it("should terminate with a null final link, not a cycle", () => {
      // Structural check: after reversing [2..4] the old tail (5) must remain
      // reachable as the last node; a stray cycle would fail this without
      // hanging the test.
      const head = reverseBetween(createLinkedList([1, 2, 3, 4, 5]), 2, 4);
      expect(head!.val).toBe(1);
      let node: ListNode | null = head;
      for (let i = 0; i < 4; i++) node = node!.next;
      expect(node!.val).toBe(5);
      expect(node!.next).toBeNull();
    });

    it("should keep the pre-left segment pointing into the reversed head", () => {
      // For [1,2,3,4,5] left=2 right=4: node 1 must link to the old node 4,
      // which is now the head of the reversed middle.
      const head = reverseBetween(createLinkedList([1, 2, 3, 4, 5]), 2, 4);
      expect(head!.next!.val).toBe(4);
    });
  });

  describe("Performance & Scale", () => {
    it("should reverse a 10^4-node segment without recursion overflow", () => {
      // A recursive solution would blow the call stack at this size.
      const arr = Array.from({ length: 10000 }, (_, i) => i);
      const result = reverseBetween(createLinkedList(arr), 1, 10000);
      expect(result!.val).toBe(9999);
      expect(linkedListToArray(result)).toEqual([...arr].reverse());
    });
  });
});
