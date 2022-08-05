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
 *     function preorderTraversal(root: TreeNode | null): void {
 *       if (root === null) return;
 *       console.log(root.val);
 *       preorderTraversal(root.left);
 *       preorderTraversal(root.right);
 *     }
 */
function preorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = [];
  
  function helper(root: TreeNode | null) {

    if (root === null) return;

    res.push(root.val);
    helper(root.left);
    helper(root.right);
  }

  helper(root);

  return res;
};

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

console.log("preorderTraversal of root: " + preorderTraversal(root));
