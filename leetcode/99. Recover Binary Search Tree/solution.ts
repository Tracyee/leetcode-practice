import { TreeNode } from './trials';

/**
 *
 * try to find a solution to the similar problem for an "almost sorted" array
 * then just use inorder traversal to get the valid BST
 */
function recoverTree(root: TreeNode | null): void {
  let prev = new TreeNode(-Infinity);
  let first = new TreeNode(NaN);
  let second = new TreeNode(NaN);

  /**
   * inorder traversal to find the first and second wrong nodes
   * that are not in order
   */
  const inorder = (root: TreeNode | null) => {
    if (!root) return;

    inorder(root.left);

    if (root.val <= prev.val) {
      if (Number.isNaN(first.val)) first = prev;
      second = root;
    }
    prev = root;

    inorder(root.right);
  };

  inorder(root);

  // swap the values of the two nodes that are in wrong order
  [first.val, second.val] = [second.val, first.val];
}

/**
 * root:
 *
 *         *5*
 *         / \
 *        2   6
 *       / \ / \
 *      1  3*4* 7
 */
const root = new TreeNode(5);
root.left = new TreeNode(2);
root.right = new TreeNode(6);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(7);

recoverTree(root);
console.log(root);

/**
 * root:
 *
 *          4
 *         / \
 *        2   6
 *       / \ / \
 *      1  3*7* *5*
 */
const root2 = new TreeNode(5);
root2.left = new TreeNode(2);
root2.right = new TreeNode(6);
root2.left.left = new TreeNode(1);
root2.left.right = new TreeNode(3);
root2.right.left = new TreeNode(4);
root2.right.right = new TreeNode(7);

recoverTree(root2);
console.log(root2);
