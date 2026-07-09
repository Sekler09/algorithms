import { describe, it, expect } from "vitest";
import { garbageCollection } from "./solution";

describe("2391. Minimum Amount of Time to Collect Garbage", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: mixed garbage with varying last indices", () => {
      // Collection time: 1+1+2+2 = 6
      // M travel: 0 (never appears)
      // P travel: 2+4 = 6 (last at index 2)
      // G travel: 2+4+3 = 9 (last at index 3)
      // Total: 6 + 0 + 6 + 9 = 21
      expect(garbageCollection(["G", "P", "GP", "GG"], [2, 4, 3])).toBe(21);
    });

    it("should pass Example 2: multiple types at same houses", () => {
      // Collection time: 3+3+2 = 8
      // M travel: 3 (last at index 1)
      // P travel: 3+10 = 13 (last at index 2)
      // G travel: 3+10 = 13 (last at index 2)
      // Total: 8 + 3 + 13 + 13 = 37
      expect(garbageCollection(["MMM", "PGM", "GP"], [3, 10])).toBe(37);
    });
  });

  describe("Base Cases & Single House", () => {
    it("should handle a single house with no travel array", () => {
      expect(garbageCollection(["M"], [])).toBe(1);
      expect(garbageCollection(["MPG"], [])).toBe(3);
      expect(garbageCollection([""], [])).toBe(0);
    });

    it("should handle two houses with one travel segment", () => {
      // Collection: 2. M last at 0 (0), P last at 1 (10). Total: 12
      expect(garbageCollection(["M", "P"], [10])).toBe(12);
    });
  });

  describe("Travel Time & Last Index Logic", () => {
    it("should only count travel time up to the LAST occurrence of each type", () => {
      // G appears at 0 and 3. Should NOT count travel for house 1 or 2 for G.
      // Collection: 2. M travel: 0. G travel: 2+3+4 = 9. Total: 13
      expect(garbageCollection(["G", "", "", "G"], [2, 3, 4])).toBe(11);
    });

    it("should correctly accumulate travel for types that reach the end", () => {
      // All types reach index 3. Travel sum = 5+5+5 = 15 per truck. 3 trucks = 45.
      // Collection: 3. Total: 48
      expect(garbageCollection(["", "", "", "MPG"], [5, 5, 5])).toBe(48);
    });

    it("should handle types that appear only at house 0", () => {
      // M only at 0 -> travel 0. P and G don't exist -> travel 0.
      // Collection: 2. Total: 2
      expect(garbageCollection(["MM", "", ""], [10, 20])).toBe(2);
    });
  });

  describe("Empty Houses & Gaps", () => {
    it("should skip travel calculation for houses with no garbage", () => {
      // Travel is only driven by last index of each type, not by empty houses.
      // M at 0, G at 2. Travel M: 0. Travel G: 10+5=15. Collection: 2. Total: 17
      expect(garbageCollection(["M", "", "G"], [10, 5])).toBe(17);
    });

    it("should handle multiple consecutive empty houses between garbage", () => {
      // P at 0, M at 3. Travel M: 2+2+2=6. Collection: 2. Total: 8
      expect(garbageCollection(["P", "", "", "M"], [2, 2, 2])).toBe(8);
    });
  });

  describe("Single Type & Missing Types", () => {
    it("should return 0 travel for types that never appear in garbage", () => {
      expect(garbageCollection(["G", "G", "G"], [5, 5])).toBe(13); // 3 collection + 10 travel
    });

    it("should handle case where only one truck needs to move", () => {
      // Only M exists at last house. Travel: 100+200+300 = 600. Collection: 4. Total: 604
      expect(garbageCollection(["M", "M", "M", "M"], [100, 200, 300])).toBe(
        604,
      );
    });
  });

  describe("All Types at Every House", () => {
    it("should multiply cumulative travel by 3 when all trucks go to the end", () => {
      // Collection: 3*4 = 12. Each truck travels 1+2+3 = 6. Total travel: 18. Grand total: 30
      expect(garbageCollection(["MPG", "MPG", "MPG", "MPG"], [1, 2, 3])).toBe(
        30,
      );
    });
  });

  describe("Edge Cases & Constraints", () => {
    it("should handle maximum single house garbage length", () => {
      // 50 chars at house 0. No travel.
      const longHouse = "M".repeat(25) + "P".repeat(25);
      expect(garbageCollection([longHouse], [10])).toBe(50);
    });

    it("should handle alternating single characters across many houses", () => {
      // M, P, G, M, P, G ... travel accumulates per type based on last index
      expect(
        garbageCollection(["M", "P", "G", "M", "P", "G"], [1, 1, 1, 1, 1]),
      ).toBe(18);
    });
  });
});
