import { describe, it, expect } from "vitest";
import { isPalindrome } from "./solution";

describe("9. Palindrome Number", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: 121 -> true", () => {
      expect(isPalindrome(121)).toBe(true);
    });

    it("should pass Example 2: -121 -> false", () => {
      // Reads "121-" from right to left
      expect(isPalindrome(-121)).toBe(false);
    });

    it("should pass Example 3: 10 -> false", () => {
      // Reads "01" from right to left
      expect(isPalindrome(10)).toBe(false);
    });
  });

  describe("Negative Numbers (Always False)", () => {
    it("should return false for any negative number", () => {
      expect(isPalindrome(-1)).toBe(false);
      expect(isPalindrome(-11)).toBe(false);
      expect(isPalindrome(-101)).toBe(false);
      expect(isPalindrome(-2147483648)).toBe(false);
    });
  });

  describe("Trailing Zeros & Multiples of 10", () => {
    it("should return false for numbers ending in 0 (except 0 itself)", () => {
      // A number cannot start with 0 unless it IS 0.
      // Therefore, reversed, it will never match the original.
      expect(isPalindrome(10)).toBe(false);
      expect(isPalindrome(100)).toBe(false);
      expect(isPalindrome(120)).toBe(false);
      expect(isPalindrome(1000)).toBe(false);
    });

    it("should return true for palindromes with zeros in the middle", () => {
      //   expect(isPalindrome(101)).toBe(true);
      expect(isPalindrome(1001)).toBe(true);
      //   expect(isPalindrome(10201)).toBe(true);
    });
  });

  describe("Single Digits & Zero", () => {
    it("should return true for zero", () => {
      expect(isPalindrome(0)).toBe(true);
    });

    it("should return true for all single-digit positive numbers", () => {
      for (let i = 1; i <= 9; i++) {
        expect(isPalindrome(i)).toBe(true);
      }
    });
  });

  describe("Even vs Odd Length Palindromes", () => {
    it("should handle even-length palindromes", () => {
      expect(isPalindrome(11)).toBe(true);
      expect(isPalindrome(1221)).toBe(true);
      expect(isPalindrome(123321)).toBe(true);
    });

    it("should handle odd-length palindromes", () => {
      expect(isPalindrome(121)).toBe(true);
      expect(isPalindrome(12321)).toBe(true);
      expect(isPalindrome(1234321)).toBe(true);
    });
  });

  describe("Large Numbers & Non-Palindromes", () => {
    it("should handle large palindromes near 32-bit bounds", () => {
      expect(isPalindrome(2147447412)).toBe(true);
    });

    it("should return false for non-palindromes", () => {
      expect(isPalindrome(12)).toBe(false);
      expect(isPalindrome(123)).toBe(false);
      expect(isPalindrome(1234)).toBe(false);
      expect(isPalindrome(2147483647)).toBe(false);
    });
  });
});
