import UF from './UF';
import IllegalArgumentException from './illegalArgumentException';

/**
 * This implementation uses *weighted quick union by size*
 *  (without path compression).
 *  The constructor takes &Theta;(*n*), where *n*
 *  is the number of elements.
 *  The *union* and *find*
 *  operations take &Theta;(log *n*) time in the worst
 *  case. The *count* operation takes &Theta;(1) time.
 *
 * For additional documentation,
 * see [Section 1.5]("https://algs4.cs.princeton.edu/15uf") of
 * *Algorithms, 4th Edition* by Robert Sedgewick and Kevin Wayne.
 *
 */
class WeightedQuickUnionUF implements UF {
  /**
   * The nodes of the union-find data structure, which is an integer array `id[]` of length `N`.
   *
   * **Interpretation**: `id[i]` is parent of `i` (and hence the root of `i` is `id[id[id[...id[i]...]]]`).
   * Two nodes are in the same set iff their share the same root.
   */
  private id: number[];

  /**
   * **Interpretation**: `size[i]` = number of elements in subtree rooted at `i`
   *
   * Needed to balance the trees by linking root of smaller tree to root of larger tree
   */
  private size: number[];
  private numSet: number; // number of sets

  /**
   * Initialize union-find data structure with `N` nodes (`0` to `N – 1`).
   * Initially, each element is in its own set.
   *
   * @constructor
   * @param {number} size the number of nodes
   * @throws {@link IllegalArgumentException} if `size < 0`
   */
  constructor(size: number) {
    if (size < 0)
      throw new IllegalArgumentException('size must be greater than zero');
    this.id = Array.from(Array(size).keys());
    this.size = Array(size).fill(1);
    this.numSet = size;
  }

  connected = (p: number, q: number) =>
    // check if `p` and `q` have same root (depth of `p` and `q` array accesses)
    this.findRootIter(this.id[p]) === this.findRootIter(this.id[q]);

  // takes time proportional to depth of p and q, where
  // the depth of any node is at most lg N.
  // **proof:** When does depth of x increase?
  // Increases by 1 when tree T1 containing x is merged into another tree T2.
  // - The size of the tree containing x at least doubles since | T2 | >= | T1 |.
  // - The size of tree containing x can double at most lg N times
  union = (p: number, q: number) => {
    const rootP = this.findRootIter(p);
    const rootQ = this.findRootIter(q);
    if (rootP == rootQ) return;

    // make smaller root point to larger one
    if (this.size[rootP] < this.size[rootQ]) {
      this.id[rootP] = rootQ;
      this.size[rootQ] += this.size[rootP];
    } else {
      this.id[rootQ] = rootP;
      this.size[rootP] += this.size[rootQ];
    }
    --this.numSet;
  };

  count = () => this.numSet;

  /**
   * Validate that `p `is a valid index
   */
  private validate(p: number) {
    const n = this.id.length;
    if (p < 0 || p >= n) {
      throw new IllegalArgumentException(
        'index ' + p + ' is not between 0 and ' + (n - 1),
      );
    }
  }

  /**
   * Returns the canonical element of the set containing `node`.
   *
   * @param [node] a node in the data structure
   * @return the canonical element of the set containing `node`
   * @throws {@link IllegalArgumentException} unless `0 <= node < n`
   */
  private findRoot = (node: number): number => {
    if (node === this.id[node]) return node;
    return this.findRoot(this.id[node]);
  };

  /**
   * The same as {@link findRoot} but using iteration approach instead of recursive approach.
   * @param [node] a node in the data structure
   * @return the canonical element of the set containing `node`
   */
  private findRootIter = (node: number) => {
    this.validate(node);
    while (node !== this.id[node]) node = this.id[node];
    return node;
  };
}

export default WeightedQuickUnionUF;
