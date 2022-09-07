/**
 * Definition for a binary tree node.
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function closestKValues(
  root: TreeNode | null,
  target: number,
  k: number,
): number[] {
  type Pair = [number, number];
  const maxPQ = new MaxPQ((a: Pair, b: Pair) => a[0] - b[0]);

  const inorder = (node: TreeNode | null) => {
    if (!node) return;
    inorder(node.left);
    maxPQ.insert([Math.abs(node.val - target), node.val]);
    if (maxPQ.size() > k) {
      maxPQ.delMax();
    }
    inorder(node.right);
  };

  inorder(root);
  return maxPQ.pq.slice(1).map(([, v]) => v);
}

function closestKValues2(
  root: TreeNode | null,
  target: number,
  k: number,
): number[] {
  const queue: number[] = [];

  const inorder = (node: TreeNode | null) => {
    if (!node) return;
    inorder(node.left);
    if (queue.length < k) queue.push(node.val);
    else if (Math.abs(node.val - target) < queue[0]) {
      queue.shift();
      queue.push(node.val);
    }
    inorder(node.right);
  };

  inorder(root);
  return queue;
}

class MaxPQ<T> {
  pq: T[];
  n: number;
  compareFn?: (a: T, b: T) => number;
  constructor(compareFn?: (a: T, b: T) => number) {
    this.pq = [];
    this.n = 0;
    this.compareFn = compareFn;
  }

  size = () => this.n;

  max = () => this.pq[1];

  insert = (val: any) => {
    this.pq[++this.n] = val;
    this.swim(this.n);
  };

  delMax = () => {
    const max = this.pq[1];
    this.swap(1, this.n--);
    this.sink(1);
    this.pq.length--; // for garbage collection
    return max;
  };

  private swim = (k: number) => {
    while (k > 1 && this.less(~~(k / 2), k)) {
      this.swap(~~(k / 2), k);
      k = ~~(k / 2);
    }
  };

  private sink = (k: number) => {
    while (2 * k <= this.n) {
      let j = 2 * k;
      if (j < this.n && this.less(j, j + 1)) j++;
      if (this.less(j, k)) break;
      this.swap(j, k);
      k = j;
    }
  };

  private less = (i: number, j: number) => {
    if (!this.compareFn) return this.pq[i] < this.pq[j];
    return this.compareFn(this.pq[i], this.pq[j]) < 0;
  };

  private swap = (i: number, j: number) => {
    [this.pq[i], this.pq[j]] = [this.pq[j], this.pq[i]];
  };
}

/**
 * root:
 *
 *       7
 *      / \
 *     3  16
 *        / \
 *       9   20
 */
const root = new TreeNode(7);
root.left = new TreeNode(3);
root.right = new TreeNode(16);
root.right.left = new TreeNode(9);
root.right.right = new TreeNode(20);

console.log(closestKValues2(root, 9, 3)); // [9, 7, 3]
