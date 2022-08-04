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
  
  // base case: find p or q in root
  if (root === p || root === q) {
    return root;
  }

  if (root === null) return null;

  const left = lowestCommonAncestor(root.left, p, q);
  // console.log("left: " + left?.val);
  const right = lowestCommonAncestor(root.right, p, q);
  // console.log("right: " + right?.val);
  
  // find both p and q with root
  if (left !== null && right !== null) return root;

  // find p or q in the left sub-tree 
  if (left !== null) return left;

  // find p or q in the right sub-tree
  if (right !== null) return right;

  // neither p nor q are found
  return null;

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
console.log("LCA(4, 5) = " + lowestCommonAncestor(root, root.left.left, root.left.right)?.val);
console.log("LCA(4, 6) = " + lowestCommonAncestor(root, root.left.left, root.right.left)?.val);
console.log("LCA(3, 4) = " + lowestCommonAncestor(root, root.right, root.left.left)?.val);
console.log("LCA(2, 4) = " + lowestCommonAncestor(root, root.left, root.left.left)?.val);