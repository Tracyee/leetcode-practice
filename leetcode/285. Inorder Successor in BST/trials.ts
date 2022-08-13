/**
 * Definition for a binary tree node.
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  parent: TreeNode | null;
  constructor(
    val?: number,
    left?: TreeNode | null,
    right?: TreeNode | null,
    parent?: TreeNode | null,
  ) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.parent = parent ?? null;
  }
}

/**
 *
 * once again!! my favorite simple solution using javascript generator
 * however, it's O(n) in the worst case
 */
function inorderSuccessor(root: TreeNode | null, p: TreeNode): TreeNode | null {
  function* inorderGenerator(
    root: TreeNode | null,
  ): IterableIterator<TreeNode> {
    if (root) {
      yield* inorderGenerator(root.left);
      yield root;
      yield* inorderGenerator(root.right);
    }
  }

  const gen = inorderGenerator(root);
  let curr: IteratorResult<TreeNode, any>;
  do {
    curr = gen.next();
    if (curr.value === p.val) {
      const next = gen.next();
      return next.done ? null : next.value;
    }
  } while (!curr.done);

  return null; // p not found
}

/**
 *
 * approach using parent pointer:
 * run in O(h) in the worst case, where h is the height of the tree
 *
 * **explanation**:
 * * if `p` has a right child, then its inorder successor is
 *  the leftmost child of `p`'s right subtree
 * * if `p` has no right child, then `p` is the right-most (max) of some sub-BST,
 *  so `p`'s inorder successor is the first ancestor that
 *  contains `p` in its left subtree, or otherwise null
 */
function inorderSuccessor2(
  root: TreeNode | null,
  p: TreeNode,
): TreeNode | null {
  if (p.right) {
    let succ: TreeNode | null = p.right;
    while (succ.left) {
      succ = succ.left;
    }
    return succ;
  }

  let parent: TreeNode | null = p.parent;
  let curr = p;
  while (parent && parent.right === curr) {
    // break if `curr` is the left child of `parent`
    curr = parent;
    parent = parent.parent;
  }

  return parent;
}

/**
 * a search-like approach:
 * run in O(h) in the worst case, where h is the height of the tree
 */
function inorderSuccessor3(
  root: TreeNode | null,
  p: TreeNode,
): TreeNode | null {
  let curr: TreeNode | null = root;
  let succ: TreeNode | null = null;
  while (curr) {
    if (curr.val > p.val) {
      // curr might be the successor, but only when no other node
      // in `curr`'s left subtree has a greater value than `p`
      succ = curr;
      curr = curr.left;
    } else {
      // `curr` cannot be the successor, keep searching right
      curr = curr.right;
    }
  }
  return succ;
}

/**
 * a search-like approach using recursion:
 * run in O(h) in the worst case, where h is the height of the tree
 */
function inorderSuccessor3Rec(
  root: TreeNode | null,
  p: TreeNode,
): TreeNode | null {
  if (!root) return null;
  if (root.val > p.val) {
    // now root might be the successor, but only when no other node
    // in root's left subtree has a greater value than `p`
    const succ = inorderSuccessor3Rec(root.left, p);
    return succ ? succ : root;
  } else {
    return inorderSuccessor3Rec(root.right, p);
  }
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
root.left = new TreeNode(2, null, null, root);
root.right = new TreeNode(6, null, null, root);
root.left.left = new TreeNode(1, null, null, root.left);
root.left.right = new TreeNode(3, null, null, root.left);
root.right.left = new TreeNode(5, null, null, root.right);
root.right.right = new TreeNode(7, null, null, root.right);

console.log(inorderSuccessor3Rec(root, root.left.right)?.val);
