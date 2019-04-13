/**
 * Trie (Prefix Tree).
 *
 * Thoughts:
 * - need to know if the node is the "value" node
 *   that is whether it is a legitimate lookup result
 * - the "value" node **can** have children
 *
 * Not found when:
 * - no more keys to lookup _and_ it's not a value node
 *   - what about `Root` lookup with no key (`[]`)
 * - more keys to lookup _but_ we're at the `Leaf` node (no children)
 */
import { Maybe, just, nothing } from '../Maybe';

// type Trie<T> = Empty<T> | Value<T>;
// type Children<T> = Map<string, Trie<T>>;

interface INode<T> {
  // do I keep the key or I keep a "match" function
  // match concerns current node
  match(key: string): boolean; // MatchExact, MatchAll
  find(keys: Array<string>): Maybe<T>;
  toJson(): Record<string, T>; // can this be a function (not a method)
  size(): number;

  // _toEmpty (conversion)
  // _toValue (conversion)

  // insert
  // upsert (insert if not existed, otherwise update)

  // keys -> Return all keys in the trie, in sorted order.
  // values -> Return all values in the trie, in sorted order according to the keys.
}

class Trie {
  readonly $$tag = 'Trie';
  constructor(private readonly children: Map<string, Trie>) {}

  // add(keys: Array<string>): Trie {}
}

class Branch {
  readonly $$tag = 'Trie.Branch';
  add(ks: Array<string>) {

  }
}

class Leaf {
  readonly $$tag = 'Trie.Leaf';
  add(keys: Array<string>) {
    const [k, ks] = keys;
    if (ks.length === 0) {
      return new Leaf();
    }
    const new Branch();
  }
}

// Insert ?
// interface Add<T> {
//   (ks: Array<string>, x: T): (root: Trie<T>) => Trie<T>;
//   // (ks: Array<string>, node: Trie<T>): (root: Trie<T>) => Trie<T>;
// }

// remove if no children
// toEmpty if has children
// interface Remove<T> {
//   (ks: Array<string>): (root: Trie<T>) => Trie<T>;
// }

// a creation helper to construct Trie from an object map
// export const fromJson = <T>(rootValue: T, o: Record<string, T>) => {
//   const delimeter = '';
//   const root = new Root(rootValue);
//   Object.entries(o).forEach(([k, v]) => {
//     k.split(delimeter).forEach(keyPart => {});
//   });
// };

// export const toJson = null;

export const create = () => new Trie();
