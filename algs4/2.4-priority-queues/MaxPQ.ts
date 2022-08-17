/**
 * The `MaxPQ` class represents a priority queue of generic keys.
 * It supports the usual *insert* and *delete-the-maximum*
 * operations, along with methods for peeking at the maximum key,
 * testing if the priority queue is empty, and iterating through
 * the keys.
 *
 * @author Yi Cai
 *
 * @param [Key] the generic type of key on this priority queue
 */
export default interface MaxPQ<Key> {
  /**
   * Returns true if this priority queue is empty.
   *
   * @return `true` if this priority queue is empty; `false` otherwise
   */
  isEmpty: () => boolean;

  /**
   * Returns the number of keys on this priority queue.
   *
   * @return the number of keys on this priority queue
   */
  size: () => number;

  /**
   * Returns a largest key on this priority queue.
   *
   * @return a largest key on this priority queue
   * @throws {@link NoSuchElementException} if this priority queue is empty
   */
  max: () => Key;

  /**
   * Adds a new key to this priority queue.
   *
   * @param [x] the new key to add to this priority queue
   */
  insert: (x: Key) => void;

  /**
   * Removes and returns a largest key on this priority queue.
   *
   * @return a largest key on this priority queue
   * @throws {@link NoSuchElementException} if this priority queue is empty
   */
  delMax: () => Key;

  /**
   * Returns an iterator that iterates over the keys on this priority queue
   * in descending order.
   * The iterator doesn't implement `remove()` since it's optional.
   *
   * @return an iterator that iterates over the keys in descending order
   */
  [Symbol.iterator](): Iterator<Key>;
}
