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

function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let current: TreeNode | null = root;
  let count = 0;
  while (stack.length > 0 || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop() as TreeNode;
    count++;
    if (count === k) return current.val;
    current = current.right;
  }
}

/**
 *
 * again, my favorite solution using javascript generator
 */
function kthSmallest2(root: TreeNode | null, k: number) {
  function* inorderGenerator(root: TreeNode | null): IterableIterator<number> {
    if (root) {
      yield* inorderGenerator(root.left);
      yield root.val;
      yield* inorderGenerator(root.right);
    }
  }

  const gen = inorderGenerator(root);
  k--;
  while (k-- && !gen.next().done) {}

  return gen.next().value;
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

console.log(kthSmallest2(root, 5));
