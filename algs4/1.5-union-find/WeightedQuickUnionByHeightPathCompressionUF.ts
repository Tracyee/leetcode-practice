import UF from './UF';
import IllegalArgumentException from './illegalArgumentException';

/**
 * This implementation uses *weighted quick union by height*
 *  with full path compression.
 *  The constructor takes &Theta;(*n*), where *n*
 *  is the number of elements.
 *  The *union* and *find*
 *  operations take &Theta;(log *n*) time in the worst
 *  case. The *count* operation takes &Theta;(1) time.
 *
 * Moreover, starting from an empty data structure with *n* sites,
 * any intermixed sequence of *m* *union* and *find*
 * operations takes *O*(*m* &alpha;(*n*)) time,
 * where &alpha;(*n*) is the inverse of
 * [Ackermann's function]("https://en.wikipedia.org/wiki/Ackermann_function#Inverse").
 *
 * For additional documentation,
 * see [Section 1.5]("https://algs4.cs.princeton.edu/15uf") of
 * *Algorithms, 4th Edition* by Robert Sedgewick and Kevin Wayne.
 *
 */
class WeightedQuickUnionByHeightPassCompressionUF implements UF {
  /**
   * The nodes of the union-find data structure, which is an integer array `id[]` of length `N`.
   *
   * **Interpretation**: `id[i]` is parent of `i` (and hence the root of `i` is `id[id[id[...id[i]...]]]`).
   * Two nodes are in the same set iff their share the same root.
   */
  private id: number[];

  /**
   * **Interpretation**: `height[i]` = height of subtree rooted at i
   *
   * Needed to balance the trees by linking root of smaller tree to root of larger tree
   */
  private height: number[];
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
    this.height = Array(size).fill(0);
    this.numSet = size;
  }

  connected = (p: number, q: number) =>
    // check if `p` and `q` have same root (depth of `p` and `q` array accesses)
    this.findRootHalving(this.id[p]) === this.findRootHalving(this.id[q]);

  // takes time proportional to height of p and q, where
  // the height of any node is at most lg N.
  // **proof:** When does height of x increase?
  // A union operation between nodes in different trees either
  // leaves the height unchanged (if the two trees have different heights)
  //  or increase the height of a tree by **one** (if the two trees have the same height)
  // - prove by induction that that the size of the tree is at least 2^height.
  //  Therefore, the height can increase at most lg n times.
  union = (p: number, q: number) => {
    const rootP = this.findRootHalving(p);
    const rootQ = this.findRootHalving(q);
    if (rootP == rootQ) return;

    // make shorter root point to taller one
    if (this.height[rootP] < this.height[rootQ]) this.id[rootP] = rootQ;
    else if (this.height[rootP] > this.height[rootQ]) this.id[rootQ] = rootP;
    else {
      this.id[rootP] = rootQ;
      ++this.height[rootQ];
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
   * Returns the canonical element of the set containing `p`.
   *
   * @param [p] a node in the data structure
   * @return the canonical element of the set containing `p`
   * @throws {@link IllegalArgumentException} unless `0 <= p < n`
   */
  private findRoot = (p: number) => {
    this.validate(p);
    let root = p;
    while (root != this.id[root]) root = this.id[root];
    // constant extra time to set the root of the nodes along the path to *root*
    while (p != root) {
      const newp = this.id[p];
      this.id[p] = root;
      p = newp;
    }
    return root;
  };

  /**
   * The same as {@link findRoot} but using "halving" trick:
   * make every other node in path point to its grandparent (thereby halving path length))
   *
   * @param [node] a node in the data structure
   * @return the canonical element of the set containing `node`
   * @throws {@link IllegalArgumentException} unless `0 <= node < n`
   */
  private findRootHalving = (node: number) => {
    this.validate(node);
    while (node !== this.id[node]) {
      this.id[node] = this.id[this.id[node]]; // path compression by halving
      node = this.id[node];
    }
    return node;
  };
}

export default WeightedQuickUnionByHeightPassCompressionUF;
