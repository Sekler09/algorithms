import { describe, it, expect } from "vitest";
import { lengthOfLongestSubstring } from "./solution";

describe("3. Longest Substring Without Repeating Characters", () => {
  describe("LeetCode Official Examples", () => {
    it('should pass Example 1: "abcabcbb" -> 3', () => {
      expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
    });

    it('should pass Example 2: "bbbbb" -> 1', () => {
      expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
    });

    it('should pass Example 3: "pwwkew" -> 3', () => {
      expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
    });
  });

  describe("Edge Cases & Sliding Window Traps", () => {
    it("should return 0 for an empty string", () => {
      expect(lengthOfLongestSubstring("")).toBe(0);
    });

    it("should return 1 for a single character", () => {
      expect(lengthOfLongestSubstring("a")).toBe(1);
    });

    it("should return the full length if all characters are unique", () => {
      expect(lengthOfLongestSubstring("abcdef")).toBe(6);
    });

    it("should handle spaces correctly (space is a valid character)", () => {
      expect(lengthOfLongestSubstring(" ")).toBe(1);
      expect(lengthOfLongestSubstring("  ")).toBe(1); // Two spaces repeating
      expect(lengthOfLongestSubstring("ab c")).toBe(4);
    });

    it("should handle repeating characters at the very end", () => {
      expect(lengthOfLongestSubstring("abcdeff")).toBe(6);
    });

    it("should handle repeating characters at the very beginning", () => {
      expect(lengthOfLongestSubstring("aabcdef")).toBe(6);
    });

    it('should correctly shrink the window for overlapping repeats ("dvdf")', () => {
      // This is the #1 edge case that breaks naive sliding window implementations
      expect(lengthOfLongestSubstring("dvdf")).toBe(3);
    });

    it('should handle complex overlapping ("tmmzuxt")', () => {
      // Longest is "mzuxt" (length 5)
      expect(lengthOfLongestSubstring("tmmzuxt")).toBe(5);
    });
  });
});
