import { describe, it, expect } from "vitest";
import { longestPalindrome } from "./solution";

describe("5. Longest Palindromic Substring", () => {
  describe("LeetCode Official Examples", () => {
    it('should pass Example 1: "babad" -> "bab" or "aba"', () => {
      // Both "bab" and "aba" are valid answers
      const result = longestPalindrome("babad");
      expect(["bab", "aba"]).toContain(result);
    });

    it('should pass Example 2: "cbbd" -> "bb"', () => {
      expect(longestPalindrome("cbbd")).toBe("bb");
    });
  });

  describe("Edge Cases & Palindrome Traps", () => {
    it("should return the single character for a one-character string", () => {
      expect(longestPalindrome("a")).toBe("a");
    });

    it("should return the entire string if it is already a palindrome", () => {
      expect(longestPalindrome("racecar")).toBe("racecar");
      expect(longestPalindrome("aba")).toBe("aba");
    });

    it("should handle even-length palindromes", () => {
      expect(longestPalindrome("abba")).toBe("abba");
      expect(longestPalindrome("cbbd")).toBe("bb");
    });

    it("should handle palindromes at the beginning of the string", () => {
      expect(longestPalindrome("abacde")).toBe("aba");
    });

    it("should handle palindromes at the end of the string", () => {
      expect(longestPalindrome("abcdeed")).toBe("deed");
    });

    it("should handle palindromes in the middle of the string", () => {
      expect(longestPalindrome("xabay")).toBe("aba");
      expect(longestPalindrome("xababay")).toBe("ababa");
    });

    it("should return any single character when no palindrome is longer than 1", () => {
      const result = longestPalindrome("abcd");
      expect(result.length).toBe(1);
      expect(["a", "b", "c", "d"]).toContain(result);
    });

    it("should handle strings with all identical characters", () => {
      expect(longestPalindrome("aaaa")).toBe("aaaa");
      expect(longestPalindrome("aaa")).toBe("aaa");
    });

    it("should handle the longest palindrome being the entire string", () => {
      expect(longestPalindrome("madam")).toBe("madam");
    });

    it("should handle two-character strings", () => {
      expect(longestPalindrome("aa")).toBe("aa");
      expect(longestPalindrome("ab")).toBe("a"); // or 'b', both are valid
    });

    it("should handle palindromes with spaces", () => {
      // Spaces are valid characters
      expect(longestPalindrome("a b a")).toBe("a b a");
    });

    it("should handle multiple palindromes of the same length", () => {
      // "abcba" and "bcb" are both palindromes, but "abcba" is longer
      const result = longestPalindrome("xabcbay");
      expect(result).toBe("abcba");
    });

    it("should handle a very long string with a palindrome in the middle", () => {
      const result = longestPalindrome("xyzabacbazxyz");
      expect(result).toBe("zabacbaz");
    });
  });
});
