/*
 * @lc app=leetcode id=3926 lang=typescript
 *
 * [3926] Count Valid Word Occurrences
 */

// @lc code=start
export function countWordOccurrences(
  chunks: string[],
  queries: string[],
): number[] {
  const s = chunks.join("");
  const n = s.length;
  const validWordsCount: Map<string, number> = new Map();

  let i = 0;
  while (i < n) {
    if (s[i] === "-" || s[i] === " ") {
      i++;
      continue;
    }

    let j = i;
    while (
      j < n &&
      s[j] !== " " &&
      (s[j] !== "-" || (j + 1 < n && s[j + 1] !== " " && s[j + 1] !== "-"))
    ) {
      j++;
    }

    const word = s.slice(i, j);
    validWordsCount.set(word, (validWordsCount.get(word) || 0) + 1);
    i = j;
  }

  return queries.map((q) => validWordsCount.get(q) || 0);
}

// @lc code=end
