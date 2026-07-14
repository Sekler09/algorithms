import { describe, it, expect } from "vitest";
import { sortByBits } from "./solution";

describe("1356. Sort Integers by The Number of 1 Bits", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [0,1,2,3,4,5,6,7,8]", () => {
      // 0:0, 1:1, 2:1, 3:2, 4:1, 5:2, 6:2, 7:3, 8:1
      // Order: 0 (0 bits)
      // 1, 2, 4, 8 (1 bit, sorted by value)
      // 3, 5, 6 (2 bits, sorted by value)
      // 7 (3 bits)
      expect(sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8])).toEqual([
        0, 1, 2, 4, 8, 3, 5, 6, 7,
      ]);
    });

    it("should pass Example 2: powers of 2", () => {
      // All have exactly 1 bit. Must be sorted by value ascending.
      expect(sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1])).toEqual(
        [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
      );
    });
  });

  describe("Base Cases & Zero", () => {
    it("should handle an array with only zero", () => {
      // 0 has 0 bits.
      expect(sortByBits([0])).toEqual([0]);
    });

    it("should place zero at the very beginning", () => {
      // 0 (0 bits), 3 (2 bits), 5 (2 bits)
      expect(sortByBits([5, 0, 3])).toEqual([0, 3, 5]);
    });
  });

  describe('The "Tie-Breaker" Trap (Same bits, different values)', () => {
    it("should sort by value ascending when bit counts are identical", () => {
      // 3 (011) = 2 bits
      // 5 (101) = 2 bits
      // 6 (110) = 2 bits
      // All have 2 bits. Must be sorted by value: 3, 5, 6.
      expect(sortByBits([6, 5, 3])).toEqual([3, 5, 6]);
    });

    it("should correctly interleave groups with tie-breakers", () => {
      // 10 (1010) = 2 bits
      // 12 (1100) = 2 bits
      // 11 (1011) = 3 bits
      // 13 (1101) = 3 bits
      // Expected: 10, 12, 11, 13
      expect(sortByBits([13, 11, 12, 10])).toEqual([10, 12, 11, 13]);
    });

    it("should handle a mix of 1-bit and 2-bit numbers", () => {
      // 1 (1 bit), 2 (1 bit), 4 (1 bit)
      // 3 (2 bits), 5 (2 bits), 6 (2 bits)
      expect(sortByBits([6, 3, 2, 5, 1, 4])).toEqual([1, 2, 4, 3, 5, 6]);
    });
  });

  describe("Duplicate Values", () => {
    it("should handle arrays with duplicate numbers", () => {
      // 7 has 3 bits. Three 7s.
      expect(sortByBits([7, 7, 7])).toEqual([7, 7, 7]);
    });

    it("should handle duplicates mixed with other numbers", () => {
      // 1 (1 bit), 4 (1 bit), 3 (2 bits), 3 (2 bits)
      expect(sortByBits([3, 1, 3, 4])).toEqual([1, 4, 3, 3]);
    });
  });

  describe("Large Values & Constraints", () => {
    it("should handle the maximum constraint value (10000)", () => {
      // 10000 in binary is 10011100010000 (5 bits)
      // 9999 in binary is 10011100001111 (8 bits)
      expect(sortByBits([10000, 9999])).toEqual([10000, 9999]);
    });

    it("should handle an array of maximum length with max values", () => {
      // 1000 elements of 10000.
      const arr = new Array(1000).fill(10000);
      const result = sortByBits(arr);
      expect(result.length).toBe(1000);
      expect(result[0]).toBe(10000);
      expect(result[999]).toBe(10000);
    });
  });

  describe("Already Sorted / Reverse Sorted", () => {
    it("should maintain order if already perfectly sorted", () => {
      expect(sortByBits([0, 1, 2, 4, 8])).toEqual([0, 1, 2, 4, 8]);
    });

    it("should correctly reverse sort if given in reverse", () => {
      // 8(1), 4(1), 2(1), 1(1), 0(0)
      expect(sortByBits([8, 4, 2, 1, 0])).toEqual([0, 1, 2, 4, 8]);
    });
  });
});
