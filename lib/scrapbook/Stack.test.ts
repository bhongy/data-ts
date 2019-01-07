import * as Stack from './Stack';

describe('Stack', () => {
  describe('empty', () => {
    let emptyStack: Stack.Stack;
    beforeEach(() => {
      emptyStack = Stack.empty();
    });

    it('has 0 depth', () => {
      expect(emptyStack.depth).toEqual(0);
    });

    // it('pushes fine')
    // it('throws EmptyStackError when top')
    // it('throws EmptyStackError when pop')
  });
});
