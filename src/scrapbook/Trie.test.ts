import * as Trie from './Trie';

describe('Trie', () => {
  it('adding nodes', () => {
    let trie = Trie.create();
    // trie.add(['a'], 'a.value');
    // trie.add(['a', 'b', 'c'], 'abc.value');
    trie = trie.add(['a']);
    trie = trie.add(['b']);
    trie = trie.add(['c']);
    trie = trie.add(['a', 'b', 'c']);
    // trie.add(['c', 'a', 'p']);
    // trie.add(['c', 'a', 't']);

    expect(trie).toEqual({});

    // expect(trie.toJson()).toEqual({
    //   a: {
    //     _value: 'a.value',
    //     _next: {
    //       b: {
    //         _next: {
    //           c: { _value: 'abc.value' },
    //         },
    //       },
    //     },
    //   },
    // });
  });

  // describe('updating nodes')
  // describe('reading nodes')
  // describe('deleting nodes')
});

// describe('Trie', () => {
//   let trie;

//   beforeEach(() => {
//     trie = Trie.fromJson({
//       abc: 1,
//       ab: 2,
//       abd: 4,
//       fgh: 0,
//     });
//   });

//   it('returns the value of existing key', () => {
//     expect(trie.get(['a', 'b', 'd']).value).toBe(4);
//     expect(trie.get(['a', 'b']).value).toBe(2);
//   });

//   it('returns undefined for non-existing keys', () => {
//     expect(trie.get(['a', 'a'])).toBeUndefined();
//     expect(trie.get(['a', 'b', 'c', 'd'])).toBeUndefined();
//   });

//   it('supports partially traverse the tree', () => {
//     const node = trie.get(['a', 'b']);
//     expect(node.get(['c']).value).toBe(3);
//     expect(
//       trie
//         .get(['a'])
//         .get(['b'])
//         .get(['d'])
//         .value
//     ).toBe(4);
//   });

//   // because we support partial traversal - think partial fn application
//   it('returns the node itself for empty keyparts', () => {
//     expect(trie.get([])).toEqual(trie);
//   });
// });

const transactions = [['abc', 2], ['ad', 10], ['ab', 4]];

const json = {
  abc: 2,
  ad: 10,
  ab: 4,
};
