/**
 * Reference (default) implementation.
 *
 * Most operations are O(n) time.
 * O(n) space. Storing only the minimum data (value and next pointer).
 *
 * http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-List.html
 * http://hackage.haskell.org/package/base-4.12.0.0/docs/src/GHC.List.html
 */
import * as Functor from '../Functor';
import { Maybe, just, nothing } from '../Maybe';

class Empty<T> implements Functor.Interface<T> {
  uncons(): Maybe<[T, List<T>]> {
    return nothing;
  }

  get length(): number {
    return 0;
  }

  get head(): Maybe<T> {
    return nothing;
  }

  get tail(): List<T> {
    // this will not cause infinite recursive calls because getter is lazy
    return empty;
  }

  get last(): Maybe<T> {
    return nothing;
  }

  concat(ys: List<T>): List<T> {
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
  constructor(private readonly x: T, private readonly xs: List<T>) {}

  // deconstruct a list into its head and tail
  uncons(): Maybe<[T, List<T>]> {
    const { x, xs } = this;
    return just([x, xs]);
  }

  // O(n) time
  get length(): number {
    return 1 + this.xs.length;
  }

  // O(1) time
  get head(): Maybe<T> {
    return just(this.x);
  }

  // O(1) time
  get tail(): List<T> {
    return this.xs;
  }

  // O(n) time
  // last :: List a -> Maybe a
  // last [] = Nothing <-- in Empty class
  // last [x] = Just x
  // last (_:xs) = last xs
  get last(): Maybe<T> {
    const { x, xs } = this;
    return xs instanceof Empty ? just(x) : xs.last;
  }

  // TODO: Semigroup -> Monoid
  // (++) :: [a] -> [a] -> [a]
  // (++) [] ys = ys <-- in Empty class
  // (++) x:xs ys = x : xs ++ ys
  concat(ys: List<T>): List<T> {
    const { x, xs } = this;
    return nonEmpty(x, xs.concat(ys));
  }

  // fold :: Monoid m => t m -> m
  // foldMap :: Monoid m => (a -> m) -> t a -> m
  // https://wiki.haskell.org/Foldr_Foldl_Foldl'

  // foldl :: (b -> a -> b) -> b -> t a -> b
  foldl<U>(f: (acc: U, x: T) => U, initial: U): U {
    const { x, xs } = this;
    const acc = f(initial, x);
    return xs.foldl(f, acc);
  }

  // foldr :: (a -> b -> b) -> b -> t a -> b
  foldr<U>(f: (x: T, acc: U) => U, initial: U): U {
    const { x, xs } = this;
    const acc = xs.foldr(f, initial);
    return f(x, acc);
  }

  // special folds: and, or, any, all
  // take, drop, takeWhile, dropWhile
  // searching by equality: elem (contain/include)
  // searching with a predicate: find, filter, partition
  // zip

  map<U>(f: (x: T) => U): List<U> {
    const { x, xs } = this;
    return nonEmpty(f(x), xs.map(f));
  }

  toArray(): Array<T> {
    const { x, xs } = this;
    return [x, ...xs.toArray()]; // rebuild array each time could be slow
  }
}

export type List<T> = Empty<T> | NonEmpty<T>;

export const empty: Empty<never> = new Empty();
export const nonEmpty = <T>(x: T, xs: List<T>): List<T> => new NonEmpty(x, xs);

export const fromArray = <T>(arr: Array<T>): List<T> =>
  arr.reduceRight((xs, x) => nonEmpty(x, xs), empty as Empty<T>);

export const of = <T>(...args: Array<T>): List<T> => fromArray(args);
