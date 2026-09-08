import { describe, it, expect } from "vitest";
import { largestWordCount } from "./solution";

describe("2284. Sender With Largest Word Count", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: messages = ['Hello userTwooo','Hi userThree','Wonderful day Alice','Nice day userThree'], senders = ['Alice','userTwo','userThree','Alice'] -> 'Alice'", () => {
      // Alice: 2 + 1 = 3 words
      // userTwo: 1 word
      // userThree: 1 + 1 = 2 words
      // Alice has the largest word count.
      expect(
        largestWordCount(
          [
            "Hello userTwooo",
            "Hi userThree",
            "Wonderful day Alice",
            "Nice day userThree",
          ],
          ["Alice", "userTwo", "userThree", "Alice"],
        ),
      ).toBe("Alice");
    });

    it("should pass Example 2: messages = ['How is leetcode for everyone','Leetcode is useful for practice'], senders = ['Bob','Charlie'] -> 'Charlie'", () => {
      // Bob: 5 words
      // Charlie: 5 words
      // Tie-breaker: "Charlie" is lexicographically larger than "Bob".
      expect(
        largestWordCount(
          ["How is leetcode for everyone", "Leetcode is useful for practice"],
          ["Bob", "Charlie"],
        ),
      ).toBe("Charlie");
    });
  });

  describe("Edge Cases & Lexicographical Traps", () => {
    it("should handle a single message from a single sender", () => {
      expect(largestWordCount(["Hello world"], ["Alice"])).toBe("Alice");
    });

    it("should handle all messages coming from the same sender", () => {
      expect(
        largestWordCount(
          ["One", "Two words", "Three words here"],
          ["Bob", "Bob", "Bob"],
        ),
      ).toBe("Bob");
    });

    it("should correctly resolve ties using lexicographically largest name (uppercase vs lowercase)", () => {
      // In JavaScript, 'Z' (90) < 'a' (97), so 'alice' > 'Zack' lexicographically in standard JS string comparison.
      // LeetCode uses standard ASCII/Unicode lexicographical comparison.
      expect(largestWordCount(["a", "b"], ["Zack", "alice"])).toBe("alice");
    });

    it("should correctly resolve ties using lexicographically largest name (same prefix)", () => {
      // "Alice" vs "Alicea" -> "Alicea" is lexicographically larger
      expect(largestWordCount(["hello", "world"], ["Alice", "Alicea"])).toBe(
        "Alicea",
      );
    });

    it("should handle senders with entirely different name lengths", () => {
      // "Z" vs "AAAAAAAAAAAA" -> "Z" is lexicographically larger than "A"
      expect(largestWordCount(["a", "b"], ["Z", "AAAAAAAAAAAA"])).toBe("Z");
    });
  });

  describe("Word Counting Nuances", () => {
    it("should correctly count words in messages with varying lengths", () => {
      // 1 word, 2 words, 3 words
      const messages = ["a", "a b", "a b c"];
      const senders = ["User1", "User2", "User3"];
      expect(largestWordCount(messages, senders)).toBe("User3");
    });

    it("should handle messages that are exactly 100 characters long (max constraint)", () => {
      // 50 pairs of "a " = 100 characters, but constraint says no trailing space.
      // Let's use 49 "a " + "a" = 99 characters, 50 words.
      const longMessage = Array(50).fill("a").join(" ");
      expect(longMessage.length).toBe(99);

      expect(
        largestWordCount([longMessage, "b"], ["LongUser", "ShortUser"]),
      ).toBe("LongUser");
    });

    it("should handle a sender with 0 words? (Not possible per constraints, min 1 char per message)", () => {
      // Constraints guarantee messages[i].length >= 1 and no leading/trailing spaces,
      // so every message has at least 1 word.
      expect(largestWordCount(["x"], ["Single"])).toBe("Single");
    });
  });

  describe("Performance & Scale", () => {
    it("should handle maximum constraints (10,000 messages) efficiently in O(N) time", () => {
      // A naive approach that sorts the entire array of senders unnecessarily might be O(N log N),
      // but an O(N) Map-based approach should handle this instantly.
      const messages = new Array(10000).fill("a b c d e");
      const senders = new Array(10000).fill("OptimalUser");

      expect(largestWordCount(messages, senders)).toBe("OptimalUser");
    });

    it("should handle maximum constraints with unique senders to test Map/Dictionary overhead", () => {
      // 10,000 unique senders, each sending 1 word.
      // The lexicographically largest name should be returned.
      const messages = new Array(10000).fill("hello");
      const senders = Array.from(
        { length: 10000 },
        (_, i) => `User${i.toString().padStart(4, "0")}`,
      );

      // "User9999" is the lexicographically largest
      expect(largestWordCount(messages, senders)).toBe("User9999");
    });

    it("should handle maximum constraints with a tie between two highly frequent senders", () => {
      // 5,000 messages from "Alice", 5,000 messages from "Bob"
      // Both have 5,000 words. "Bob" > "Alice" lexicographically.
      const messages = new Array(10000).fill("word");
      const senders = [
        ...new Array(5000).fill("Alice"),
        ...new Array(5000).fill("Bob"),
      ];

      expect(largestWordCount(messages, senders)).toBe("Bob");
    });

    it("should handle maximum length messages for all entries without memory issues", () => {
      // 10,000 messages, each ~100 characters long (50 words)
      const longWordMessage = Array(50).fill("word").join(" ");
      const messages = new Array(10000).fill(longWordMessage);
      const senders = new Array(10000).fill("HeavySender");

      expect(largestWordCount(messages, senders)).toBe("HeavySender");
    });
  });
});
