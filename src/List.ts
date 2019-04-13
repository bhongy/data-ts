/**
 * List v0 (WIP)
 *
 * http://hackage.haskell.org/package/base-4.12.0.0/docs/src/GHC.List.html
 */

import * as Functor from './Functor';
import { Maybe, just, nothing } from './Maybe';

class Empty<T> implements Functor.Interface<T> {
  readonly length: number = 0;
  readonly head: Maybe<T> = nothing;
  readonly last: Maybe<T> = nothing;

  // must be lazy otherwise new Empty() will be recursively called indefinitely
  get tail(): List<T> {
    return empty();
  }

  // (++) :: [a] -> [a] -> [a]
  // (++) [] ys = ys
  concat(ys: List<T>): List<T> {
    return ys;
  }

  // concatMap

  map<U>(f: (x: T) => U): List<U> {
    return empty();
  }

  uncons(): Maybe<[T, List<T>]> {
    return nothing;
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

  constructor(private readonly x: T, private readonly xs: List<T>) {
    this.length = 1 + xs.length;
    // head [] = Just x
    // head [_:xs] = head xs
    this.head = just(x);
    this.tail = xs;
    this.last = xs instanceof Empty ? just(x) : xs.last;
  }

  // (++) :: [a] -> [a] -> [a]
  // (++) x:xs ys = x : xs ++ ys
  concat(ys: List<T>): List<T> {
    const { x, xs } = this;
    return nonEmpty(x, xs.concat(ys));
  }

  map<U>(f: (x: T) => U): List<U> {
    const { x, xs } = this;
    return nonEmpty(f(x), xs.map(f));
  }

  // concatMap :: Foldable t => (a -> [b]) -> t a -> [b]

  // deconstruct a list into its head and tail
  uncons(): Maybe<[T, List<T>]> {
    const { head, tail } = this;
    return head.map(h => [h, tail]);
  }

  toArray(): Array<T> {
    const { x, xs } = this;
    return [x, ...xs.toArray()];
  }

  // fold
  // foldRight

  // special folds: and, or, any, all

  // take, drop, takeWhile, dropWhile

  // searching by equality: elem (contain/include)
  // searching with a predicate: find, filter, partition

  // zip
}

export type List<T> = Empty<T> | NonEmpty<T>;

// need a way to provide "initial" type when empty is in the input position
export const empty = <T>() => new Empty<T>();
export const nonEmpty = <T>(x: T, xs: List<T>): List<T> => new NonEmpty(x, xs);

export const fromArray = <T>(arr: Array<T>): List<T> =>
  arr.reduceRight((xs, x) => nonEmpty(x, xs), empty<T>());

export const of = <T>(...args: Array<T>): List<T> => fromArray(args);
