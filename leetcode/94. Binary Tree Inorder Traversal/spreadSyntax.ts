import { TreeNode } from './trials';

function inorderTraversal(root: TreeNode | null): number[] {
  if (root === null) return [];

  return [
    ...inorderTraversal(root.left),
    root.val,
    ...inorderTraversal(root.right),
  ];
}

/**
 *      1
 *    2   3
 *   4 5 6 7
 */
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

console.log('inorderTraversal of root: ' + inorderTraversal(root));
