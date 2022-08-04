function lca(r: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  
  let found = false;

  function helper(r: TreeNode | null, p: TreeNode | null, q: TreeNode | null, found: boolean): TreeNode | null {
    
    if (r === p || r === q) return r;
    if (r === null) return null;  
    
    const left  = found ? null : helper(r.left, p, q, found);
    const right = found ? null : helper(r.right, p, q, found);
     
    if (left !== null && right !== null) {
      found = true;  // to make stop earlier
      return r;
    }
    return !left ? right : left;

  }

  return helper(r, p, q, found);
};
