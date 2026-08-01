import { describe, it, expect } from "vitest";
import { minimumTime } from "./solution";

describe("2187. Minimum Time to Complete Trips", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: time = [1,2,3], totalTrips = 5 -> 3", () => {
      // At time t = 3:
      // - Bus 1 (time 1) completes 3 trips.
      // - Bus 2 (time 2) completes 1 trip.
      // - Bus 3 (time 3) completes 1 trip.
      // Total trips = 3 + 1 + 1 = 5.
      expect(minimumTime([1, 2, 3], 5)).toBe(3);
    });

    it("should pass Example 2: time = [2], totalTrips = 1 -> 2", () => {
      // Only one bus, and it needs 2 units of time to complete 1 trip.
      expect(minimumTime([2], 1)).toBe(2);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle a single bus with multiple trips", () => {
      expect(minimumTime([5], 10)).toBe(50);
      expect(minimumTime([7], 1)).toBe(7);
    });

    it("should handle multiple buses but only 1 total trip required", () => {
      // The fastest bus will complete the single trip.
      expect(minimumTime([5, 3, 8, 2], 1)).toBe(2);
      expect(minimumTime([100, 50, 25], 1)).toBe(25);
    });

    it("should handle all buses having the exact same time", () => {
      // 3 buses, each takes 2 mins. We need 6 trips.
      // At t=4, each bus completes 2 trips. Total = 6.
      expect(minimumTime([2, 2, 2], 6)).toBe(4);
      expect(minimumTime([10, 10, 10, 10], 1)).toBe(10);
    });

    it("should handle cases where total trips are met exactly at a common multiple", () => {
      // time = [2, 3], totalTrips = 4
      // t=4: bus1 does 2, bus2 does 1 (total 3)
      // t=5: bus1 does 2, bus2 does 1 (total 3)
      // t=6: bus1 does 3, bus2 does 2 (total 5 >= 4)
      expect(minimumTime([2, 3], 4)).toBe(6);
    });

    it("should handle cases where a slower bus is not needed at all", () => {
      // The faster buses can fulfill the requirement before the slow bus even finishes one trip.
      expect(minimumTime([1, 100], 3)).toBe(3);
    });

    it("should handle prime number times to avoid simple LCM overlaps", () => {
      // time = [3, 5, 7], totalTrips = 10
      // t=10: 3+2+1 = 6
      // t=14: 4+2+2 = 8
      // t=15: 5+3+2 = 10
      expect(minimumTime([3, 5, 7], 10)).toBe(15);
    });

    it("should handle large numbers without floating-point precision loss", () => {
      // Max time[i] = 10^7, totalTrips = 10^7
      // Answer = 10^14, which is well within JS's safe integer limit (9 * 10^15)
      expect(minimumTime([10000000], 10000000)).toBe(100000000000000);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle a large number of very fast buses efficiently", () => {
      // 100,000 buses, each taking 1 minute. We need 10,000,000 trips.
      // Each minute, 100,000 trips are completed. We need 100 minutes.
      // A linear scan would TLE; binary search must resolve this instantly.
      const fastBuses = new Array(100000).fill(1);
      expect(minimumTime(fastBuses, 10000000)).toBe(100);
    });

    it("should handle a large number of very slow buses efficiently", () => {
      // 100,000 buses, each taking 10,000,000 minutes. We need 10,000,000 trips.
      // Each bus does 1 trip in 10,000,000 minutes. Total = 100,000 trips.
      // We need 100 iterations of this, so 1,000,000,000 minutes.
      const slowBuses = new Array(100000).fill(10000000);
      expect(minimumTime(slowBuses, 10000000)).toBe(1000000000);
    });

    it("should handle the maximum possible constraints without timing out", () => {
      // time.length = 10^5, time[i] = 10^7, totalTrips = 10^7
      // Max possible answer is 10^14. Binary search range: 1 to 10^14.
      // log2(10^14) ≈ 47 iterations. 47 * 100,000 = 4.7 * 10^6 operations, well within limits.
      const maxConstraintsTime = new Array(100000).fill(10000000);
      expect(minimumTime(maxConstraintsTime, 10000000)).toBe(1000000000);
    });
  });
});
