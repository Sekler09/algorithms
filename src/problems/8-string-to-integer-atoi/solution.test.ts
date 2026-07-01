import { describe, it, expect } from "vitest";
import { myAtoi } from "./solution";

describe("8. String to Integer (atoi)", () => {
  describe("LeetCode Official Examples", () => {
    it('should pass Example 1: "42" -> 42', () => {
      expect(myAtoi("42")).toBe(42);
    });

    it('should pass Example 2: "   -42" -> -42', () => {
      expect(myAtoi("   -42")).toBe(-42);
    });

    it('should pass Example 3: "4193 with words" -> 4193', () => {
      expect(myAtoi("4193 with words")).toBe(4193);
    });
  });

  describe("Whitespace Handling", () => {
    it("should ignore leading spaces", () => {
      expect(myAtoi("   123")).toBe(123);
    });

    it("should ignore multiple leading spaces", () => {
      expect(myAtoi("     456")).toBe(456);
    });

    it("should return 0 for only whitespace", () => {
      expect(myAtoi("   ")).toBe(0);
    });

    it("should return 0 for empty string", () => {
      expect(myAtoi("")).toBe(0);
    });

    it("should stop reading at space in the middle", () => {
      expect(myAtoi("123 456")).toBe(123);
    });
  });

  describe("Sign Handling", () => {
    it("should handle positive sign", () => {
      expect(myAtoi("+42")).toBe(42);
    });

    it("should handle negative sign", () => {
      expect(myAtoi("-42")).toBe(-42);
    });

    it("should handle sign with leading spaces", () => {
      expect(myAtoi("   +42")).toBe(42);
      expect(myAtoi("   -42")).toBe(-42);
    });

    it("should return 0 when only sign is present", () => {
      expect(myAtoi("+")).toBe(0);
      expect(myAtoi("-")).toBe(0);
    });

    it("should return 0 when only sign with spaces is present", () => {
      expect(myAtoi("   +   ")).toBe(0);
      expect(myAtoi("   -   ")).toBe(0);
    });

    it("should stop at second sign character", () => {
      expect(myAtoi("+-12")).toBe(0);
      expect(myAtoi("-+12")).toBe(0);
      expect(myAtoi("--12")).toBe(0);
    });

    it("should stop at sign after digits", () => {
      expect(myAtoi("12+34")).toBe(12);
      expect(myAtoi("12-34")).toBe(12);
    });
  });

  describe("Non-Digit Characters", () => {
    it("should return 0 when first non-whitespace character is not a digit or sign", () => {
      expect(myAtoi("words with 123")).toBe(0);
      expect(myAtoi("abc123")).toBe(0);
    });

    it("should stop reading at first non-digit character", () => {
      expect(myAtoi("123abc")).toBe(123);
      expect(myAtoi("123.45")).toBe(123);
      expect(myAtoi("123-45")).toBe(123);
    });

    it("should handle letters immediately after sign", () => {
      expect(myAtoi("+abc")).toBe(0);
      expect(myAtoi("-abc")).toBe(0);
    });
  });

  describe("Leading Zeros", () => {
    it("should handle leading zeros", () => {
      expect(myAtoi("000123")).toBe(123);
    });

    it("should handle leading zeros with sign", () => {
      expect(myAtoi("+000123")).toBe(123);
      expect(myAtoi("-000123")).toBe(-123);
    });

    it("should return 0 for all zeros", () => {
      expect(myAtoi("0000")).toBe(0);
      expect(myAtoi("-0000")).toBe(0);
    });

    it("should handle single zero", () => {
      expect(myAtoi("0")).toBe(0);
    });
  });

  describe("Overflow and Underflow Clamping", () => {
    it("should clamp to INT_MAX when number exceeds 2^31 - 1", () => {
      // 2^31 - 1 = 2147483647
      expect(myAtoi("2147483648")).toBe(2147483647);
      expect(myAtoi("99999999999999999999")).toBe(2147483647);
    });

    it("should clamp to INT_MIN when negative number is less than -2^31", () => {
      // -2^31 = -2147483648
      expect(myAtoi("-2147483649")).toBe(-2147483648);
      expect(myAtoi("-99999999999999999999")).toBe(-2147483648);
    });

    it("should handle numbers just below overflow threshold", () => {
      expect(myAtoi("2147483647")).toBe(2147483647);
      expect(myAtoi("-2147483648")).toBe(-2147483648);
    });

    it("should clamp large positive numbers with leading zeros", () => {
      expect(
        myAtoi(
          "0000000000000000000000000000000000000000000000000012345678901234567890",
        ),
      ).toBe(2147483647);
    });

    it("should clamp large negative numbers with leading zeros", () => {
      expect(
        myAtoi(
          "-0000000000000000000000000000000000000000000000000012345678901234567890",
        ),
      ).toBe(-2147483648);
    });
  });

  describe("Complex Edge Cases", () => {
    it("should handle number at the very start", () => {
      expect(myAtoi("123")).toBe(123);
    });

    it("should handle single digit", () => {
      expect(myAtoi("5")).toBe(5);
      expect(myAtoi("-5")).toBe(-5);
      expect(myAtoi("+5")).toBe(5);
    });

    it("should handle two-digit numbers", () => {
      expect(myAtoi("12")).toBe(12);
      expect(myAtoi("-12")).toBe(-12);
    });

    it("should handle number with trailing spaces", () => {
      expect(myAtoi("123   ")).toBe(123);
    });

    it("should handle number with special characters after", () => {
      expect(myAtoi("123!@#")).toBe(123);
    });

    it("should handle very long string of digits", () => {
      expect(myAtoi("123456789012345678901234567890")).toBe(2147483647);
    });

    it("should handle negative very long string of digits", () => {
      expect(myAtoi("-123456789012345678901234567890")).toBe(-2147483648);
    });
  });
});
