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
 * output a 1-d list representation of the level order traversal
 * using general BFS (queue based)
 */
function levelOrder1(root: TreeNode | null): number[] {
  const keys: number[] = [];
  const queue: (TreeNode | null)[] = [];
  queue.push(root);
  while (queue.length) {
      const x = queue.shift();
      if (!x) continue;
      keys.push(x.val);
      queue.push(x.left);
      queue.push(x.right);
  }
  return keys;
};

/**
 * 
 * Output a 2-d list representation of the level order traversal
 * using general BFS (queue based) but with additional inner loop
 */
function levelOrder2(root: TreeNode | null): number[][] {
  const keys: number[][] = [];
  const queue: (TreeNode | null)[] = [];
  queue.push(root);
  while (queue.length) {
      const levelKeys: number[] = [], levelWidth = queue.length;
      for (let i = 0; i < levelWidth; i++) {
        const x = queue.shift();
        if (!x) continue;
        levelKeys.push(x.val);
        queue.push(x.left);
        queue.push(x.right);
      }
      if (levelKeys.length) keys.push(levelKeys);
  }
  return keys;
};

/**
 * 
 * Output a 2-d list representation of the level order traversal
 * using modified preorder traversal
 */
function levelOrder3 (root: TreeNode | null): number[][] {
  const keys: number[][] = [];
  const preord = (node: TreeNode | null, depth: number) => {
      if (!node) return;
      if (depth === keys.length) {
          keys.push([]);  // after pushing for each level, the length will be always greater than depth
      }
      keys[depth].push(node.val);
      preord(node.left, depth + 1);
      preord(node.right, depth + 1);
  }
  preord(root, 0);  // important: depth must start from 0
  return keys;
};

/** 
 * root:
 *  
 *          1
 *         / \
 *        2   3
 *       / \ / \
 *      4  5 6  7
 */
 const root = new TreeNode(1);
 root.left = new TreeNode(2);
 root.right = new TreeNode(3);
 root.left.left = new TreeNode(4);
 root.left.right = new TreeNode(5);
 root.right.left = new TreeNode(6);
 root.right.right = new TreeNode(7);

console.log(levelOrder3(root));
