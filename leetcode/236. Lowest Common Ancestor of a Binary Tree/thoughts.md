# Lowest Common Ancestor of a Binary Tree

## The trick

> Define the LCA of a Binary Tree to be `p` when only one of the children (`p`) is found in the tree.
> Define the LCA of a Binary Tree to be `null` when neither `p` nor `q` is found in the tree.

## Base case

It's natural to do induction on the height of the tree. Let's give it a try.

**Base case**: height of the BT is 1

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
then `lca2` is `true` for BT with height *n+1*? Kind of unintuitive for this question.

Actually, for this question it's more suited to think about the inductive step first, as it will natually help come up with the appropriate base cases.

**Easy inductive step**: if `lca2` is `true` for both the left and right sub-BTs of `root`, then `lca2` is `true` for the BT with `root`.

Cases:

1. The lca is found in one of the sub-BTs: the lca of the root is just the lca of that sub-BT
2. The lca is found in both of the sub-BTs: the lca of the root is the root itself
3. The lca is found in neither of the sub-BTs: the lca of the root is null

e.g. consider the following binary tree:

```bash
     1
    / \
  2     3
 / \   / \
4   5 6   7
```

* `TreeNode(2)` is the lca:
  if `lca2((2), (4), (5)) --> (2)` is `true`,
  and `lca2((3), (4), (5)) --> (null)` is `true`,
  then `lca2((1), (4), (5)) --> (2)` is `true`.
* `TreeNode(3)` is the lca:
  If `lca2((2), (6), (7)) --> (null)` is `true`,
  and `lca2((3), (6), (7)) --> (3)` is `true`,
  then `lca2((1), (6), (7)) --> (3)` is `true`.
* `TreeNode(1)` is the lca:
  If `lca2((2), (4), (7)) --> (4)` is `true`,
  and `lca2((3), (4), (7)) --> (7)` is `true`,
  then `lca2((1), (4), (7)) --> (1)` is `true`.
* `null` is the lca:
  If `lca2((2), (8), (9)) --> (null)` is `true`,
  and `lca2((3), (8), (9)) --> (null)` is `true`,
  then `lca2((1), (8), (9)) --> (null)` is `true`.

From here, we can probably come up with the base case: when lca is found to be the root (root is equal to p or q), the root is the lca.

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

## Conclusion

1. Clearly a recursive problem so think about induction to help structure the solution
2. No clear base case so start with the inductive step: the algorithm holds for both children --> the algorithm holds for the root
3. Inductive step cases:

* most intuitive case: without loss of generality, the lca is found in left sub-treerooted at the left child --> both `p` and `q` are found in the left sub-tree -->`lca` must return `null` for the right sub-tree rooted at the right child --> the lca found in the left sub-tree will be the lca of the root
* when lca is not found, but one of `p` and `q` is found in the left sub-tree, and one of `p` and `q` is found in the right sub-tree --> the root will be the lca.

> This is the point when we want to introduce the [*trick*](#the-trick), because otherwise we would have no definition for the "trueness" of `lca` when it finds only one of `p` and `q`.

* when lca is not found for both children (both `p` and `q` are not found in either the left sub-tree or the right sub-tree), the lca is not found for the root (actually already covered in the first case after introducing the trick)

With these in mind we can write the following code:

```shell
fun lca (root, p, q) {
  (* base cases... *)

  left  = lca(root.left, p, q);
  right = lca(root.right, p, q);

  (* now left/right are both true result by definition, and can be both non-null, only one null, or both null *)

  if (left && right) return root;  (* both non-null *)
  if left then return left else return right;  (* only one null or both null *)
}
```

Hence, we want the base cases to return `null` when lca didn't find either `p` or `q`, and otherwise return `p` or `q` when they are found.

Mission accomplished.