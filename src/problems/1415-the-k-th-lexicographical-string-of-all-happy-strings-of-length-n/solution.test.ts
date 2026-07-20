import { describe, it, expect } from "vitest";
import { getHappyString } from "./solution";

describe("1415. The k-th Lexicographical String of All Happy Strings of Length n", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: n = 1, k = 3", () => {
      // Happy strings of length 1: ["a", "b", "c"]
      expect(getHappyString(1, 3)).toBe("c");
    });

    it("should pass Example 2: n = 1, k = 4", () => {
      // Only 3 happy strings of length 1 exist. k=4 is out of bounds.
      expect(getHappyString(1, 4)).toBe("");
    });

    it("should pass Example 3: n = 3, k = 9", () => {
      // Happy strings of length 3:
      // ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"]
      // The 9th string is "cab".
      expect(getHappyString(3, 9)).toBe("cab");
    });
  });

  describe("Base Cases & Small n", () => {
    it("should return the first valid string for k = 1", () => {
      expect(getHappyString(1, 1)).toBe("a");
      expect(getHappyString(2, 1)).toBe("ab");
      expect(getHappyString(3, 1)).toBe("aba");
    });

    it("should handle n = 1 correctly for all valid k", () => {
      expect(getHappyString(1, 1)).toBe("a");
      expect(getHappyString(1, 2)).toBe("b");
      expect(getHappyString(1, 3)).toBe("c");
    });

    it("should handle n = 2 correctly for all valid k", () => {
      // Total for n=2 is 3 * 2^1 = 6
      // ["ab", "ac", "ba", "bc", "ca", "cb"]
      expect(getHappyString(2, 1)).toBe("ab");
      expect(getHappyString(2, 2)).toBe("ac");
      expect(getHappyString(2, 3)).toBe("ba");
      expect(getHappyString(2, 4)).toBe("bc");
      expect(getHappyString(2, 5)).toBe("ca");
      expect(getHappyString(2, 6)).toBe("cb");
    });
  });

  describe('The "Out of Bounds" Trap', () => {
    it("should return empty string when k exceeds the total possible happy strings", () => {
      // Total for n=2 is 6. k=7 is invalid.
      expect(getHappyString(2, 7)).toBe("");

      // Total for n=3 is 3 * 2^2 = 12. k=13 is invalid.
      expect(getHappyString(3, 13)).toBe("");
    });

    it("should return empty string for large n when k is just over the limit", () => {
      // Total for n=10 is 3 * 2^9 = 3 * 512 = 1536.
      expect(getHappyString(10, 1537)).toBe("");
      expect(getHappyString(10, 9999)).toBe("");
    });
  });

  describe("Lexicographical Order Verification", () => {
    it("should correctly generate the last valid string for a given n", () => {
      // For n=2, last is "cb"
      expect(getHappyString(2, 6)).toBe("cb");

      // For n=3, last is "cbc"
      expect(getHappyString(3, 12)).toBe("cbc");
    });

    it("should correctly handle transitions between starting characters", () => {
      // For n=3, strings starting with 'a' are 1-4. Strings starting with 'b' are 5-8.
      expect(getHappyString(3, 4)).toBe("acb"); // Last 'a' string
      expect(getHappyString(3, 5)).toBe("bab"); // First 'b' string
      expect(getHappyString(3, 8)).toBe("bcb"); // Last 'b' string
      expect(getHappyString(3, 9)).toBe("cab"); // First 'c' string
    });
  });

  describe("Large Constraints & Performance", () => {
    it("should handle maximum constraints efficiently (n = 10, k = 100)", () => {
      // n=10, k=100 is well within the 1536 limit.
      const result = getHappyString(10, 100);
      expect(result.length).toBe(10);
      expect(result).not.toBe("");

      // Verify it's a valid happy string
      expect(/^[abc]+$/.test(result)).toBe(true);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).not.toBe(result[i + 1]);
      }
    });

    it("should handle the absolute maximum valid k for n = 10", () => {
      // n=10, k=1536 (the very last valid string)
      const result = getHappyString(10, 1536);
      expect(result.length).toBe(10);
      // The lexicographically last happy string of length 10 alternates 'c' and 'b': "cbcbcbcbcb"
      expect(result).toBe("cbcbcbcbcb");
    });

    it("should handle n = 10, k = 1", () => {
      // The lexicographically first happy string of length 10 alternates 'a' and 'b': "ababababab"
      expect(getHappyString(10, 1)).toBe("ababababab");
    });
  });
});
