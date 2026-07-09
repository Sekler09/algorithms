import { describe, it, expect } from "vitest";
import { getSmallestString } from "./solution";

describe("1663. Smallest String With A Given Numeric Value", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: n = 3, k = 27", () => {
      // 1 + 1 + 25 = 27 -> "aay"
      expect(getSmallestString(3, 27)).toBe("aay");
    });

    it("should pass Example 2: n = 5, k = 73", () => {
      // 1 + 1 + 19 + 26 + 26 = 73 -> "aaszz"
      expect(getSmallestString(5, 73)).toBe("aaszz");
    });
  });

  describe("Base Cases & Boundaries", () => {
    it('should return "a" for minimum length and value (n=1, k=1)', () => {
      expect(getSmallestString(1, 1)).toBe("a");
    });

    it('should return "z" for minimum length and max value (n=1, k=26)', () => {
      expect(getSmallestString(1, 26)).toBe("z");
    });

    it('should return all "a"s when k equals n (minimum possible value)', () => {
      expect(getSmallestString(5, 5)).toBe("aaaaa");
      expect(getSmallestString(10, 10)).toBe("aaaaaaaaaa");
    });

    it('should return all "z"s when k equals 26 * n (maximum possible value)', () => {
      expect(getSmallestString(3, 78)).toBe("zzz");
      expect(getSmallestString(5, 130)).toBe("zzzzz");
    });
  });

  describe('The "Transition" Character Trap', () => {
    it("should handle exactly one character in the middle taking the remainder", () => {
      expect(getSmallestString(3, 29)).toBe("abz");
    });

    it("should handle the transition character being exactly in the middle", () => {
      expect(getSmallestString(5, 125)).toBe("uzzzz");
    });

    it("should handle a two-character string with a mix", () => {
      expect(getSmallestString(2, 27)).toBe("az");
      expect(getSmallestString(2, 28)).toBe("bz");
    });
  });

  describe("Lexicographical Order Verification", () => {
    it('should ensure all "z"s are strictly at the end', () => {
      expect(getSmallestString(4, 77)).toBe("axzz");
    });

    it('should ensure no character exceeds "z" (26)', () => {
      expect(getSmallestString(3, 52)).toBe("ayz");
    });
  });

  describe("Large Values & Constraints", () => {
    it("should handle a large n with k exactly in the middle", () => {
      expect(getSmallestString(10, 130)).toBe("aaaaauzzzz");
    });

    it('should handle large n where almost all are "z"s', () => {
      expect(getSmallestString(100, 2599)).toBe("y" + "z".repeat(99));
    });

    it("should handle maximum constraint limits without performance issues", () => {
      expect(getSmallestString(100000, 100000)).toBe("a".repeat(100000));
      expect(getSmallestString(100000, 2600000)).toBe("z".repeat(100000));
    });
  });
});
