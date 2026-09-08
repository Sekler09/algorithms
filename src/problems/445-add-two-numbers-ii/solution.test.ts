import { describe, it, expect } from "vitest";
import { addTwoNumbers } from "./solution";
import { createLinkedList, linkedListToArray } from "@/utils";

describe("445. Add Two Numbers II", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [7,2,4,3] + [5,6,4] -> [7,8,0,7]", () => {
      const l1 = createLinkedList([7, 2, 4, 3]);
      const l2 = createLinkedList([5, 6, 4]);
      const result = addTwoNumbers(l1, l2);
      expect(linkedListToArray(result)).toEqual([7, 8, 0, 7]);
    });

    it("should pass Example 2: [2,4,3] + [5,6,4] -> [8,0,7]", () => {
      const l1 = createLinkedList([2, 4, 3]);
      const l2 = createLinkedList([5, 6, 4]);
      const result = addTwoNumbers(l1, l2);
      expect(linkedListToArray(result)).toEqual([8, 0, 7]);
    });

    it("should pass Example 3: [0] + [0] -> [0]", () => {
      const l1 = createLinkedList([0]);
      const l2 = createLinkedList([0]);
      const result = addTwoNumbers(l1, l2);
      expect(linkedListToArray(result)).toEqual([0]);
    });
  });

  describe("Edge Cases & Carry Traps", () => {
    it("should handle carry propagating to create a new most significant digit", () => {
      // 99 + 1 = 100
      const l1 = createLinkedList([9, 9]);
      const l2 = createLinkedList([1]);
      const result = addTwoNumbers(l1, l2);
      expect(linkedListToArray(result)).toEqual([1, 0, 0]);
    });

    it("should handle different lengths where the shorter list causes a cascade of carries", () => {
      // 9 + 999 = 1008
      const l1 = createLinkedList([9]);
      const l2 = createLinkedList([9, 9, 9]);
      const result = addTwoNumbers(l1, l2);
      expect(linkedListToArray(result)).toEqual([1, 0, 0, 8]);
    });

    it("should handle additions with no carry at all", () => {
      const l1 = createLinkedList([1, 2, 3]);
      const l2 = createLinkedList([4, 5, 6]);
      const result = addTwoNumbers(l1, l2);
      expect(linkedListToArray(result)).toEqual([5, 7, 9]);
    });

    it("should handle one list being significantly longer than the other", () => {
      // 10000 + 1 = 10001
      const l1 = createLinkedList([1, 0, 0, 0, 0]);
      const l2 = createLinkedList([1]);
      const result = addTwoNumbers(l1, l2);
      expect(linkedListToArray(result)).toEqual([1, 0, 0, 0, 1]);
    });

    it("should handle trailing zeros in the input (valid as they are not leading)", () => {
      // 10 + 20 = 30
      const l1 = createLinkedList([1, 0]);
      const l2 = createLinkedList([2, 0]);
      const result = addTwoNumbers(l1, l2);
      expect(linkedListToArray(result)).toEqual([3, 0]);
    });

    it("should handle a single digit addition that results in a carry", () => {
      const l1 = createLinkedList([5]);
      const l2 = createLinkedList([5]);
      const result = addTwoNumbers(l1, l2);
      expect(linkedListToArray(result)).toEqual([1, 0]);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum constraint scale (100 nodes) with full carry propagation in O(N) time", () => {
      // 100 nines + 1 = 1 followed by 100 zeros
      // A naive string-conversion approach might fail here due to BigInt overhead or precision limits.
      const l1 = createLinkedList(new Array(100).fill(9));
      const l2 = createLinkedList([1]);
      const result = addTwoNumbers(l1, l2);

      const expected = [1, ...new Array(100).fill(0)];
      expect(linkedListToArray(result)).toEqual(expected);
    });

    it("should handle large scale inputs (10,000 nodes) without stack overflow or TLE", () => {
      // Tests that the solution uses an iterative approach (or safe recursion)
      // rather than an approach that might blow the call stack or run in O(N^2).
      const l1 = createLinkedList(new Array(10000).fill(1));
      const l2 = createLinkedList(new Array(10000).fill(2));
      const result = addTwoNumbers(l1, l2);

      const expected = new Array(10000).fill(3);
      expect(linkedListToArray(result)).toEqual(expected);
    });

    it("should handle large scale inputs with maximum carry cascade", () => {
      // 10,000 nodes of 9, plus a 1. Result should be 1 followed by 10,000 zeros.
      const l1 = createLinkedList(new Array(10000).fill(9));
      const l2 = createLinkedList([1]);
      const result = addTwoNumbers(l1, l2);

      const expected = [1, ...new Array(10000).fill(0)];
      expect(linkedListToArray(result)).toEqual(expected);
    });
  });
});
