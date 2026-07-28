/*
 * @lc app=leetcode id=1353 lang=typescript
 *
 * [1353] Maximum Number of Events That Can Be Attended
 */

// @lc code=start
export function maxEvents(events: number[][]): number {
  const maxDay = Math.max(...events.map(([, e]) => e));

  const dayToStart = events.reduce((map, [s, e]) => {
    map.has(s) ? map.get(s)!.push(e) : map.set(s, [e]);
    return map;
  }, new Map<number, number[]>());

  const pq = new MinPriorityQueue();

  let maxVisited = 0;

  for (let i = 1; i <= maxDay; i++) {
    while (!pq.isEmpty() && pq.peek()! < i) {
      pq.pop();
    }

    if (dayToStart.has(i)) {
      dayToStart.get(i)?.forEach((el) => pq.push(el));
    }

    if (!pq.isEmpty()) {
      pq.pop();
      maxVisited++;
    }
  }

  return maxVisited;
}

class MinPriorityQueue {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  push(item: number): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): number {
    if (this.isEmpty()) throw new Error("Queue is empty");

    const item = this.heap[0];
    const last = this.heap.pop()!;
    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return item;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;

      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      const leftIndex = index * 2 + 1;
      const rightIndex = leftIndex + 1;
      let minIndex = index;

      if (
        leftIndex < this.size() &&
        this.heap[leftIndex] < this.heap[minIndex]
      ) {
        minIndex = leftIndex;
      }

      if (
        rightIndex < this.size() &&
        this.heap[rightIndex] < this.heap[minIndex]
      ) {
        minIndex = rightIndex;
      }

      if (minIndex === index) {
        break;
      }

      [this.heap[index], this.heap[minIndex]] = [
        this.heap[minIndex],
        this.heap[index],
      ];
      index = minIndex;
    }
  }
}
// @lc code=end
