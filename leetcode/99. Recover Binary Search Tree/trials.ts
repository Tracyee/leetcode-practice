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
 * Buggy program...
 * Do not return anything, modify root in-place instead.
 */
function recoverTree(root: TreeNode | null): void {
  const helper = (
    root: TreeNode | null,
    min = new TreeNode(-Infinity),
    max = new TreeNode(Infinity),
  ) => {
    if (!root) return;
    if (root.val >= max.val) [root.val, max.val] = [max.val, root.val];
    if (root.val <= min.val) [root.val, min.val] = [min.val, root.val];
    helper(root.left, min, root);
    helper(root.right, root, max);
  };

  helper(root);
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

console.log(recoverTree(root));
