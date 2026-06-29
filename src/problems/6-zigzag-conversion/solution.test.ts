import { describe, it, expect } from "vitest";
import { convert } from "./solution";

describe("6. Zigzag Conversion", () => {
  describe("LeetCode Official Examples", () => {
    it('should pass Example 1: "PAYPALISHIRING" with 3 rows', () => {
      // P   A   H   N
      // A P L S I I G
      // Y   I   R
      expect(convert("PAYPALISHIRING", 3)).toBe("PAHNAPLSIIGYIR");
    });

    it('should pass Example 2: "PAYPALISHIRING" with 4 rows', () => {
      // P     I    N
      // A   L S  I G
      // Y A   H R
      // P     I
      expect(convert("PAYPALISHIRING", 4)).toBe("PINALSIGYAHRPI");
    });

    it('should pass Example 3: "A" with 1 row', () => {
      expect(convert("A", 1)).toBe("A");
    });
  });

  describe("Edge Cases & Zigzag Traps", () => {
    it("should return the original string when numRows is 1", () => {
      // With 1 row, there is no zigzag - just read straight across
      expect(convert("ABCDEF", 1)).toBe("ABCDEF");
    });

    it("should return the original string when numRows equals string length", () => {
      // Each character gets its own row, no diagonal movement
      expect(convert("ABCD", 4)).toBe("ABCD");
    });

    it("should return the original string when numRows is greater than string length", () => {
      // Same as above - not enough characters to form a zigzag
      expect(convert("AB", 5)).toBe("AB");
    });

    it("should handle empty string", () => {
      expect(convert("", 3)).toBe("");
    });

    it("should handle the simplest zigzag with 2 rows", () => {
      // A C E
      // B D F
      expect(convert("ABCDEF", 2)).toBe("ACEBDF");
    });

    it("should handle a string with all identical characters", () => {
      // Should still produce a valid zigzag pattern
      expect(convert("AAAAAA", 3)).toBe("AAAAAA");
    });

    it("should handle string length exactly one more than numRows", () => {
      // ABCDE with 4 rows - just one diagonal character
      // A     G
      // B   F
      // C E
      // D
      expect(convert("ABCDEFG", 4)).toBe("AGBFCED");
    });

    it("should handle a longer string with 5 rows", () => {
      // Verify the pattern holds for larger row counts
      expect(convert("ABCDEFGHIJK", 5)).toBe("AIBHJCGKDFE");
    });

    it("should handle string with spaces and special characters", () => {
      // Spaces and special chars are treated as regular characters
      expect(convert("A B C", 2)).toBe("ABC  ");
    });
  });
});
