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
 * Output a 2-d list representation of the *zigzag* level order traversal
 * using general BFS (queue based) but with additional inner loop
 */
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  const keys: number[][] = [];
  const queue: (TreeNode | null)[] = []; // should be a *doubly linked list* to be efficient
  queue.push(root);
  let left2Right = true;
  while (queue.length) {
    const levelKeys: number[] = [],
      levelWidth = queue.length;
    for (let i = 0; i < levelWidth; i++) {
      const x = queue.shift();
      if (!x) continue;
      if (left2Right) levelKeys.push(x.val);
      else levelKeys.unshift(x.val); // reverse order
      queue.push(x.left);
      queue.push(x.right);
    }
    // if (!left2Right) levelKeys.reverse();  // "brute force" approach
    if (levelKeys.length) keys.push(levelKeys);
    left2Right = !left2Right;
  }
  return keys;
}

/**
 *
 * Output a 2-d list representation of the *zigzag* level order traversal
 * using modified preorder traversal
 */
function zigzagLevelOrder2(root: TreeNode | null): number[][] {
  const keys: number[][] = [];
  const preord = (node: TreeNode | null, depth: number) => {
    if (!node) return;
    if (!keys[depth]) {
      keys.push([]);
    }
    if (depth % 2 === 0) keys[depth].push(node.val);
    else keys[depth].unshift(node.val); // reverse order
    preord(node.left, depth + 1);
    preord(node.right, depth + 1);
  };
  preord(root, 0); // important: depth must start from 0
  return keys;
}

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

console.log(zigzagLevelOrder2(root));
