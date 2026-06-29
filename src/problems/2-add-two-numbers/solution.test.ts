import { describe, it, expect } from "vitest";
import { addTwoNumbers } from "./solution";
import { createLinkedList, linkedListToArray } from "@/utils";

describe("2. Add Two Numbers", () => {
  // Helper function to make the tests cleaner
  const testAddition = (arr1: number[], arr2: number[], expected: number[]) => {
    const l1 = createLinkedList(arr1);
    const l2 = createLinkedList(arr2);
    const resultNode = addTwoNumbers(l1, l2);
    expect(linkedListToArray(resultNode)).toEqual(expected);
  };

  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: 342 + 465 = 807", () => {
      testAddition([2, 4, 3], [5, 6, 4], [7, 0, 8]);
    });

    it("should pass Example 2: 0 + 0 = 0", () => {
      testAddition([0], [0], [0]);
    });

    it("should pass Example 3: 9999999 + 9999 = 10009998", () => {
      testAddition(
        [9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9],
        [8, 9, 9, 9, 0, 0, 0, 1],
      );
    });
  });

  describe("Edge Cases & Carry Overs", () => {
    it("should handle carry that creates a new node at the end (99 + 1 = 100)", () => {
      testAddition([9, 9], [1], [0, 0, 1]);
    });

    it("should handle lists of very different lengths", () => {
      // 999 + 1 = 1000
      testAddition([9, 9, 9], [1], [0, 0, 0, 1]);
    });

    it("should handle zeros in the middle of the numbers", () => {
      // 101 + 102 = 203
      testAddition([1, 0, 1], [2, 0, 1], [3, 0, 2]);
    });

    it("should handle a single digit addition with no carry", () => {
      testAddition([5], [4], [9]);
    });

    it("should handle a single digit addition with carry", () => {
      testAddition([8], [5], [3, 1]); // 8 + 5 = 13
    });
  });
});
