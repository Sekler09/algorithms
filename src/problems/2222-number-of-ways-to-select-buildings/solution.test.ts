import { describe, it, expect } from "vitest";
import { numberOfWays } from "./solution";

describe("2222. Number of Ways to Select Buildings", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: '001101' -> 6", () => {
      // Valid selections (indices):
      // "010": [0,2,5], [0,3,5], [1,2,5], [1,3,5] (4 ways)
      // "101": [2,4,5], [3,4,5] (2 ways)
      // Total = 6
      expect(numberOfWays("001101")).toBe(6);
    });

    it("should pass Example 2: '11100' -> 0", () => {
      // Any selection of 3 buildings will include at least two '1's or two '0's
      // that are consecutive in the selection, violating the rule.
      expect(numberOfWays("11100")).toBe(0);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle the minimum length constraint (length 3)", () => {
      expect(numberOfWays("010")).toBe(1);
      expect(numberOfWays("101")).toBe(1);
      expect(numberOfWays("000")).toBe(0);
      expect(numberOfWays("111")).toBe(0);
      expect(numberOfWays("001")).toBe(0);
      expect(numberOfWays("110")).toBe(0);
    });

    it("should return 0 when all buildings are of the same type", () => {
      expect(numberOfWays("000000")).toBe(0);
      expect(numberOfWays("11111111")).toBe(0);
    });

    it("should return 0 when buildings are grouped in only two blocks", () => {
      // "000111" can only form "001", "011", etc., but never "010" or "101"
      expect(numberOfWays("000111")).toBe(0);
      expect(numberOfWays("11110000")).toBe(0);
    });

    it("should handle perfectly alternating buildings", () => {
      // "0101" -> "010" (indices 0,1,2 and 0,1,3? No, 0,1,2 is "010", 1,2,3 is "101")
      // Wait, for "0101":
      // "010": indices (0,1,2)
      // "101": indices (1,2,3)
      // Total = 2
      expect(numberOfWays("0101")).toBe(2);

      // "10101" -> "101" (0,1,2), (0,1,4), (2,3,4), (0,3,4) = 4 ways
      // "010" -> (1,2,3) = 1 way? Let's trace:
      // Actually, standard DP/counting:
      // For "10101":
      // '0's at 1, 3. '1's at 0, 2, 4.
      // "101" using '0' at 1: '1's before=1 (idx 0), '1's after=2 (idx 2,4) -> 1*2 = 2
      // "101" using '0' at 3: '1's before=2 (idx 0,2), '1's after=1 (idx 4) -> 2*1 = 2
      // "010" using '1' at 2: '0's before=1 (idx 1), '0's after=1 (idx 3) -> 1*1 = 1
      // Total = 2 + 2 + 1 = 5. Wait, let's trust the algorithm, but the test just needs the correct expected value.
      // Let's use a simpler alternating one we can manually verify: "01010"
      // '1's at 1, 3. '0's at 0, 2, 4.
      // "010" using '1' at 1: '0's before=1, '0's after=2 -> 2
      // "010" using '1' at 3: '0's before=2, '0's after=1 -> 2
      // "101" using '0' at 2: '1's before=1, '1's after=1 -> 1
      // Total = 5.
      expect(numberOfWays("01010")).toBe(5);
    });
  });

  describe("Pattern Specific Scenarios", () => {
    it("should correctly count '010' patterns when '1's are sparse", () => {
      // One '1' in the middle, surrounded by many '0's
      // "000010000" -> 4 '0's before, 4 '0's after. 4 * 4 = 16 ways.
      expect(numberOfWays("000010000")).toBe(16);
    });

    it("should correctly count '101' patterns when '0's are sparse", () => {
      // One '0' in the middle, surrounded by many '1's
      // "111101111" -> 4 '1's before, 4 '1's after. 4 * 4 = 16 ways.
      expect(numberOfWays("111101111")).toBe(16);
    });

    it("should handle multiple valid middle characters", () => {
      // "0011100"
      // '1's at 2,3,4. '0's at 0,1,5,6.
      // For '1' at 2: 2 '0's before, 2 '0's after -> 4
      // For '1' at 3: 2 '0's before, 2 '0's after -> 4
      // For '1' at 4: 2 '0's before, 2 '0's after -> 4
      // Total "010" = 12. No "101" possible.
      expect(numberOfWays("0011100")).toBe(12);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum length string of all same characters in O(N) time", () => {
      // A naive O(N^3) combinatorial approach will TLE here.
      // An O(N) prefix/suffix count approach will resolve this instantly.
      const largeUniformString = "0".repeat(100000);
      expect(numberOfWays(largeUniformString)).toBe(0);
    });

    it("should handle maximum length string with maximum possible valid combinations", () => {
      // Alternating "010101..." of length 100,000.
      // This generates the maximum possible answer, testing for integer overflow.
      // Max answer is ~4.16 * 10^13, which is well within JS's safe integer limit (9 * 10^15).
      let alternatingString = "";
      for (let i = 0; i < 50000; i++) {
        alternatingString += "01";
      }

      const result = numberOfWays(alternatingString);

      // Verify it's a large positive number and didn't overflow to negative or Infinity
      expect(result).toBeGreaterThan(10000000000000);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeLessThan(Number.MAX_SAFE_INTEGER);
    });

    it("should handle a large string with a single valid pattern in the middle", () => {
      // 49999 '0's, then "101", then 49998 '0's
      // Total length = 49999 + 3 + 49998 = 100000
      const largeString = "0".repeat(49999) + "101" + "0".repeat(49998);

      // The only valid patterns are "010" using the first '1', and "010" using the second '1'.
      // First '1': 49999 '0's before, 49999 '0's after (the '0' in "101" + 49998) -> 49999 * 49999
      // Second '1': 50000 '0's before, 49998 '0's after -> 50000 * 49998
      // Plus '101' in the middle
      const expected = 49999 * 49999 + 50000 * 49998 + 1;
      expect(numberOfWays(largeString)).toBe(expected);
    });
  });
});
