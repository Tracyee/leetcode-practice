/**
 * Data structure for union-find
 */
export default interface UF {
  /**
   * @returns `true` if `a` and `b` are in the same component.
   */
  connected: (a: number, b: number) => boolean;

  /**
   * Add connection between `a` and `b`.
   */
  union: (a: number, b: number) => void;
}
