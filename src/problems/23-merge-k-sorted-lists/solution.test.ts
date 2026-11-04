import { describe, it, expect } from "vitest";
import { mergeKLists } from "./solution";
import { createLinkedList, linkedListToArray } from "@/utils";
import { ListNode } from "@/types";

describe("23. Merge k Sorted Lists", () => {
  const testMerge = (arrays: number[][], expected: number[]) => {
    const merged = mergeKLists(arrays.map(createLinkedList));
    expect(linkedListToArray(merged)).toEqual(expected);
  };

  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [[1,4,5],[1,3,4],[2,6]] -> [1,1,2,3,4,4,5,6]", () => {
      testMerge([[1, 4, 5], [1, 3, 4], [2, 6]], [1, 1, 2, 3, 4, 4, 5, 6]);
    });

    it("should pass Example 2: [] -> []", () => {
      testMerge([], []);
    });

    it("should pass Example 3: [[]] -> []", () => {
      testMerge([[]], []);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle a single list unchanged", () => {
      testMerge([[1, 2, 3]], [1, 2, 3]);
    });

    it("should handle two lists", () => {
      testMerge([[1, 3], [2, 4]], [1, 2, 3, 4]);
    });

    it("should ignore empty lists mixed with non-empty ones", () => {
      testMerge([[], [1], [], [0, 2], []], [0, 1, 2]);
    });

    it("should handle all lists empty", () => {
      testMerge([[], [], []], []);
    });

    it("should handle single-node lists given in reverse order", () => {
      // Every step must compare across all k heads — no list can be drained greedily.
      testMerge([[3], [2], [1]], [1, 2, 3]);
    });

    it("should preserve duplicates within and across lists", () => {
      testMerge([[1, 1, 1], [1], [1, 1]], [1, 1, 1, 1, 1, 1]);
    });

    it("should handle negative numbers and zeros", () => {
      testMerge([[-10, -5, 0], [-1], [-7, 3]], [-10, -7, -5, -1, 0, 3]);
    });

    it("should append lists whose ranges do not overlap", () => {
      testMerge([[1, 2, 3], [10, 20], [100]], [1, 2, 3, 10, 20, 100]);
    });

    it("should prepend lists that are entirely smaller", () => {
      testMerge([[100], [1, 2, 3]], [1, 2, 3, 100]);
    });

    it("should fully interleave two equal-length lists", () => {
      testMerge([[1, 3, 5, 7], [2, 4, 6, 8]], [1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("should terminate with the correct node count and a null final link", () => {
      // Structural check: exactly n1+n2+n3 nodes, ending in null. A stray
      // cycle (e.g. reusing list nodes without clearing next) would fail
      // this without hanging the test.
      const merged = mergeKLists([
        createLinkedList([1, 4]),
        createLinkedList([2]),
        createLinkedList([3, 5]),
      ]);
      let node: ListNode | null = merged;
      // Walks over [1,2,3,4,5]: after 4 steps we must sit on the last node.
      for (let i = 0; i < 4; i++) node = node!.next;
      expect(node!.val).toBe(5);
      expect(node!.next).toBeNull();
    });
  });

  describe("Performance & Scale", () => {
    it("should merge 100 lists of 100 nodes (10^4 nodes total) fully interleaved", () => {
      // List i holds i, i+100, i+200, ... so the merged result must pick the
      // global minimum across ALL lists on every step — an approach that
      // drains lists in the wrong order produces a non-monotonic result.
      const k = 100;
      const n = 100;
      const lists = Array.from({ length: k }, (_, i) =>
        Array.from({ length: n }, (_, j) => i + j * k),
      );
      const merged = mergeKLists(lists.map(createLinkedList));
      expect(linkedListToArray(merged)).toEqual(
        Array.from({ length: k * n }, (_, i) => i),
      );
    });

    it("should merge the constraint ceiling of k = 10^4 single-node lists", () => {
      // k hits its upper bound (10^4). An O(N·k) linear-scan merge costs
      // ~10^8 comparisons and crawls; a heap or divide-and-conquer merge
      // finishes in a fraction of a second.
      const k = 10000;
      const lists = Array.from({ length: k }, (_, i) => [i]);
      const merged = mergeKLists(lists.map(createLinkedList));
      expect(linkedListToArray(merged)).toEqual(
        Array.from({ length: k }, (_, i) => i),
      );
    });
  });
});
