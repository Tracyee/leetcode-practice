import UF from './UF';
import IllegalArgumentException from './illegalArgumentException';

/**
 * This implementation uses *quick find*.
 * The constructor takes &Theta;(*n*) time, where *n* is the number of sites.
 * The *find*, *connected*, and *count* operations take &Theta;(1) time;
 * the *union* operation takes &Theta;(*n*) time.
 *
 * For additional documentation,
 * see [Section 1.5]("https://algs4.cs.princeton.edu/15uf") of
 * *Algorithms, 4th Edition* by Robert Sedgewick and Kevin Wayne.
 */
class QuickFindUF implements UF {
  /**
   * The nodes of the union-find data structure, which is an integer array `id[]` of length `N`.
   *
   * **Interpretation**: node `p` and `q` are connected iff they have the same `id`.
   */
  private id: number[];
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
    this.id = [...Array(size).keys()];
    this.numSet = size;
  }

  connected = (p: number, q: number) => {
    this.validate(p);
    this.validate(q);

    return this.id[p] === this.id[q];
  };

  // N^2 (quadratic) array accesses to process a sequence of N union commands on N nodes.
  union = (p: number, q: number) => {
    this.validate(p);
    this.validate(q);

    const pID = this.id[p]; // needed for correctness
    const qID = this.id[q]; // to reduce the number of array accesses

    // p and q are already in the same component
    if (pID == qID) return;

    // Changing all entries whose `id` equals `id[p]` to `id[q]`.
    this.id.forEach((_, idx, id) => {
      if (id[idx] === pID) id[idx] = qID;
    });
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
}

export default QuickFindUF;
