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
 *     function postorderTraversal(root: TreeNode | null): void {
 *       if (root === null) return;
 *       postorderTraversal(root.left);
 *       postorderTraversal(root.right);
 *       console.log(root.val);
 *     }
 */
function postorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = [];
  
  function helper(root: TreeNode | null) {

    if (root === null) return;

    helper(root.left);
    helper(root.right);
    res.push(root.val);
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

console.log("postorderTraversal of root: " + postorderTraversal(root));
