/**
 * http://hackage.haskell.org/package/base-4.12.0.0/docs/src/GHC.List.html
 */

import * as Functor from './Functor';
import { Maybe, just, nothing } from './Maybe';

class Empty<T> implements Functor.Interface<T> {
  readonly length: number = 0;
  // readonly head: Maybe<T> = nothing;
  // readonly last: Maybe<T> = nothing;

  get head(): Maybe<T> {
    return nothing;
  }

  get last(): Maybe<T> {
    return nothing;
  }

  // must be lazy otherwise new Empty() will be recursively called indefinitely
  get tail(): List<T> {
    return empty;
  }

  map<U>(f: (x: T) => U): List<U> {
    return empty;
  }

  foldl<U>(f: (acc: U, x: T) => U, initial: U): U {
    return initial;
  }

  foldr<U>(f: (x: T, acc: U) => U, initial: U): U {
    return initial;
  }

  // (++) :: [a] -> [a] -> [a]
  // (++) [] ys = ys
  concat(ys: List<T>): List<T> {
    return ys;
  }

  // concatMap<U>(f: (x: T) => List<U>): List<U> {
  //   return empty;
  // }

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

  map<U>(f: (x: T) => U): List<U> {
    const { x, xs } = this;
    return nonEmpty(f(x), xs.map(f));
  }

  // fold :: Monoid m => t m -> m
  // foldMap :: Monoid m => (a -> m) -> t a -> m

  // https://wiki.haskell.org/Foldr_Foldl_Foldl'

  // foldl :: (b -> a -> b) -> b -> t a -> b
  foldl<U>(f: (acc: U, x: T) => U, initial: U): U {
    const { x, xs } = this;
    const u = f(initial, x);
    return xs.foldl(f, u);
  }

  // foldr :: (a -> b -> b) -> b -> t a -> b
  foldr<U>(f: (x: T, acc: U) => U, initial: U): U {
    const { x, xs } = this;
    return f(x, xs.foldr(f, initial));
  }

  // special folds: and, or, any, all

  // append

  // (++) :: [a] -> [a] -> [a]
  // (++) x:xs ys = x : xs ++ ys
  concat(ys: List<T>): List<T> {
    const { x, xs } = this;
    return nonEmpty(x, xs.concat(ys));
  }

  // concatMap :: Foldable t => (a -> [b]) -> t a -> [b]
  // concatMap<U>(f: (x: T) => List<U>): List<U> {}

  // deconstruct a list into its head and tail
  uncons(): Maybe<[T, List<T>]> {
    const { head, tail } = this;
    return head.map(h => [h, tail]);
  }

  toArray(): Array<T> {
    const { x, xs } = this;
    return [x, ...xs.toArray()];
  }

  // take, drop, takeWhile, dropWhile

  // searching by equality: elem (contain/include)
  // searching with a predicate: find, filter, partition

  // zip
}

export type List<T> = Empty<T> | NonEmpty<T>;

// need a way to provide "initial" type when empty is in the input position
export const empty: Empty<never> = new Empty();
export const nonEmpty = <T>(x: T, xs: List<T>): List<T> => new NonEmpty(x, xs);

export const fromArray = <T>(arr: Array<T>): List<T> =>
  arr.reduceRight((xs, x) => nonEmpty(x, xs), empty as Empty<T>);

export const of = <T>(...args: Array<T>): List<T> => fromArray(args);
