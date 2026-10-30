import { describe, it, expect } from "vitest";
import { mergeTwoLists } from "./solution";
import { createLinkedList, linkedListToArray } from "@/utils";
import { ListNode } from "@/types";

describe("21. Merge Two Sorted Lists", () => {
  const testMerge = (arr1: number[], arr2: number[], expected: number[]) => {
    const merged = mergeTwoLists(createLinkedList(arr1), createLinkedList(arr2));
    expect(linkedListToArray(merged)).toEqual(expected);
  };

  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [1,2,4] + [1,3,4] -> [1,1,2,3,4,4]", () => {
      testMerge([1, 2, 4], [1, 3, 4], [1, 1, 2, 3, 4, 4]);
    });

    it("should pass Example 2: [] + [] -> []", () => {
      testMerge([], [], []);
    });

    it("should pass Example 3: [] + [0] -> [0]", () => {
      testMerge([], [0], [0]);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle one empty list on either side", () => {
      testMerge([], [1, 2, 3], [1, 2, 3]);
      testMerge([1, 2, 3], [], [1, 2, 3]);
    });

    it("should append the whole second list when ranges do not overlap", () => {
      testMerge([1, 2, 3], [4, 5, 6], [1, 2, 3, 4, 5, 6]);
    });

    it("should prepend the whole first list when it is entirely smaller", () => {
      testMerge([4, 5, 6], [1, 2, 3], [1, 2, 3, 4, 5, 6]);
    });

    it("should interleave single-node lists by value", () => {
      testMerge([5], [3], [3, 5]);
    });

    it("should preserve duplicates within and across both lists", () => {
      testMerge([1, 1, 2], [1, 3], [1, 1, 1, 2, 3]);
      testMerge([1, 3, 5], [1, 3, 5], [1, 1, 3, 3, 5, 5]);
    });

    it("should handle negative numbers and zeros", () => {
      testMerge([-3, 0, 2], [-1, 4], [-3, -1, 0, 2, 4]);
    });

    it("should terminate with a null final link and the correct node count", () => {
      // Structural check: exactly n1 + n2 nodes, ending in null. A stray
      // cycle (e.g. reusing list nodes without clearing next) would fail
      // this without hanging the test.
      const merged = mergeTwoLists(createLinkedList([1, 3]), createLinkedList([2, 4]));
      let node: ListNode | null = merged;
      for (let i = 0; i < 3; i++) node = node!.next;
      expect(node!.val).toBe(4);
      expect(node!.next).toBeNull();
    });
  });

  describe("Performance & Scale", () => {
    it("should merge two 5000-node lists (10^4 nodes total) in one pass", () => {
      // Evens + odds interleave perfectly — every step must advance lists
      // correctly across the whole run, not just at the boundaries.
      const evens = Array.from({ length: 5000 }, (_, i) => i * 2);
      const odds = Array.from({ length: 5000 }, (_, i) => i * 2 + 1);
      const merged = mergeTwoLists(createLinkedList(evens), createLinkedList(odds));
      expect(linkedListToArray(merged)).toEqual(Array.from({ length: 10000 }, (_, i) => i));
    });
  });
});
