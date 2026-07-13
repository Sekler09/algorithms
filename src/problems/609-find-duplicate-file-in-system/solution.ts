/*
 * @lc app=leetcode id=609 lang=typescript
 *
 * [609] Find Duplicate File in System
 */

// @lc code=start
export function findDuplicate(paths: string[]): string[][] {
  const contentToPath: Record<string, string[]> = {};

  for (let path of paths) {
    const [dir, ...files] = path.split(" ");

    for (let file of files) {
      const contentStart = file.indexOf("(");
      const content = file.substring(contentStart + 1, file.length - 1);
      let filename = file.substring(0, contentStart);
      if (contentToPath[content]) {
        contentToPath[content].push(`${dir}/${filename}`);
      } else {
        contentToPath[content] = [`${dir}/${filename}`];
      }
    }
  }

  return Object.values(contentToPath).filter((path) => path.length > 1);
}
// @lc code=end
