import { Empty, Leaf, Branch } from './Tree';

describe('Data.Tree', () => {
  it('..', () => {
    const tree = new Branch([
      new Leaf(),
      new Leaf(),
      new Branch([new Empty()]),
      new Branch([new Branch([new Empty()])]),
      new Branch([new Branch([new Leaf()])]),
    ]);

    expect(tree.depth()).toBe(4);
  });
});
