import UF from './UF';

/**
 * An implementation of union-find using quick find.
 *
 * **NOTE:** This is a bad implementation (do not scale)
 */
class QuickFindUF implements UF {
  /**
   * The nodes of the union-find data structure, which is an integer array `id[]` of length `N`.
   *
   * **Interpretation**: node `a` and `b` are connected iff they have the same `id`.
   */
  private id: number[];

  /**
   * Initialize union-find data structure with `N` nodes (`0` to `N – 1`)
   *
   * @constructor
   * @param {number} size the number of nodes
   */
  constructor(size: number) {
    this.id = [...Array(size).keys()];
  }

  connected = (a: number, b: number) => this.id[a] === this.id[b];

  // N^2 (quadratic) array accesses to process a sequence of N union commands on N nodes.
  union = (a: number, b: number) => {
    // Changing all entries whose `id` equals `id[a]` to `id[b]`.
    this.id.forEach((_, idx, id) => {
      if (id[idx] === id[a]) id[idx] = id[b];
    });
  };
}

export default QuickFindUF;
