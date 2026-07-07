/*
 * @lc app=leetcode id=149 lang=typescript
 *
 * [149] Max Points on a Line
 */

// @lc code=start
export function maxPoints(points: number[][]): number {
  if (points.length <= 2) return points.length;
  const lines = new Map<string, Set<string>>();

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let [x1, y1] = points[i];
      let [x2, y2] = points[j];

      let k = x1 - x2 ? (y1 - y2) / (x1 - x2) : NaN;
      let b = Number.isNaN(k) ? x1 : y1 - k * x1;

      const lineCoefs = `${k}-${b}`;

      if (!lines.has(lineCoefs)) {
        lines.set(lineCoefs, new Set());
      }
      lines.get(lineCoefs)?.add(`${x1};${y1}`);
      lines.get(lineCoefs)?.add(`${x2};${y2}`);
    }
  }

  let max = 0;

  lines.forEach((points) => {
    if (points.size > max) max = points.size;
  });

  return max;
}
// @lc code=end
