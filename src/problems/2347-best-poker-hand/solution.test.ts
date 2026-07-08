import { describe, it, expect } from "vitest";
import { bestHand } from "./solution";

describe("2347. Best Poker Hand", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: Flush", () => {
      expect(bestHand([13, 2, 3, 1, 9], ["a", "a", "a", "a", "a"])).toBe(
        "Flush",
      );
    });

    it("should pass Example 2: Three of a Kind", () => {
      expect(bestHand([4, 4, 2, 4, 4], ["d", "a", "a", "b", "c"])).toBe(
        "Three of a Kind",
      );
    });

    it("should pass Example 3: Pair", () => {
      expect(bestHand([10, 10, 2, 12, 9], ["a", "b", "c", "a", "d"])).toBe(
        "Pair",
      );
    });
  });

  describe("Flush Scenarios", () => {
    it("should return Flush for 5 identical suits with distinct ranks", () => {
      expect(bestHand([1, 2, 3, 4, 5], ["a", "a", "a", "a", "a"])).toBe(
        "Flush",
      );
    });

    it("should return Flush even if there is a pair (Flush > Pair)", () => {
      // Has a pair of 2s, but all suits are 'b'. Flush wins.
      expect(bestHand([2, 2, 3, 4, 5], ["b", "b", "b", "b", "b"])).toBe(
        "Flush",
      );
    });

    it("should return Flush even if there are three of a kind (Flush > Three of a Kind)", () => {
      // Has three 7s, but all suits are 'c'. Flush wins.
      expect(bestHand([7, 7, 7, 8, 9], ["c", "c", "c", "c", "c"])).toBe(
        "Flush",
      );
    });
  });

  describe("Three of a Kind Scenarios", () => {
    it("should return Three of a Kind for exactly 3 matching ranks", () => {
      expect(bestHand([5, 5, 5, 2, 3], ["a", "b", "c", "d", "a"])).toBe(
        "Three of a Kind",
      );
    });

    it("should return Three of a Kind for 4 matching ranks (Four of a Kind)", () => {
      // The problem only defines up to "Three of a Kind", so 4 of a kind falls into this category.
      expect(bestHand([8, 8, 8, 8, 2], ["a", "b", "c", "d", "a"])).toBe(
        "Three of a Kind",
      );
    });

    it("should return Three of a Kind for 5 matching ranks (Five of a Kind)", () => {
      expect(bestHand([9, 9, 9, 9, 9], ["a", "b", "c", "d", "a"])).toBe(
        "Three of a Kind",
      );
    });

    it("should return Three of a Kind even if there is also a pair (Full House equivalent)", () => {
      // Three 4s and two 2s. Three of a Kind wins over Pair.
      expect(bestHand([4, 4, 4, 2, 2], ["a", "b", "c", "d", "a"])).toBe(
        "Three of a Kind",
      );
    });
  });

  describe("Pair Scenarios", () => {
    it("should return Pair for exactly one pair", () => {
      expect(bestHand([1, 1, 2, 3, 4], ["a", "b", "c", "d", "a"])).toBe("Pair");
    });

    it("should return Pair for two pairs (Two Pair equivalent)", () => {
      // Two 2s and two 3s. The best defined hand is "Pair".
      expect(bestHand([2, 2, 3, 3, 4], ["a", "b", "c", "d", "a"])).toBe("Pair");
    });

    it("should handle pairs at the minimum and maximum ranks", () => {
      expect(bestHand([1, 1, 5, 8, 12], ["a", "b", "c", "d", "a"])).toBe(
        "Pair",
      );
      expect(bestHand([1, 5, 8, 13, 13], ["a", "b", "c", "d", "a"])).toBe(
        "Pair",
      );
    });
  });

  describe("High Card Scenarios", () => {
    it("should return High Card for all distinct ranks and mixed suits", () => {
      expect(bestHand([1, 2, 3, 4, 5], ["a", "b", "c", "d", "a"])).toBe(
        "High Card",
      );
    });

    it("should return High Card for max distinct ranks", () => {
      expect(bestHand([9, 10, 11, 12, 13], ["a", "b", "c", "d", "b"])).toBe(
        "High Card",
      );
    });

    it("should return High Card when suits are mixed but no pairs exist", () => {
      expect(bestHand([3, 7, 11, 2, 10], ["a", "b", "c", "a", "d"])).toBe(
        "High Card",
      );
    });
  });

  describe("Edge Cases & Constraints", () => {
    it("should handle all suits being the same but ranks being 1 and 13", () => {
      expect(bestHand([1, 13, 1, 13, 1], ["d", "d", "d", "d", "d"])).toBe(
        "Flush",
      );
    });

    it("should handle exactly 4 suits represented (impossible to have a flush)", () => {
      // 5 cards, 4 suits means at least one suit is repeated, but never 5 of the same.
      expect(bestHand([2, 3, 4, 5, 6], ["a", "b", "c", "d", "a"])).toBe(
        "High Card",
      );
    });
  });
});
