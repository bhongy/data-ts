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

/*
class Trie {
  readonly $$tag = 'Trie';
  constructor(private readonly children: Map<string, Trie>) {}

  add([k, ...ks]: Array<string>): Trie {
    if (k == null) {
      return this;
    }
    const next = this.children.get(k) || create();
    return new Trie(this.children.set(k, next.add(ks)));
  }
}
*/

type Trie = Empty | Branch | Leaf;

interface TrieNodeInterface {
  isEmpty(): boolean;
}

class Empty implements TrieNodeInterface {
  private readonly $$tag = 'Trie.Empty';

  isEmpty(): boolean {
    return true;
  }
}

class Leaf {
  private readonly $$tag = 'Trie.Leaf';
  // constructor(readonly k: string) {}

  // add([k, ...ks]: Array<string>): Trie {
  //   if (k == null) {
  //     return this;
  //   }
  //   const next = leaf(k);
  //   const children = new Map().set(k, next.add(ks));
  //   console.log('leaf', children);
  //   return branch(children);
  // }

  isEmpty(): boolean {
    return false;
  }
}

class Branch {
  // private readonly $$tag = 'Trie.Branch';
  // constructor(/*private*/ readonly children: Map<string, Trie>) {}

  // add([k, ...ks]: Array<string>) {
  //   if (k == null) {
  //     return this;
  //   }
  //   const next = this.children.get(k) || leaf();
  //   const children = this.children.set(k, next.add(ks));
  //   console.log('branch', children);
  //   return branch(children);
  // }

  isEmpty(): boolean {
    return false;
  }
}

const empty: Trie = new Empty();
const singleton = (k: string): Trie => arc(k, empty);

// const leaf = (k: string): Trie => new Leaf(k);
// const branch = (children: Map<string, Trie>): Trie => new Branch(children);
// export const create = leaf;

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
