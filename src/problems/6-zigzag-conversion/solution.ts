/*
 * @lc app=leetcode id=6 lang=typescript
 *
 * [6] Zigzag Conversion
 */

// @lc code=start
export function convert(s: string, numRows: number): string {
  if (numRows === 1) return s;

  const rows = new Array(numRows).fill("");
  let dir = 1;
  let rowIndex = 0;

  for (let i = 0; i < s.length; i++) {
    rows[rowIndex] += s[i];
    rowIndex += dir;

    if (rowIndex === 0 || rowIndex === numRows - 1) dir = -dir;
  }

  return rows.join("");
}
// @lc code=end
