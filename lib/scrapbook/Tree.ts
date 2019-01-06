interface Tree {
  depth(): number;
}

export class Empty implements Tree {
  depth() {
    return 0;
  }
}

export class Leaf implements Tree {
  depth() {
    return 1;
  }
}

export class Branch implements Tree {
  constructor(private children: Array<Tree>) {}

  depth() {
    return 1 + Math.max(...this.children.map(c => c.depth()));
  }
}

export function depth(tree: Tree) {
  return tree.depth();
}
