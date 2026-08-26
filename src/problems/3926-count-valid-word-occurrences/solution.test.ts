import { describe, it, expect } from "vitest";
import { countWordOccurrences } from "./solution";

describe("3926. Count Valid Word Occurrences", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: chunks = ['hello wor','ld hello'], queries = ['hello','world','wor']", () => {
      // Concatenated: "hello world hello"
      // Words: "hello", "world", "hello"
      expect(
        countWordOccurrences(
          ["hello wor", "ld hello"],
          ["hello", "world", "wor"],
        ),
      ).toEqual([2, 1, 0]);
    });

    it("should pass Example 2: chunks = ['a-b a--b ', 'a-', 'b'], queries = ['a-b','a','b']", () => {
      // Concatenated: "a-b a--b a-b"
      // Words: "a-b", "a", "b", "a-b" (the '--' splits into separators)
      expect(
        countWordOccurrences(["a-b a--b ", "a-", "b"], ["a-b", "a", "b"]),
      ).toEqual([2, 1, 1]);
    });

    it("should pass Example 3: chunks = ['-cat dog- mouse'], queries = ['cat','dog','mouse','cat-dog']", () => {
      // Concatenated: "-cat dog- mouse"
      // Leading/trailing hyphens are separators. Words: "cat", "dog", "mouse"
      expect(
        countWordOccurrences(
          ["-cat dog- mouse"],
          ["cat", "dog", "mouse", "cat-dog"],
        ),
      ).toEqual([1, 1, 1, 0]);
    });
  });

  describe("Edge Cases & Word Boundary Traps", () => {
    it("should handle queries that are substrings of valid words but not whole words", () => {
      // "test" is a substring of "testing", but not a maximal word itself
      expect(
        countWordOccurrences(["testing"], ["test", "tes", "testing"]),
      ).toEqual([0, 0, 1]);
    });

    it("should treat leading and trailing hyphens as separators", () => {
      expect(
        countWordOccurrences(
          ["-hello-", "world-"],
          ["hello", "world", "-hello", "world-", "hello-world"],
        ),
      ).toEqual([0, 0, 0, 0, 1]);
    });

    it("should split on multiple consecutive hyphens", () => {
      // "a---b" -> "a" and "b" are words. "---" are separators.
      expect(
        countWordOccurrences(["a---b"], ["a", "b", "a-b", "a---b"]),
      ).toEqual([1, 1, 0, 0]);
    });

    it("should handle a hyphen followed by a space (not a joiner)", () => {
      // "a- b" -> "a" is a word, "b" is a word. The hyphen is a separator.
      expect(countWordOccurrences(["a- b"], ["a", "b", "a-b"])).toEqual([
        1, 1, 0,
      ]);
    });

    it("should handle a space followed by a hyphen (not a joiner)", () => {
      // "a -b" -> "a" is a word, "b" is a word.
      expect(countWordOccurrences(["a -b"], ["a", "b", "a-b"])).toEqual([
        1, 1, 0,
      ]);
    });

    it("should return 0 for all queries if the string contains only separators", () => {
      expect(
        countWordOccurrences(["   ", "---", " - - "], ["a", "b", "c"]),
      ).toEqual([0, 0, 0]);
    });

    it("should correctly join chunks without adding artificial separators", () => {
      // "hel" + "lo" = "hello", which is one word, not "hel" and "lo"
      expect(
        countWordOccurrences(["hel", "lo"], ["hello", "hel", "lo"]),
      ).toEqual([1, 0, 0]);
    });

    it("should handle a joiner hyphen formed exactly at the chunk boundary", () => {
      // "a-" + "b" = "a-b", which is a valid word because 'a' and 'b' surround the '-'
      expect(countWordOccurrences(["a-", "b"], ["a-b", "a", "b"])).toEqual([
        1, 0, 0,
      ]);
    });

    it("should handle a non-joiner hyphen formed exactly at the chunk boundary", () => {
      // "a-" + "-b" = "a--b", which splits into "a" and "b"
      expect(countWordOccurrences(["a-", "-b"], ["a-b", "a", "b"])).toEqual([
        0, 1, 1,
      ]);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle large chunks and queries efficiently (O(N + M) expected)", () => {
      // Create a large string of repeating valid words (Total length = 100,000)
      const word = "valid-word ";
      const chunks = Array(10000).fill(word);
      const queries = ["valid-word", "invalid", "valid", "word"];

      const result = countWordOccurrences(chunks, queries);
      expect(result).toEqual([10000, 0, 0, 0]);
    });

    it("should handle many unique queries efficiently using a hash map", () => {
      const chunks = ["a-b c-d e-f"];

      // Generate 10,000 unique queries to test HashMap lookup efficiency
      const queries: string[] = [];
      for (let i = 0; i < 10000; i++) {
        queries.push(`query-${i}`);
      }
      queries.push("a-b"); // One matching query at the end

      const result = countWordOccurrences(chunks, queries);

      // The last query should match once
      expect(result[queries.length - 1]).toBe(1);
      // All preceding 10,000 queries should have 0 matches
      expect(result.slice(0, 10000).every((count) => count === 0)).toBe(true);
    });

    it("should handle maximum constraint edge case: single character chunks", () => {
      // 50,000 'a's and 50,000 '-'s alternating, forming no valid joiner hyphens
      // Actually, let's do valid joiner: "a" + "-" + "b" repeated
      const chunks: string[] = [];
      for (let i = 0; i < 33333; i++) {
        chunks.push("a", "-", "b", " ");
      }
      // This forms 33,333 "a-b" words
      expect(countWordOccurrences(chunks, ["a-b", "a", "b"])).toEqual([
        33333, 0, 0,
      ]);
    });
  });
});
