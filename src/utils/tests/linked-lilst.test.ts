import { describe, it, expect } from "vitest";
import { createLinkedList, linkedListToArray } from "../index";
import { ListNode } from "@/types";

describe("createLinkedList", () => {
  it("should return null for an empty array", () => {
    expect(createLinkedList([])).toBeNull();
  });

  it("should create a single node for a one-element array", () => {
    const head = createLinkedList([42]);
    expect(head).not.toBeNull();
    expect(head!.val).toBe(42);
    expect(head!.next).toBeNull();
  });

  it("should create a correct linked structure for multiple elements", () => {
    const head = createLinkedList([1, 2, 3]);
    expect(head!.val).toBe(1);
    expect(head!.next!.val).toBe(2);
    expect(head!.next!.next!.val).toBe(3);
    expect(head!.next!.next!.next).toBeNull();
  });

  it("should handle negative numbers", () => {
    const head = createLinkedList([-5, -10]);
    expect(head!.val).toBe(-5);
    expect(head!.next!.val).toBe(-10);
  });
});

describe("linkedListToArray", () => {
  it("should return an empty array for a null head", () => {
    expect(linkedListToArray(null)).toEqual([]);
  });

  it("should return a single-element array for a single node", () => {
    const head = new ListNode(99);
    expect(linkedListToArray(head)).toEqual([99]);
  });

  it("should return the correct array for a multi-node list", () => {
    const head = createLinkedList([10, 20, 30]);
    expect(linkedListToArray(head)).toEqual([10, 20, 30]);
  });

  it("should handle lists with duplicate values", () => {
    const head = createLinkedList([5, 5, 5]);
    expect(linkedListToArray(head)).toEqual([5, 5, 5]);
  });
});

// Integration Tests: Ensures the two functions work perfectly together
describe("Round-trip conversion", () => {
  it("should perfectly round-trip an array through the linked list", () => {
    const original = [1, 2, 3, 4, 5];
    const list = createLinkedList(original);
    const result = linkedListToArray(list);
    expect(result).toEqual(original);
  });

  it("should perfectly round-trip an empty array", () => {
    const original: number[] = [];
    const list = createLinkedList(original);
    const result = linkedListToArray(list);
    expect(result).toEqual(original);
  });

  it("should handle arrays with negative numbers and zeros", () => {
    const original = [0, -1, 0, -2, 0];
    const list = createLinkedList(original);
    const result = linkedListToArray(list);
    expect(result).toEqual(original);
  });
});
