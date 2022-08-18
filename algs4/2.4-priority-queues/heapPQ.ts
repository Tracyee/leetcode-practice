import MaxPQ from './MaxPQ';
import NoSuchElementException from './noSuchElementException';

class PriorityQueue<Key> implements MaxPQ<Key> {
  private pq: Key[]; // store items at indices **1** to n
  private n: number; // number of items on priority queue
  compareFn?: (a: Key, b: Key) => number;

  /**
   * Initializes an empty priority queue, or a priority queue from the array of keys.
   * Takes time proportional to the number of keys, using sink-based heap construction.
   *
   * @param  keys the array of keys
   */
  constructor(keys?: Key[], compareFn?: (a: Key, b: Key) => number) {
    this.pq = [];
    this.n = 0;
    this.compareFn = compareFn;

    if (keys) {
      this.n = keys.length;
      this.pq = [keys[0], ...keys]; // dummy entry to make array start at 1
      for (let k = ~~(this.n / 2); k >= 1; k--) this.sink(k);
    }
  }

  isEmpty = () => this.n === 0;

  size = () => this.n;

  max = () => {
    if (this.isEmpty())
      throw new NoSuchElementException('Priority queue underflow');
    return this.pq[1];
  };

  insert = (x: Key) => {
    // add x, and percolate it up to maintain heap invariant
    this.pq[++this.n] = x;
    this.swim(this.n);
  };

  delMax = () => {
    if (this.isEmpty())
      throw new NoSuchElementException('Priority queue underflow');
    const max = this.pq[1];
    this.exch(1, this.n--);
    this.sink(1);
    return max;
  };

  /***************************************************************************
   * Helper functions to restore the heap invariant.
   ***************************************************************************/

  /**
   *
   * Bottom-up reheapify (swim).
   * If the heap order is violated because a node's key becomes larger than
   * that node's parents key, then we can make progress toward fixing the
   * violation by exchanging the node with its parent. After the exchange,
   * the node is larger than both its children but the node may still be
   * larger than its parent. We can fix that violation in the same way,
   * and so forth, moving up the heap until we reach a node with a larger key,
   * or the root.
   *
   * @param k the array index of the node to swim
   */
  private swim = (k: number) => {
    while (k > 1 && this.less(~~(k / 2), k)) {
      this.exch(~~(k / 2), k);
      k = ~~(k / 2);
    }
  };

  /**
   *
   * Top-down heapify (sink).
   * If the heap order is violated because a node's key becomes smaller than
   * one or both of that node's children's keys, then we can make progress
   * toward fixing the violation by exchanging the node with the larger of
   * its two children. This switch may cause a violation at the child;
   * we fix that violation in the same way, and so forth, moving down the heap
   * until we reach a node with both children smaller, or the bottom.
   * @param k the array index of the node to sink
   */
  private sink = (k: number) => {
    while (2 * k <= this.n) {
      let j = 2 * k;
      if (j < this.n && this.less(j, j + 1)) j++;
      if (!this.less(k, j)) break;
      this.exch(k, j);
      k = j;
    }
  };

  /***************************************************************************
   * Helper functions for compares and swaps.
   ***************************************************************************/

  private less = (i: number, j: number) => {
    if (!this.compareFn) return this.pq[i] < this.pq[j];
    return this.compareFn(this.pq[i], this.pq[j]) < 0;
  };

  private exch = (i: number, j: number) => {
    [this.pq[i], this.pq[j]] = [this.pq[j], this.pq[i]];
  };

  /***************************************************************************
   * Iterator.
   ***************************************************************************/

  [Symbol.iterator]() {
    return new HeapIterator(this.pq, this.compareFn);
  }
}

class HeapIterator<Key> implements Iterator<Key> {
  private copy: PriorityQueue<Key>;
  constructor(pq: Key[], compareFn?: (a: Key, b: Key) => number) {
    this.copy = new PriorityQueue<Key>([], compareFn);
    for (let i = 1; i < pq.length; i++) this.copy.insert(pq[i]);
  }

  next() {
    const done = this.copy.isEmpty();
    if (done) return { value: undefined, done };
    return { value: this.copy.delMax(), done };
  }
}

export default PriorityQueue;
