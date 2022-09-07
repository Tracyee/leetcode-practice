# Closest Binary Search Tree Value II

| approach                                       | time              | space |
| :--------------------------------------------- | :---------------- | :---- |
|Inorder traversal + Sort                        | O(n) + O(n log n) | O(n)  |
|Inorder traversal + hinary heap (priority queue)| O(n log k)        | O(k)  |
|Inorder traversal + queue                       | O(n)              | O(k)  |

## Explanation for the approach #3

The trend for `abs(node.val - target)` during the **inorder** traversal is like:

```shell
        *
       *
  *   *
   * *
    *(the closest one)
```

For example, for the following tree:

```shell
    7
   / \
  1  16
     / \
    9   20
          \
           25
```

`closestKValues(root, 9, 3)` will give the following trend for `abs(node.val - target)` and the trace of the result is: `[1] -> [1,7] -> [1,7,9] -> [7,9,16] (final result)`.

```shell
       25(farther than 7)
  1   20(farther than 7)
   7 16(closer than 1)
    9(the closest one)
```
