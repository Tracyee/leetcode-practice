/**
 * Definition for a binary tree node.
 */
export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

/**
 * 
 * Nothing special. 
 * 
 * "*print*" version:
 * 
 *     function inorderTraversal(root: TreeNode | null): void {
 *       if (root === null) return;
 *       inorderTraversal(root.left);
 *       console.log(root.val);
 *       inorderTraversal(root.right);
 *     }
 */
function inorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = [];
  
  function helper(root: TreeNode | null) {

    if (root === null) return;

    helper(root.left);
    res.push(root.val);
    helper(root.right);
  }

  helper(root);

  return res;
};

function inorderTraversalIter(root: TreeNode | null): number[] {
  if (root === null) return [];

  const res: number[] = [];
  const stack: TreeNode[] = [];
  let current: TreeNode | null = root;

  while (stack.length > 0 || current) {
    if (current) {
      stack.push(current);
      // res.push(current.val)  // preorder traversal
      current = current.left;
    } else {
      current = stack.pop() as TreeNode;
      res.push(current.val)  // inorder traversal
      current = current.right
    }
  }

  return res;
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

console.log("inorderTraversal of root: " + inorderTraversal(root));
