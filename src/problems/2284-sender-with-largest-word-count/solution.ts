/*
 * @lc app=leetcode id=2284 lang=typescript
 *
 * [2284] Sender With Largest Word Count
 */

// @lc code=start
export function largestWordCount(
  messages: string[],
  senders: string[],
): string {
  const senderToWordsCount = new Map<string, number>();

  let largestWordCount = 0;
  let largestSender = "";

  for (let i = 0; i < messages.length; i++) {
    const wordsCount = messages[i].split(" ").length;
    const sender = senders[i];
    const newWordsCount = (senderToWordsCount.get(sender) || 0) + wordsCount;

    if (
      newWordsCount > largestWordCount ||
      (newWordsCount === largestWordCount && largestSender < sender)
    ) {
      largestWordCount = newWordsCount;
      largestSender = sender;
    }
    senderToWordsCount.set(sender, newWordsCount);
  }

  return largestSender;
}
// @lc code=end
