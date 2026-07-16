import { describe, it, expect } from "vitest";
import { maxProduct } from "./solution";

describe("1960. Maximum Product of the Length of Two Palindromic Substrings", () => {
  describe("LeetCode Official Examples", () => {
    it('should pass Example 1: "ababbb"', () => {
      // "aba" (0-2, len 3) and "bbb" (3-5, len 3) -> 3 * 3 = 9
      // Note: "ababa" (0-4, len 5) would leave only "b" (len 1) -> 5 * 1 = 5 (worse)
      expect(maxProduct("ababbb")).toBe(9);
    });

    it('should pass Example 2: "zaabax"', () => {
      // "z" (0, len 1) and "aba" (2-4, len 3) -> 1 * 3 = 3
      // Or "aba" (2-4, len 3) and "x" (5, len 1) -> 3 * 1 = 3
      expect(maxProduct("zaabax")).toBe(3);
    });
  });

  describe("Base Cases & Minimum Length", () => {
    it("should handle minimum length string (3 chars)", () => {
      // "abc" -> best is "a" * "b" or similar = 1
      expect(maxProduct("abc")).toBe(1);
    });

    it("should handle 3-char palindrome", () => {
      // "aba" -> "a" (0) * "a" (2) = 1, or "a" * "ba"?
      // Best: "a" (len 1) * "a" (len 1) = 1, but "aba" can't be split into two palindromes > 1
      // Actually: "a" (0) and "a" (2) -> 1*1 = 1. Or "a" (0) and "ba" - "ba" isn't palindrome.
      // Wait: "a" * "a" = 1. Or is there better? No.
      expect(maxProduct("aba")).toBe(1);
    });

    it("should handle 4-char string with only odd-length palindromes", () => {
      // "abba" -> only odd-length palindromes are single chars ("a", "b")
      // "bb" (len 2) and "abba" (len 4) are even-length and invalid
      // Best: "a" (0) and "a" (3) = 1 * 1 = 1
      expect(maxProduct("abba")).toBe(1);
    });
  });

  describe("All Same Characters (The Manacher Stress Test)", () => {
    it('should handle all "a"s with even length', () => {
      // "aaaaaa" (6 chars)
      // Best split: "aaa" (0-2) * "aaa" (3-5) = 3 * 3 = 9
      expect(maxProduct("aaaaaa")).toBe(9);
    });

    it('should handle all "a"s with odd length', () => {
      // "aaaaaaa" (7 chars)
      // Best split: "aaa" (0-2) * "aaa" (4-6) = 3 * 3 = 9
      // "aaaa" (len 4) is even-length and invalid
      expect(maxProduct("aaaaaaa")).toBe(9);
    });

    it("should handle small all-same string", () => {
      // "aaaa" (4 chars)
      // Best split: "aaa" (0-2) * "a" (3) = 3 * 1 = 3
      // "aa" (len 2) is even-length and invalid
      expect(maxProduct("aaaa")).toBe(3);
    });
  });

  describe('The "Greedy Trap" (Shorter Left, Longer Right)', () => {
    it("should NOT greedily pick the longest left palindrome if it blocks a better right one", () => {
      // "abacxcxcx"
      // Left options: "aba" (0-2, len 3) or "abacxcxcx" not palindrome
      // If we pick "aba" (0-2), right can be "cxcxc" (4-8, len 5) -> 3 * 5 = 15
      // But what if there's a longer palindrome that overlaps?
      expect(maxProduct("abacxcxcx")).toBe(15);
    });

    it("should correctly handle case where right palindrome is much longer", () => {
      // "abcccccc"
      // Best split: "ccc" (2-4) * "ccc" (5-7) = 3 * 3 = 9
      // "cccccc" (len 6) is even-length and invalid
      expect(maxProduct("abcccccc")).toBe(9);
    });
  });

  describe("Two Distinct Palindromes Separated by Gap", () => {
    it("should handle two palindromes with a single character gap", () => {
      // "abaxaba" -> "aba" (0-2) and "aba" (4-6) = 3 * 3 = 9
      expect(maxProduct("abaxaba")).toBe(9);
    });

    it("should handle two palindromes with multiple character gap", () => {
      // "abaxxxaba" -> "aba" (0-2) and "aba" (6-8) = 3 * 3 = 9
      expect(maxProduct("abaxxxaba")).toBe(9);
    });

    it("should handle palindromes at the very edges", () => {
      // "abcxdef" -> "a" (0) and "f" (6) = 1, or "b" and "e", etc.
      // Best single chars: 1 * 1 = 1
      expect(maxProduct("abcxdef")).toBe(1);
    });

    it("should handle long symmetric palindrome with adjacent optimal split", () => {
      // "ggbswiymmlevedhkbdhntnhdbkhdevelmmyiwsbgg" (41 chars, full palindrome)
      // Best split: "eve" (10-12, len 3) * "dhkbdhntnhdbkhd" (13-27, len 15) -> 3 * 15 = 45
      // The full string (len 41) and other even-length palindromes are invalid
      expect(maxProduct("ggbswiymmlevedhkbdhntnhdbkhdevelmmyiwsbgg")).toBe(45);
    });
  });

  describe("Odd-Length Only (Even Palindromes Present but Invalid)", () => {
    it("should ignore even-length palindrome on left and use odd on right", () => {
      // "abbaxcdc" — "abba" (len 4) and "bb" (len 2) are invalid
      // Best: "a" (0) * "cdc" (5-7, len 3) = 1 * 3 = 3
      expect(maxProduct("abbaxcdc")).toBe(3);
    });

    it("should ignore even-length palindrome on right and use odd on left", () => {
      // "abaxdeed" — "deed" (len 4) and "ee" (len 2) are invalid
      // Best: "aba" (0-2, len 3) * "d" (7) = 3 * 1 = 3
      expect(maxProduct("abaxdeed")).toBe(3);
    });

    it("should fall back to single chars when only even palindromes are long", () => {
      // "abbaxdeed" — longest palindromes on each side are even-length
      // Best: "a" (0) * "d" (8) = 1 * 1 = 1
      expect(maxProduct("abbaxdeed")).toBe(1);
    });
  });

  describe("Nested Palindromes (The Manacher Propagation Test)", () => {
    it("should correctly propagate palindrome lengths through Manacher", () => {
      // "xababay" -> "ababa" (1-5, len 5) is the longest centered at 3
      // But we need two non-overlapping.
      // "x" (0) * "ababa" (1-5) = 1 * 5 = 5
      // "aba" (1-3) * "bay"? No, "bay" not palindrome.
      // "x" (0) * "aba" (1-3) = 1 * 3 = 3
      // "aba" (1-3) * "y" (6) = 3 * 1 = 3
      // Best: "x" (0) * "ababa" (1-5) = 5, or "ababa" (1-5) * "y" (6) = 5
      expect(maxProduct("xababay")).toBe(5);
    });

    it("should handle concentric palindromes correctly", () => {
      // "abcba" has "abcba" (len 5), "bcb" (len 3), "a","b","c"
      // Best split: "a" (0) * "bcb" (1-3) = 1 * 3 = 3
      // Or "a" (0) * "a" (4) = 1
      // Or "bcb" (1-3) * "a" (4) = 3 * 1 = 3
      expect(maxProduct("abcba")).toBe(3);
    });
  });

  describe("Large Inputs & Performance", () => {
    it("should handle a large string of alternating characters", () => {
      // "abababab..." (1000 chars)
      // Many overlapping palindromes. Algorithm must be O(n) or O(n log n).
      const s = "ab".repeat(500);
      const result = maxProduct(s);
      expect(result).toBeGreaterThan(0);
      // Sanity check: should be reasonably large
      expect(result).toBeGreaterThanOrEqual(499);
    });

    it("should handle maximum constraint (10^5 chars) without TLE", () => {
      // 100,000 'a's
      const s = "a".repeat(100000);
      const result = maxProduct(s);
      // Best split: 49999 * 50001 = 2,499,999,999 (odd lengths only)
      expect(result).toBe(2499999999);
    });

    it("should handle a large string with a clear split point", () => {
      // 50000 'a's + 'x' + 49999 'b's
      const s = "a".repeat(50000) + "x" + "b".repeat(49999);
      const result = maxProduct(s);
      // Best split: 49999 * 49999 = 2,499,900,001 (odd lengths only)
      expect(result).toBe(2499900001);
    });
  });

  describe("Edge Cases with No Long Palindromes", () => {
    it("should handle a string with no palindromes longer than 1", () => {
      // "abcdefg" -> all single chars, best is 1 * 1 = 1
      expect(maxProduct("abcdefg")).toBe(1);
    });

    it("should handle a string with only one pair of adjacent duplicates", () => {
      // "abcdd" -> "dd" (len 2) is even-length and invalid
      // Best: "a" (0) * "d" (4) = 1 * 1 = 1
      expect(maxProduct("abcdd")).toBe(1);
    });

    it("should handle a string with multiple small palindromes", () => {
      // "abacaba" -> "aba" (0-2) and "aba" (4-6) = 3 * 3 = 9
      expect(maxProduct("abacaba")).toBe(9);
    });
  });
});
