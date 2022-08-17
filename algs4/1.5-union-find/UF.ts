/**
 * The `UF` interface represents a *union–find data type*
 *  (also known as the *disjoint-sets data type*).
 *  It supports the classic *union* and *find* operations,
 *  along with a *count* operation that returns the total number
 *  of sets.
 *
 * The union–find data type models a collection of sets
 * containing *n* elements, with each element in exactly one set.
 * The elements are named 0 through *n*–1.
 * Initially, there are *n* sets, with each element in its own set.
 * The *canonical element* of a set
 * (also known as the *root*, *identifier*, *leader*, or *set representative*)
 * is one distinguished element in the set.
 *
 * Here is a summary of the operations:
 * - *find*(*p*) returns the canonical element
 *     of the set containing *p*. The *find* operation
 *     returns the same value for two elements if and only if
 *     they are in the same set.
 * - *union*(*p*, *q*) merges the set
 *     containing element *p* with the set containing
 *     element *q*. That is, if *p* and *q*
 *     are in different sets, replace these two sets
 *     with a new set that is the union of the two.
 * - *count*() returns the number of sets.
 *
 * The canonical element of a set can change only when the set
 * itself changes during a call to *union*; it cannot
 * change during a call to either *find* or *count*.
 *
 * @author Yi Cai
 */
export default interface UF {
  /**
   * @returns `true` if `p` and `q` are in the same set.
   */
  connected: (p: number, q: number) => boolean;

  /**
   * Add connection between `p` and `q`.
   */
  union: (p: number, q: number) => void;

  /**
   * Returns the number of sets.
   *
   * @return the number of sets in the union-find data structure.
   */
  count: () => number;
}
