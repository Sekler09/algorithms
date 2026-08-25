import { describe, it, expect } from "vitest";
import { largestDivisibleSubset } from "./solution";

// Helper function to validate if a subset is a valid divisible subset of the original array
const isValidDivisibleSubset = (subset: number[], nums: number[]): boolean => {
  if (subset.length === 0) return false; // A valid subset must have at least 1 element

  const numSet = new Set(nums);

  // 1. Check that all elements in the subset actually exist in the original array
  for (const num of subset) {
    if (!numSet.has(num)) return false;
  }

  // 2. Check that every pair in the subset satisfies the divisibility condition
  for (let i = 0; i < subset.length; i++) {
    for (let j = i + 1; j < subset.length; j++) {
      const a = subset[i];
      const b = subset[j];
      if (a % b !== 0 && b % a !== 0) {
        return false;
      }
    }
  }

  return true;
};

describe("368. Largest Divisible Subset", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: [1,2,3] -> length 2 (e.g., [1,2] or [1,3])", () => {
      const result = largestDivisibleSubset([1, 2, 3]);
      expect(result.length).toBe(2);
      expect(isValidDivisibleSubset(result, [1, 2, 3])).toBe(true);
    });

    it("should pass Example 2: [1,2,4,8] -> length 4 ([1,2,4,8])", () => {
      const result = largestDivisibleSubset([1, 2, 4, 8]);
      expect(result.length).toBe(4);
      expect(isValidDivisibleSubset(result, [1, 2, 4, 8])).toBe(true);
    });
  });

  describe("Edge Cases & Divisibility Traps", () => {
    it("should return the single element for a one-element array", () => {
      expect(largestDivisibleSubset([42])).toEqual([42]);
      expect(largestDivisibleSubset([1])).toEqual([1]);
    });

    it("should return any single element when no two elements are divisible (e.g., primes)", () => {
      const nums = [2, 3, 5, 7, 11];
      const result = largestDivisibleSubset(nums);
      expect(result.length).toBe(1);
      expect(isValidDivisibleSubset(result, nums)).toBe(true);
    });

    it("should handle unsorted input correctly", () => {
      // Optimal subset is [4, 8, 16] or [2, 4, 8, 16] if 2 was there.
      // Here, 16 % 8 == 0, 8 % 4 == 0. Length should be 3.
      const nums = [16, 4, 8, 3];
      const result = largestDivisibleSubset(nums);
      expect(result.length).toBe(3);
      expect(isValidDivisibleSubset(result, nums)).toBe(true);
    });

    it("should handle cases where multiple subsets have the same maximum length", () => {
      // [1, 2, 4] (len 3) and [1, 3, 9] (len 3) are both valid max subsets
      const nums = [1, 2, 3, 4, 9];
      const result = largestDivisibleSubset(nums);
      expect(result.length).toBe(3);
      expect(isValidDivisibleSubset(result, nums)).toBe(true);
    });

    it("should handle a 'chain' of divisibility", () => {
      // 1 divides 2, 2 divides 6, 6 divides 24, 24 divides 48
      const nums = [48, 2, 1, 6, 24];
      const result = largestDivisibleSubset(nums);
      expect(result.length).toBe(5);
      expect(isValidDivisibleSubset(result, nums)).toBe(true);
    });

    it("should handle cases where a larger number breaks the chain", () => {
      // [1, 2, 4, 8] is valid (len 4). Adding 3, 5, 7 doesn't extend the chain.
      const nums = [1, 2, 3, 4, 5, 7, 8];
      const result = largestDivisibleSubset(nums);
      expect(result.length).toBe(4);
      expect(isValidDivisibleSubset(result, nums)).toBe(true);
    });

    it("should handle numbers with common factors but no direct divisibility", () => {
      // 6 and 10 share a factor of 2, but 10 % 6 !== 0 and 6 % 10 !== 0
      // Max subset length should be 2 (e.g., [2, 6] or [2, 10])
      const nums = [2, 6, 10, 15];
      const result = largestDivisibleSubset(nums);
      expect(result.length).toBe(2);
      expect(isValidDivisibleSubset(result, nums)).toBe(true);
    });
  });

  describe("Constraints & Boundary Values", () => {
    it("should handle the maximum value constraint (nums[i] = 2 * 10^9) without overflow", () => {
      // 1 divides 10^9, 10^9 divides 2 * 10^9
      const nums = [1, 1000000000, 2000000000];
      const result = largestDivisibleSubset(nums);
      expect(result.length).toBe(3);
      expect(isValidDivisibleSubset(result, nums)).toBe(true);
    });

    it("should handle an array where all elements are multiples of the first element", () => {
      const nums = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
      // Wait, 9 % 6 !== 0. The chain is 3 -> 6 -> 12 -> 24 (len 4) or 3 -> 6 -> 18 (len 3), etc.
      // Actually, 3, 6, 12, 24 is valid. Let's make a strict chain.
      const strictChain = [3, 6, 12, 24, 48, 96];
      const result = largestDivisibleSubset(strictChain);
      expect(result.length).toBe(6);
      expect(isValidDivisibleSubset(result, strictChain)).toBe(true);
    });
  });

  describe("Performance & Scale", () => {
    it("should handle the maximum length constraint (n = 1000) efficiently with primes", () => {
      // Generate 1000 distinct primes. No two are divisible.
      // Result should be length 1. A naive O(2^N) backtracking will TLE here.
      // An O(N^2) DP solution will handle this in ~1,000,000 operations, well within limits.
      const primes: number[] = [];
      let num = 2;
      while (primes.length < 1000) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) primes.push(num);
        num++;
      }

      const result = largestDivisibleSubset(primes);
      expect(result.length).toBe(1);
      expect(isValidDivisibleSubset(result, primes)).toBe(true);
    });

    it("should handle the maximum length constraint (n = 1000) with a deep divisibility chain", () => {
      // Generate a chain of 31 elements (2^0 to 2^30, max value ~10^9, within 2*10^9 constraint)
      // and pad the rest with random large primes that don't divide anything.
      const chain: number[] = [];
      for (let i = 0; i < 31; i++) {
        chain.push(2 ** i);
      }

      // Add 969 random large numbers that are unlikely to form longer chains
      const filler: number[] = [];
      for (let i = 0; i < 969; i++) {
        filler.push(1000000007 + i); // Large primes
      }

      const nums = [...chain, ...filler];
      // Shuffle to ensure the algorithm doesn't rely on pre-sorted input
      const shuffledNums = nums.sort(() => Math.random() - 0.5);

      const result = largestDivisibleSubset(shuffledNums);
      expect(result.length).toBe(31);
      expect(isValidDivisibleSubset(result, shuffledNums)).toBe(true);
    });
  });
});
