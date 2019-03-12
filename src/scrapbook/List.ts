/**
 * List v0 (WIP)
 */

import * as Functor from '../Functor';

class Empty<T> implements Functor.Interface<T> {
  // (++) :: [a] -> [a] -> [a]
  // (++) [] ys = ys
  concat(ys: List<T>): List<T> {
    return ys;
  }

  length(): number {
    return 0;
  }

  // uncons

  map<U>(f: (x: T) => U): List<U> {
    return empty;
  }
}

class NonEmpty<T> implements Functor.Interface<T> {
  constructor(private readonly x: T, private readonly xs: List<T>) {}

  // (++) :: [a] -> [a] -> [a]
  // (++) x:xs ys = x : xs ++ ys
  concat(ys: List<T>): List<T> {
    const { x, xs } = this;
    return nonEmpty(x, xs.concat(ys));
  }

  length(): number {
    const { x, xs } = this;
    return 1 + xs.length();
  }

  // uncons

  map<U>(f: (x: T) => U): List<U> {
    const { x, xs } = this;
    return nonEmpty(f(x), xs.map(f));
  }

  // fold
  // foldRight

  // special folds: and, or, any, all

  // take, drop, takeWhile, dropWhile

  // searching by equality: elem (contain/include)
  // searching with a predicate: find, filter, partition

  // zip
}

type List<T> = Empty<T> | NonEmpty<T>;

// `never` is assignable to any types
const empty: List<never> = new Empty();
const nonEmpty = <T>(x: T, xs: List<T>): List<T> => new NonEmpty(x, xs);
