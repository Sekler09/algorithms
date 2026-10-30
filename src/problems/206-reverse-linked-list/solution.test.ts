import { describe, it, expect } from "vitest";
import { reverseList } from "./solution";
import { createLinkedList, linkedListToArray } from "@/utils";
import { ListNode } from "@/types";

describe("206. Reverse Linked List", () => {
  const testReverse = (arr: number[], expected: number[]) => {
    const result = linkedListToArray(reverseList(createLinkedList(arr)));
    expect(result).toEqual(expected);
  };

  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [1,2,3,4,5] -> [5,4,3,2,1]", () => {
      testReverse([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]);
    });

    it("should pass Example 2: [1,2] -> [2,1]", () => {
      testReverse([1, 2], [2, 1]);
    });

    it("should pass Example 3: [] -> []", () => {
      testReverse([], []);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle a single node list (unchanged)", () => {
      testReverse([42], [42]);
    });

    it("should handle a two-node list (the minimal reversal)", () => {
      testReverse([1, 2], [2, 1]);
    });

    it("should handle lists with all duplicate values", () => {
      testReverse([7, 7, 7], [7, 7, 7]);
    });

    it("should handle negative and zero values", () => {
      testReverse([0, -1, 2, -3], [-3, 2, -1, 0]);
    });

    it("should terminate with a null final link, not a cycle", () => {
      // Structural check: the returned head is the old tail, and after n
      // nodes the chain ends in null (a stray cycle would fail this without
      // hanging the test).
      const head = reverseList(createLinkedList([1, 2, 3]));
      expect(head!.val).toBe(3);
      let node: ListNode | null = head;
      for (let i = 0; i < 2; i++) node = node!.next;
      expect(node!.val).toBe(1);
      expect(node!.next).toBeNull();
    });
  });

  describe("Performance & Scale", () => {
    it("should reverse 10^4 nodes iteratively without recursion overflow", () => {
      // A recursive solution would blow the call stack at this size.
      const arr = Array.from({ length: 10000 }, (_, i) => i);
      const result = reverseList(createLinkedList(arr));
      expect(result!.val).toBe(9999);
      expect(linkedListToArray(result)).toEqual([...arr].reverse());
    });
  });
});
