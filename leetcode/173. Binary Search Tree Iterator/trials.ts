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
 * O(1) time, O(n) space
 */
class BSTIterator1 {
  inorderList: number[]
  current: number
  size: number
  constructor(root: TreeNode | null) {

    this.inorderList = [];

    const inorderTraversal = (root: TreeNode | null) => {
      if (root === null) return;
      inorderTraversal(root.left);
      this.inorderList.push(root.val);
      inorderTraversal(root.right);
    }

    inorderTraversal(root);
    this.current = 0;
    this.size = this.inorderList.length;
  }

  next(): number {
    return this.inorderList[this.current++];
  }

  hasNext(): boolean {
    return this.current !== this.size;
  }
}

/**
 * mimic exactly what the `inorderTraversalIter` does.
 * O(1) amortized time, O(h) space
 * 
 * explaination: every time we call `next()`, we pop from 
 * the stack and in fact there are only *n* nodes in the 
 * tree so we can only `push()` and `pop()` *n* times
 */
class BSTIterator2 {
  stack: TreeNode[]
  current: TreeNode | null
  constructor(root: TreeNode | null) {
    this.stack = [];
    this.current = root;
  }
  
  next(): number {
    while (this.current) {
      this.stack.push(this.current);
      this.current = this.current.left;
    }
    this.current = this.stack.pop() as TreeNode;
    const res = this.current.val;
    this.current = this.current.right;
    return res;
  }

  hasNext(): boolean {
    return this.stack.length > 0 || this.current !== null;
  }
}

/**
 * My favorite method!
 * 
 * It mimics exactly what the recursive `inorderTraversal` does 
 * but using `javascript`'s generator.
 * 
 * O(1) time, O(h) space
 */
class BSTIterator3 {
  generator: Generator<number>
  current: IteratorResult<number, any> | undefined
  constructor(root: TreeNode | null) {
    this.generator = this.inorderTraversalGenerator(root);
    this.current = this.generator.next();
  }
  
  *inorderTraversalGenerator (node: TreeNode | null) {
    if (!node) return; 
      yield* this.inorderTraversalGenerator(node.left);
      yield node.val;
      yield* this.inorderTraversalGenerator(node.right);
  }

  next(): number {
    const res = this.current?.value;
    this.current = this.generator.next();
    return res;
  }

  hasNext = () => !this.current?.done;
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 */

/** 
 * root:
 *  
 *       7
 *      / \
 *     3  15
 *        / \
 *       9   20
 */
const root = new TreeNode(7);
root.left = new TreeNode(3);
root.right = new TreeNode(15);
root.right.left = new TreeNode(9);
root.right.right = new TreeNode(20);

const obj = new BSTIterator3(root);
console.log(obj.next());
console.log(obj.hasNext());
console.log(obj.next());
console.log(obj.hasNext());
console.log(obj.next());
console.log(obj.next());
console.log(obj.hasNext());
console.log(obj.next());
console.log(obj.hasNext());
