import { describe, it, expect } from "vitest";
import { reverse } from "./solution";

describe("7. Reverse Integer", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: 123 -> 321", () => {
      expect(reverse(123)).toBe(321);
    });

    it("should pass Example 2: -123 -> -321", () => {
      expect(reverse(-123)).toBe(-321);
    });

    it("should pass Example 3: 120 -> 21", () => {
      // Trailing zeros are dropped when reversed
      expect(reverse(120)).toBe(21);
    });
  });

  describe("Edge Cases & Overflow Traps", () => {
    it("should handle zero", () => {
      expect(reverse(0)).toBe(0);
    });

    it("should handle single digit positive numbers", () => {
      expect(reverse(5)).toBe(5);
      expect(reverse(9)).toBe(9);
    });

    it("should handle single digit negative numbers", () => {
      expect(reverse(-5)).toBe(-5);
      expect(reverse(-9)).toBe(-9);
    });

    it("should handle numbers with multiple trailing zeros", () => {
      expect(reverse(1000)).toBe(1);
      expect(reverse(100)).toBe(1);
      expect(reverse(-1000)).toBe(-1);
    });

    it("should handle numbers with zeros in the middle", () => {
      expect(reverse(10203)).toBe(30201);
      expect(reverse(-1002)).toBe(-2001);
    });

    it("should return 0 when reversed positive number overflows 32-bit integer", () => {
      // 2^31 - 1 = 2147483647
      // Reversed: 7463847412 which is > 2147483647
      expect(reverse(2147483647)).toBe(0);
    });

    it("should return 0 when reversed negative number underflows 32-bit integer", () => {
      // -2^31 = -2147483648
      // Reversed: -8463847412 which is < -2147483648
      expect(reverse(-2147483648)).toBe(0);
    });

    it("should return 0 for numbers that overflow just slightly", () => {
      // 1534236469 reversed is 9646324351, which overflows
      expect(reverse(1534236469)).toBe(0);
    });

    it("should handle numbers close to but not exceeding overflow", () => {
      // This should work fine - reversed is within bounds
      expect(reverse(1147483641)).toBe(1463847411);
    });

    it("should handle two-digit numbers", () => {
      expect(reverse(12)).toBe(21);
      expect(reverse(-12)).toBe(-21);
      expect(reverse(10)).toBe(1);
    });

    it("should handle numbers with all same digits", () => {
      expect(reverse(111)).toBe(111);
      expect(reverse(2222)).toBe(2222);
      expect(reverse(-999)).toBe(-999);
    });

    it("should handle the minimum safe reversed value", () => {
      // A number that reverses to exactly 2147483647 is hard to construct
      // because 7463847412 is not a valid 32-bit int to begin with
      // So we test a value that's safely within range
      expect(reverse(123456789)).toBe(987654321);
    });

    it("should handle the maximum single digit", () => {
      expect(reverse(9)).toBe(9);
    });

    it("should handle negative numbers with trailing zeros", () => {
      expect(reverse(-120)).toBe(-21);
      expect(reverse(-100)).toBe(-1);
    });
  });
});
