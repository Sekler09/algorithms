import { describe, it, expect } from "vitest";
import { maximumSetSize } from "./solution";

describe("3002. Maximum Size of a Set After Removals", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: nums1 = [1,2,1,2], nums2 = [1,1,1,1] -> 2", () => {
      // Remove two 1s from nums1 -> [2, 2]. Remove two 1s from nums2 -> [1, 1].
      // Set s = {1, 2}. Size = 2.
      expect(maximumSetSize([1, 2, 1, 2], [1, 1, 1, 1])).toBe(2);
    });

    it("should pass Example 2: nums1 = [1,2,3,4,5,6], nums2 = [2,3,2,3,2,3] -> 5", () => {
      // Remove 2, 3, 6 from nums1 -> [1, 4, 5]. Remove 2, 3, 3 from nums2 -> [2, 3, 2].
      // Set s = {1, 2, 3, 4, 5}. Size = 5.
      expect(maximumSetSize([1, 2, 3, 4, 5, 6], [2, 3, 2, 3, 2, 3])).toBe(5);
    });

    it("should pass Example 3: nums1 = [1,1,2,2,3,3], nums2 = [4,4,5,5,6,6] -> 6", () => {
      // Remove 1, 2, 3 from nums1 -> [1, 2, 3]. Remove 4, 5, 6 from nums2 -> [4, 5, 6].
      // Set s = {1, 2, 3, 4, 5, 6}. Size = 6.
      expect(maximumSetSize([1, 1, 2, 2, 3, 3], [4, 4, 5, 5, 6, 6])).toBe(6);
    });
  });

  describe("Edge Cases & Boundary Conditions", () => {
    it("should handle the minimum length constraint (n = 2)", () => {
      // We must keep exactly 1 element from each array.
      expect(maximumSetSize([1, 1], [1, 1])).toBe(1);
      expect(maximumSetSize([1, 2], [1, 1])).toBe(2); // Keep 2 from nums1, 1 from nums2
      expect(maximumSetSize([1, 2], [3, 4])).toBe(2); // Keep 1 from nums1, 1 from nums2
    });

    it("should return 1 when all elements in both arrays are identical", () => {
      expect(maximumSetSize([5, 5, 5, 5], [5, 5, 5, 5])).toBe(1);
      expect(maximumSetSize([9, 9], [9, 9])).toBe(1);
    });

    it("should handle arrays with no overlapping elements", () => {
      // n = 4. We keep 2 from nums1, 2 from nums2. Total unique = 4.
      expect(maximumSetSize([1, 2, 3, 4], [5, 6, 7, 8])).toBe(4);
    });

    it("should handle arrays that are completely identical", () => {
      // n = 4. We keep 2 from nums1, 2 from nums2. We can choose disjoint pairs to maximize union.
      // e.g., keep {1, 2} from nums1 and {3, 4} from nums2. Union size = 4.
      expect(maximumSetSize([1, 2, 3, 4], [1, 2, 3, 4])).toBe(4);
    });

    it("should handle one array having all unique elements and the other having all identical elements", () => {
      // n = 4. nums1 has {1, 2, 3, 4}, nums2 has {1, 1, 1, 1}.
      // We can keep at most 2 unique elements from nums1, and 1 unique element (the '1') from nums2.
      // Max size = 2 + 1 = 3.
      expect(maximumSetSize([1, 2, 3, 4], [1, 1, 1, 1])).toBe(3);
    });

    it("should correctly cap the unique elements kept from each array at n / 2", () => {
      // n = 6. nums1 has 5 unique elements, nums2 has 5 unique elements, 1 common.
      // unique1 = 4, unique2 = 4, common = 1.
      // We can keep at most 3 from unique1, and 3 from unique2.
      // Total = min(6, 3 + 3 + 1) = 6.
      expect(maximumSetSize([1, 2, 3, 4, 5, 5], [1, 6, 7, 8, 9, 9])).toBe(6);
    });
  });

  describe("Logic & Distribution Traps", () => {
    it("should prioritize keeping unique elements over common elements when beneficial", () => {
      // n = 4.
      // nums1: [1, 2, 3, 4] (4 unique)
      // nums2: [1, 1, 1, 1] (1 unique, which is common)
      // We must drop 2 from nums1. We keep 2 unique from nums1.
      // We must drop 2 from nums2. We keep '1'.
      // Total = 3.
      expect(maximumSetSize([1, 2, 3, 4], [1, 1, 1, 1])).toBe(3);
    });

    it("should handle cases where common elements are the only way to reach max size", () => {
      // n = 4.
      // nums1: [1, 1, 2, 2] (unique: {2}, common: {1})
      // nums2: [1, 1, 3, 3] (unique: {3}, common: {1})
      // We keep '2' from nums1, '3' from nums2, and '1' is naturally included.
      // Total = 3.
      expect(maximumSetSize([1, 1, 2, 2], [1, 1, 3, 3])).toBe(3);
    });

    it("should handle heavily skewed frequencies", () => {
      // n = 6.
      // nums1 has one element repeated 6 times. nums2 has 6 unique elements including that one.
      expect(maximumSetSize([7, 7, 7, 7, 7, 7], [7, 1, 2, 3, 4, 5])).toBe(4);
      // We keep 3 unique from nums2 (e.g., 1, 2, 3) plus the common '7'. Total = 4.
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum length arrays (n = 20,000) with all unique, non-overlapping elements in O(N) time", () => {
      // A naive combinatorial approach will TLE here.
      // An O(N) HashSet-based approach will resolve this instantly.
      const nums1 = Array.from({ length: 20000 }, (_, i) => i);
      const nums2 = Array.from({ length: 20000 }, (_, i) => i + 20000);

      expect(maximumSetSize(nums1, nums2)).toBe(20000);
    });

    it("should handle maximum length arrays (n = 20,000) with all identical elements", () => {
      const nums1 = new Array(20000).fill(42);
      const nums2 = new Array(20000).fill(42);

      expect(maximumSetSize(nums1, nums2)).toBe(1);
    });

    it("should handle maximum length arrays with large integer values (up to 10^9)", () => {
      // Ensures no issues with large numbers (e.g., if someone mistakenly tries to use them as array indices)
      const nums1 = [1000000000, 999999999, 1000000000, 999999999];
      const nums2 = [1000000000, 888888888, 1000000000, 888888888];

      // n = 4. unique1 = 1 (999999999), unique2 = 1 (888888888), common = 1 (1000000000).
      // keep1 = min(1, 2) = 1. keep2 = min(1, 2) = 1.
      // Total = min(4, 1 + 1 + 1) = 2.
      expect(maximumSetSize(nums1, nums2)).toBe(3);
    });

    it("should handle a mix of maximum unique capacity and common element overflow", () => {
      // n = 10000.
      // nums1: 5000 unique, 5000 copies of a common element 'X'
      // nums2: 5000 unique (different from nums1), 5000 copies of 'X'
      const common = 1;
      const nums1 = [
        ...Array(5000).fill(common),
        ...Array.from({ length: 5000 }, (_, i) => i + 2),
      ];
      const nums2 = [
        ...Array(5000).fill(common),
        ...Array.from({ length: 5000 }, (_, i) => i + 6000),
      ];

      // unique1 = 5000, unique2 = 5000, common = 1.
      // We can keep at most n/2 = 5000 from unique1, and 5000 from unique2.
      // Total = min(10000, 5000 + 5000 + 1) = 10000.
      expect(maximumSetSize(nums1, nums2)).toBe(10000);
    });
  });
});
