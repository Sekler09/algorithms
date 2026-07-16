import { describe, it, expect } from "vitest";
import { gcdSum } from "./solution";

describe("Sum of GCD of Formed Pairs", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [2, 6, 4]", () => {
      // prefixGcd:
      // i=0: gcd(2, 2) = 2
      // i=1: gcd(6, 6) = 6
      // i=2: gcd(4, 6) = 2
      // prefixGcd = [2, 6, 2] -> sorted [2, 2, 6]
      // Pairs: gcd(2, 6) = 2. Middle '2' ignored.
      expect(gcdSum([2, 6, 4])).toBe(2);
    });

    it("should pass Example 2: [3, 6, 2, 8]", () => {
      // prefixGcd:
      // i=0: gcd(3, 3) = 3
      // i=1: gcd(6, 6) = 6
      // i=2: gcd(2, 6) = 2
      // i=3: gcd(8, 8) = 8
      // prefixGcd = [3, 6, 2, 8] -> sorted [2, 3, 6, 8]
      // Pairs: gcd(2, 8) = 2, gcd(3, 6) = 3. Sum = 5.
      expect(gcdSum([3, 6, 2, 8])).toBe(5);
    });
  });

  describe("Base Cases & Small Arrays", () => {
    it("should return 0 for a single element array (no pairs can be formed)", () => {
      expect(gcdSum([42])).toBe(0);
    });

    it("should handle exactly two elements", () => {
      // [10, 20] -> prefixGcd: [10, 10] -> sorted [10, 10] -> gcd(10, 10) = 10
      expect(gcdSum([10, 20])).toBe(10);
    });

    it("should handle two coprime elements", () => {
      // [7, 11] -> prefixGcd: [7, 11] -> sorted [7, 11] -> gcd(7, 11) = 1
      expect(gcdSum([7, 11])).toBe(1);
    });
  });

  describe('The "Odd Length Middle Element" Trap', () => {
    it("should correctly ignore the exact middle element in odd-length arrays", () => {
      // [1, 2, 3, 4, 5] -> prefixGcd: [1, 2, 3, 4, 5] -> sorted [1, 2, 3, 4, 5]
      // Pairs: gcd(1, 5) = 1, gcd(2, 4) = 2. Middle '3' is ignored.
      expect(gcdSum([1, 2, 3, 4, 5])).toBe(3);
    });

    it("should handle odd length where middle element is the largest", () => {
      // [2, 4, 10, 3, 5]
      // prefixGcd: [2, gcd(4,4)=4, gcd(10,10)=10, gcd(3,10)=1, gcd(5,10)=5] -> [2, 4, 10, 1, 5]
      // sorted: [1, 2, 4, 5, 10]
      // Pairs: gcd(1, 10) = 1, gcd(2, 5) = 1. Middle '4' ignored. Sum = 2.
      expect(gcdSum([2, 4, 10, 3, 5])).toBe(2);
    });
  });

  describe("Uniform & Monotonic Arrays", () => {
    it("should handle an array where all elements are identical", () => {
      // [5, 5, 5, 5] -> prefixGcd: [5, 5, 5, 5] -> sorted [5, 5, 5, 5]
      // Pairs: gcd(5, 5) = 5, gcd(5, 5) = 5. Sum = 10.
      expect(gcdSum([5, 5, 5, 5])).toBe(10);
    });

    it("should handle a strictly increasing array", () => {
      // mxi is always nums[i], so prefixGcd is just nums.
      // [2, 3, 5, 7] -> sorted [2, 3, 5, 7]
      // Pairs: gcd(2, 7) = 1, gcd(3, 5) = 1. Sum = 2.
      expect(gcdSum([2, 3, 5, 7])).toBe(2);
    });

    it("should handle a strictly decreasing array", () => {
      // mxi is always nums[0].
      // [10, 8, 6, 4] -> prefixGcd: [gcd(10,10)=10, gcd(8,10)=2, gcd(6,10)=2, gcd(4,10)=2]
      // sorted: [2, 2, 2, 10]
      // Pairs: gcd(2, 10) = 2, gcd(2, 2) = 2. Sum = 4.
      expect(gcdSum([10, 8, 6, 4])).toBe(4);
    });
  });

  describe("Complex GCD Scenarios", () => {
    it("should handle arrays that result in many 1s in prefixGcd", () => {
      // [6, 5, 7, 11]
      // prefixGcd: [6, gcd(5,6)=1, gcd(7,7)=7, gcd(11,11)=11] -> [6, 1, 7, 11]
      // sorted: [1, 6, 7, 11]
      // Pairs: gcd(1, 11) = 1, gcd(6, 7) = 1. Sum = 2.
      expect(gcdSum([6, 5, 7, 11])).toBe(2);
    });

    it("should handle a mix of multiples and coprimes", () => {
      // [12, 18, 24]
      // prefixGcd: [12, 18, 24] -> sorted [12, 18, 24]
      // Pairs: gcd(12, 24) = 12. Middle 18 ignored. Sum = 12.
      expect(gcdSum([12, 18, 24])).toBe(12);
    });
  });

  describe("Large Constraints & Performance", () => {
    it("should handle maximum value elements without overflow", () => {
      // [1000000000, 1000000000] -> prefixGcd: [10^9, 10^9] -> gcd = 10^9
      expect(gcdSum([1000000000, 1000000000])).toBe(1000000000);
    });

    it("should handle maximum constraint length (10^5) efficiently", () => {
      // 100,000 elements of 2.
      // prefixGcd will be all 2s.
      // 50,000 pairs of gcd(2, 2) = 2. Total sum = 100,000.
      const largeArray = new Array(100000).fill(2);
      expect(gcdSum(largeArray)).toBe(100000);
    });

    it("should handle maximum constraint length with strictly increasing values", () => {
      // 100,000 elements: 1, 2, 3, ..., 100000
      // This tests that the O(N log N) sort and O(N) pairing don't TLE.
      const increasingArray = Array.from({ length: 100000 }, (_, i) => i + 1);
      const result = gcdSum(increasingArray);
      expect(result).toBeGreaterThan(0); // Sanity check that it completes and returns a number
    });
  });
});
