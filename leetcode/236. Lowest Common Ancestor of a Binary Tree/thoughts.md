# Lowest Common Ancestor of a Binary Tree

> Define the LCA of a Binary Tree to be `p` when only one of the children (`p`) is found in the tree.
> Define the LCA of a Binary Tree to be `null` when neither `p` nor `q` is found in the tree.

## Base case

Height of the BT is 1

e.g.

```bash
  r
 / \
p   q
```

Easy solution:

```ts
function lca1(
  root: TreeNode,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  // find both p and q with root
  if (root.left === p && root.right === q ||
      root.left === q && root.right === p) return root;

  // find p with root
  if (root === p || root.left === p || root.right === p) return p;

  // find q with root
  if (root === q || root.left === q || root.right === q) return q;

  // neither p nor q are found
  return null;
}
```

## Inductive step

if `lca2` is `true` for BT with height *n*,
then `lca2` is `true` for BT with height *n+1*.

Put it in another word: if `lca2` is `true` for both
the left and right sub-BTs of `root`, then `lca2`
is `true` for the BT with `root`.
e.g. consider the following binary tree:

```bash
     1
    / \
  2     3
 / \   / \
4   5 6   7
```

Cases:

* `TreeNode(2)` is the lca:
  if `lca2((2), (4), (5))` is `true`,
  and `lca2((3), (4), (5))` is `true`,
  then `lca2((1), (4), (5))` is `true`.
* `TreeNode(3)` is the lca:
  If `lca2((2), (6), (7))` is `true`,
  and `lca2((3), (6), (7))` is `true`,
  then `lca2((1), (6), (7))` is `true`.
* `TreeNode(1)` is the lca:
  If `lca2((2), (4), (7))` is `true`,
  and `lca2((3), (4), (7))` is `true`,
  then `lca2((1), (4), (7))` is `true`.

Code from the intuition (pre-order traversal):

```ts
function lca2(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
 ): TreeNode | null {
  if (root === p || root === q) return root;
  if (root === null) return null;  
  
  const left  = lca2(root.left, p, q);
  const right = lca2(root.right, p, q);
   
  if (left !== null && right !== null) return root;
  return !left ? right : left;
 }
```

This piece of code can be proved to be true with [structural induction](https://en.wikipedia.org/wiki/Structural_induction).
