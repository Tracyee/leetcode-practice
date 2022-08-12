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

/**
 *
 * buggy program
 */
function isValidBSTBuggy(root: TreeNode | null): boolean {
  let valid = true;
  const helper = (root: TreeNode | null) => {
    if (!root) return null;
    if (root.left && root.left.val >= root.val) valid = false;
    if (root.right && root.right.val <= root.val) valid = false;
    helper(root.left);
    helper(root.right);
  };
  helper(root);
  return valid;
}

/**
 *
 * pseudo code:
 *
 *     function isValidBST(root: TreeNode | null): boolean {
 *       if (!root) return true;
 *       if (root.val <= maxVal(root.left) || root.val >= minVal(root.right))
 *         return false;
 *       return isValidBST(root.left) && isValidBST(root.right);
 *     }
 *
 */
const pseudoIsValidPST = () => {};


/**
 * 
 * clever solution: since that the `maxVal` of the left subtree must be less than
 * the root and the `minVal` of the right subtree must be greater than the root,
 * `root.val > maxVal(root.left)` is really just equivalent to: for each left
 * descedent of root `l`, `root.val > l.val`. Similarly, for each right descedent
 * of root `r`, `root.val < r.val`.
 */
function isValidBST(root: TreeNode | null): boolean {
  const helper = (
    root: TreeNode | null,
    min = -Infinity,
    max = Infinity,
  ): boolean => {
    if (!root) return true;
    if (root.val >= max || root.val <= min) return false;
    return (
      helper(root.left, min, root.val) && helper(root.right, root.val, max)
    );
  };

  return helper(root);
}

/**
 * root:
 *
 *          4
 *         / \
 *        2   6
 *       / \ / \
 *      1  3 5  7
 */
const root = new TreeNode(4);
root.left = new TreeNode(2);
root.right = new TreeNode(6);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(7);

console.log(isValidBST(root));
