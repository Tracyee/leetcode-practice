/**
 * Definition for a binary tree node.
 */
class TreeNode {
   val: number
   left: TreeNode | null
   right: TreeNode | null
   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
         this.val = (val===undefined ? 0 : val)
         this.left = (left===undefined ? null : left)
         this.right = (right===undefined ? null : right)
     }
 }
 

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  
  //base case
  if (root === null || root === p || root === q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  
  //result
  if (left === null) {
    return right;
  }
  else if (right === null) {
    return left;
  }
  else { //both left and right are not null, we found our result
    return root;
  }
  
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
console.log("LCA(4, 5) = " + lowestCommonAncestor(root, root.left.left, root.left.right).val);
console.log("LCA(4, 6) = " + lowestCommonAncestor(root, root.left.left, root.right.left).val);
console.log("LCA(3, 4) = " + lowestCommonAncestor(root, root.right, root.left.left).val);
console.log("LCA(2, 4) = " + lowestCommonAncestor(root, root.left, root.left.left).val);