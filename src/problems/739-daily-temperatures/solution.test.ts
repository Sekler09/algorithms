import { describe, it, expect } from "vitest";
import { dailyTemperatures } from "./solution";

describe("739. Daily Temperatures", () => {
  describe("LeetCode Official Examples", () => {
    it("Example 1: [73,74,75,71,69,72,76,73] -> [1,1,4,2,1,1,0,0]", () => {
      expect(
        dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]),
      ).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
    });

    it("Example 2: [30,40,50,60] -> [1,1,1,0]", () => {
      expect(dailyTemperatures([30, 40, 50, 60])).toEqual([1, 1, 1, 0]);
    });

    it("Example 3: [30,60,90] -> [1,1,0]", () => {
      expect(dailyTemperatures([30, 60, 90])).toEqual([1, 1, 0]);
    });
  });

  describe("Edge Cases", () => {
    it("should handle minimum length (n = 1)", () => {
      // Constraint: 1 <= temperatures.length
      // Single day has no future warmer day
      expect(dailyTemperatures([73])).toEqual([0]);
    });

    it("should return all zeros for strictly decreasing temperatures", () => {
      expect(dailyTemperatures([90, 80, 70, 60, 50])).toEqual([0, 0, 0, 0, 0]);
    });

    it("should return all zeros for equal temperatures", () => {
      // Warmer means strictly greater, not equal
      expect(dailyTemperatures([50, 50, 50, 50])).toEqual([0, 0, 0, 0]);
    });

    it("should return consecutive 1s for strictly increasing temperatures", () => {
      expect(dailyTemperatures([30, 40, 50, 60, 70])).toEqual([1, 1, 1, 1, 0]);
    });

    it("should wait multiple days when warmer day is not adjacent", () => {
      expect(dailyTemperatures([70, 71, 70, 69, 72])).toEqual([1, 3, 2, 1, 0]);
    });

    it("should handle temperature at lower bound (30)", () => {
      expect(dailyTemperatures([30, 30, 31])).toEqual([2, 1, 0]);
    });

    it("should handle temperature at upper bound (100)", () => {
      // 100 is max; nothing can be warmer after it
      expect(dailyTemperatures([100, 99, 100, 98])).toEqual([0, 1, 0, 0]);
    });

    it("should handle a later day warming multiple earlier colder days", () => {
      // Monotonic stack: one warm day resolves several waiting colder days
      expect(dailyTemperatures([55, 54, 53, 52, 60])).toEqual([4, 3, 2, 1, 0]);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum length array (n = 100,000) of equal temps in O(N)", () => {
      const n = 100_000;
      const temps = new Array(n).fill(50);
      const expected = new Array(n).fill(0);
      expect(dailyTemperatures(temps)).toEqual(expected);
    });

    it("should handle maximum length non-increasing array in O(N)", () => {
      // Worst case for a naive O(N^2) scan: never finds a warmer day
      const n = 100_000;
      const temps = Array.from(
        { length: n },
        (_, i) => 100 - Math.floor((i * 70) / n),
      );
      const expected = new Array(n).fill(0);
      expect(dailyTemperatures(temps)).toEqual(expected);
    });

    it("should handle maximum length sawtooth array in O(N)", () => {
      // Ramps 30..100 repeatedly (constraint range)
      const n = 100_000;
      const temps = Array.from({ length: n }, (_, i) => 30 + (i % 71));
      const result = dailyTemperatures(temps);

      for (let i = 0; i < n; i++) {
        if (temps[i] === 100 || i === n - 1) {
          // Peak (100) or last day: nothing warmer ahead
          expect(result[i]).toBe(0);
        } else if (temps[i + 1] > temps[i]) {
          expect(result[i]).toBe(1);
        }
      }
    });
  });
});
