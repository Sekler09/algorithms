import { describe, it, expect } from "vitest";
import { maxEvents } from "./solution";

describe("1353. Maximum Number of Events That Can Be Attended", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [[1,2],[2,3],[3,4]] -> 3", () => {
      // You can attend all three events on days 1, 2, and 3 respectively.
      expect(
        maxEvents([
          [1, 2],
          [2, 3],
          [3, 4],
        ]),
      ).toBe(3);
    });

    it("should pass Example 2: [[1,2],[2,3],[3,4],[1,2]] -> 4", () => {
      // You can attend all four events.
      // E.g., day 1: event 4, day 2: event 1, day 3: event 2, day 4: event 3.
      expect(
        maxEvents([
          [1, 2],
          [2, 3],
          [3, 4],
          [1, 3],
        ]),
      ).toBe(4);
    });
  });

  describe("Edge Cases & Overlap Traps", () => {
    it("should return 1 for a single event", () => {
      expect(maxEvents([[1, 5]])).toBe(1);
      expect(maxEvents([[10, 10]])).toBe(1);
    });

    it("should handle completely non-overlapping events", () => {
      expect(
        maxEvents([
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
        ]),
      ).toBe(4);
      expect(
        maxEvents([
          [1, 2],
          [3, 4],
          [5, 6],
        ]),
      ).toBe(3);
    });

    it("should handle completely overlapping events (more days than events)", () => {
      // 5 events, all available from day 1 to 5. We can attend one per day.
      expect(
        maxEvents([
          [1, 5],
          [1, 5],
          [1, 5],
          [1, 5],
          [1, 5],
        ]),
      ).toBe(5);
    });

    it("should handle completely overlapping events (more events than days)", () => {
      // 4 events, but only 2 days available (day 1 and day 2).
      expect(
        maxEvents([
          [1, 2],
          [1, 2],
          [1, 2],
          [1, 2],
        ]),
      ).toBe(2);
    });

    it("should prioritize events that end earlier (Greedy choice trap)", () => {
      // If we pick [1, 10] on day 1, we miss [2, 2] and [3, 3].
      // Optimal: [2, 2] on day 2, [3, 3] on day 3, [1, 10] on day 1. Total = 3.
      expect(
        maxEvents([
          [1, 10],
          [2, 2],
          [3, 3],
        ]),
      ).toBe(3);
    });

    it("should handle events with the same start day but different end days", () => {
      // Should pick the one ending earlier first to leave room for others.
      expect(
        maxEvents([
          [1, 4],
          [1, 2],
          [1, 3],
        ]),
      ).toBe(3);
    });

    it("should handle events with the same end day but different start days", () => {
      expect(
        maxEvents([
          [1, 3],
          [2, 3],
          [3, 3],
        ]),
      ).toBe(3);
    });

    it("should handle a mix of short and long events", () => {
      // Long event can fill in the gaps left by short events.
      expect(
        maxEvents([
          [1, 5],
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5],
        ]),
      ).toBe(5);
    });

    it("should handle events that start and end on the same day", () => {
      expect(
        maxEvents([
          [1, 1],
          [1, 1],
          [1, 1],
        ]),
      ).toBe(1);
      expect(
        maxEvents([
          [1, 1],
          [2, 2],
          [2, 2],
        ]),
      ).toBe(2);
    });

    it("should handle large gaps between events", () => {
      expect(
        maxEvents([
          [1, 2],
          [10, 12],
          [20, 25],
        ]),
      ).toBe(3);
    });

    it("should handle sequential events that barely connect", () => {
      expect(
        maxEvents([
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 5],
        ]),
      ).toBe(4);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle a large number of events efficiently (O(N log N) expected)", () => {
      // Generate 100,000 events, all spanning from day 1 to 100,000
      // A naive O(N^2) or day-by-day simulation will TLE here.
      const largeEventList = Array.from({ length: 100000 }, () => [1, 100000]);

      // We can attend exactly 100,000 events (one per day for 100,000 days)
      expect(maxEvents(largeEventList)).toBe(100000);
    });

    it("should handle a large number of tightly packed, distinct events", () => {
      // Generate 100,000 events, each exactly 1 day long, sequentially
      const sequentialEvents = Array.from({ length: 100000 }, (_, i) => [
        i + 1,
        i + 1,
      ]);
      expect(maxEvents(sequentialEvents)).toBe(100000);
    });

    it("should handle a large number of events with a strict bottleneck", () => {
      // 100,000 events all confined to a 5-day window
      const bottleneckEvents = Array.from({ length: 100000 }, () => [1, 5]);
      expect(maxEvents(bottleneckEvents)).toBe(5);
    });
  });
});
