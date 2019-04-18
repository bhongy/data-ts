/**
 * Runtime efficient implementation of (Singly Linked) List.
 * "Read" operations (length, head, tail) are O(1) time
 * because the result is cached during creation.
 *
 * As the nodes are immutable, we can guarantee nested property of them.
 *
 * Less space efficiency than the default implementatin due to
 * caching of result for each read operation but still primarily
 * O(n) when n is large.
 *
 * http://hackage.haskell.org/package/base-4.12.0.0/docs/src/GHC.List.html
 */
import * as Functor from '../Functor';
import { Maybe, just, nothing } from '../Maybe';

class Empty<T> implements Functor.Interface<T> {
  readonly length: number = 0;
  readonly head: Maybe<T> = nothing;
  // `empty` refers to "this" so we can't `= empty` otherwise
  // `new Empty()` will cause infinite recursive calls
  readonly tail: List<T> = this;
  readonly last: Maybe<T> = nothing;
  // readonly init: List<T>;

  uncons(): Maybe<[T, List<T>]> {
    return nothing;
  }

  append(ys: List<T>): List<T> {
    return ys;
  }

  foldl<U>(f: (acc: U, x: T) => U, initial: U): U {
    return initial;
  }

  foldr<U>(f: (x: T, acc: U) => U, initial: U): U {
    return initial;
  }

  map<U>(f: (x: T) => U): List<U> {
    return empty;
  }

  toArray(): Array<T> {
    return [];
  }
}

class NonEmpty<T> implements Functor.Interface<T> {
  readonly length: number;
  readonly head: Maybe<T>;
  readonly tail: List<T>;
  readonly last: Maybe<T>;
  // readonly init: List<T>;

  constructor(private readonly x: T, private readonly xs: List<T>) {
    this.length = 1 + xs.length;
    this.head = just(x);
    this.tail = xs;
    this.last = xs instanceof Empty ? just(x) : xs.last;
  }

  uncons(): Maybe<[T, List<T>]> {
    const { x, xs } = this;
    return just([x, xs]);
  }

  append(ys: List<T>): List<T> {
    const { x, xs } = this;
    return nonEmpty(x, xs.append(ys));
  }

  foldl<U>(f: (acc: U, x: T) => U, initial: U): U {
    const { x, xs } = this;
    const u = f(initial, x);
    return xs.foldl(f, u);
  }

  foldr<U>(f: (x: T, acc: U) => U, initial: U): U {
    const { x, xs } = this;
    return f(x, xs.foldr(f, initial));
  }

  map<U>(f: (x: T) => U): List<U> {
    const { x, xs } = this;
    return nonEmpty(f(x), xs.map(f));
  }

  toArray(): Array<T> {
    const { x, xs } = this;
    return [x, ...xs.toArray()];
  }
}

export type List<T> = Empty<T> | NonEmpty<T>;

export const empty: Empty<never> = new Empty();
export const nonEmpty = <T>(x: T, xs: List<T>): List<T> => new NonEmpty(x, xs);

export const fromArray = <T>(arr: Array<T>): List<T> =>
  arr.reduceRight((xs, x) => nonEmpty(x, xs), empty as Empty<T>);

export const of = <T>(...args: Array<T>): List<T> => fromArray(args);
