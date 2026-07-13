import { describe, it, expect } from "vitest";
import { findDuplicate } from "./solution";

// Helper to normalize the output since LeetCode allows any order for groups and paths
const normalizeResult = (res: string[][]): string[][] => {
  return res
    .map((group) => group.sort())
    .sort((a, b) => a[0].localeCompare(b[0]));
};

describe("609. Find Duplicate File in System", () => {
  describe("LeetCode Official Examples", () => {
    it("should pass Example 1: multiple duplicates across directories", () => {
      const paths = [
        "root/a 1.txt(abcd) 2.txt(efgh)",
        "root/c 3.txt(abcd)",
        "root/c/d 4.txt(efgh)",
        "root 4.txt(efgh)",
      ];
      const expected = [
        ["root/a/2.txt", "root/c/d/4.txt", "root/4.txt"],
        ["root/a/1.txt", "root/c/3.txt"],
      ];
      expect(normalizeResult(findDuplicate(paths))).toEqual(
        normalizeResult(expected),
      );
    });

    it("should pass Example 2: fewer duplicates", () => {
      const paths = [
        "root/a 1.txt(abcd) 2.txt(efgh)",
        "root/c 3.txt(abcd)",
        "root/c/d 4.txt(efgh)",
      ];
      const expected = [
        ["root/a/2.txt", "root/c/d/4.txt"],
        ["root/a/1.txt", "root/c/3.txt"],
      ];
      expect(normalizeResult(findDuplicate(paths))).toEqual(
        normalizeResult(expected),
      );
    });
  });

  describe("Base Cases & No Duplicates", () => {
    it("should return an empty array when there are no duplicates", () => {
      const paths = ["root/a 1.txt(abc)", "root/b 2.txt(def)"];
      expect(findDuplicate(paths)).toEqual([]);
    });

    it("should return an empty array for a single file", () => {
      const paths = ["root/a 1.txt(abc)"];
      expect(findDuplicate(paths)).toEqual([]);
    });

    it("should handle a directory with no files", () => {
      const paths = ["root/a", "root/b"];
      expect(findDuplicate(paths)).toEqual([]);
    });
  });

  describe('The "Same Name, Different Content" Trap', () => {
    it("should NOT group files that have the same name but different content", () => {
      const paths = ["root/a 1.txt(abc)", "root/b 1.txt(def)"];
      expect(findDuplicate(paths)).toEqual([]);
    });
  });

  describe('The "Different Name, Same Content" Trap', () => {
    it("should group files that have different names but identical content", () => {
      const paths = ["root/a file1.txt(abc)", "root/b file2.txt(abc)"];
      const expected = [["root/a/file1.txt", "root/b/file2.txt"]];
      expect(normalizeResult(findDuplicate(paths))).toEqual(
        normalizeResult(expected),
      );
    });
  });

  describe("Multiple Duplicates in the Same Directory", () => {
    it("should group multiple files within the same directory that share content", () => {
      const paths = ["root/a 1.txt(abc) 2.txt(abc) 3.txt(abc)"];
      const expected = [["root/a/1.txt", "root/a/2.txt", "root/a/3.txt"]];
      expect(normalizeResult(findDuplicate(paths))).toEqual(
        normalizeResult(expected),
      );
    });

    it("should handle multiple distinct duplicate groups in the same directory", () => {
      const paths = ["root/a 1.txt(abc) 2.txt(def) 3.txt(abc) 4.txt(def)"];
      const expected = [
        ["root/a/1.txt", "root/a/3.txt"],
        ["root/a/2.txt", "root/a/4.txt"],
      ];
      expect(normalizeResult(findDuplicate(paths))).toEqual(
        normalizeResult(expected),
      );
    });
  });

  describe("Deeply Nested Paths", () => {
    it("should correctly concatenate deep directory paths", () => {
      const paths = [
        "root/dir1/dir2/dir3 1.txt(abc)",
        "root/dirA/dirB 2.txt(abc)",
      ];
      const expected = [["root/dir1/dir2/dir3/1.txt", "root/dirA/dirB/2.txt"]];
      expect(normalizeResult(findDuplicate(paths))).toEqual(
        normalizeResult(expected),
      );
    });
  });

  describe("Parsing Traps (Content & Extensions)", () => {
    it("should handle complex file extensions", () => {
      const paths = ["root/a file.tar.gz(abc)", "root/b file.backup(abc)"];
      const expected = [["root/a/file.tar.gz", "root/b/file.backup"]];
      expect(normalizeResult(findDuplicate(paths))).toEqual(
        normalizeResult(expected),
      );
    });

    it("should handle long alphanumeric content strings", () => {
      const longContent = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0";
      const paths = [
        `root/a 1.txt(${longContent})`,
        `root/b 2.txt(${longContent})`,
      ];
      const expected = [["root/a/1.txt", "root/b/2.txt"]];
      expect(normalizeResult(findDuplicate(paths))).toEqual(
        normalizeResult(expected),
      );
    });

    it("should not confuse content that contains numbers with the file name", () => {
      const paths = ["root/a 123.txt(456)", "root/b 789.txt(456)"];
      const expected = [["root/a/123.txt", "root/b/789.txt"]];
      expect(normalizeResult(findDuplicate(paths))).toEqual(
        normalizeResult(expected),
      );
    });
  });
});
