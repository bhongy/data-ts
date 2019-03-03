/**
 * Use when the cause of error does not need to be communicated.
 */

import * as Functor from './Functor';
// import * as Apply from './Apply';

/** Internal implementation. Do not export. */

// consumers never works with the contained value directly
const $value = Symbol('Maybe.value');
const $type = Symbol('Maybe.type');
const $Nothing = Symbol('Maybe.Nothing');
const $Just = Symbol('Maybe.Just');

class Nothing<A> implements Functor.Interface<A> {
  private readonly [$type] = $Nothing;

  map<B>(f: (a: A) => B): Maybe<B> {
    return nothing;
  }

  _ap<B>(other: Maybe<(a: A) => B>): Maybe<B> {
    return nothing;
  }

  // A is (b: B) => C
  ap<B, C>(this: Maybe<(b: B) => C>, other: Maybe<B>): Maybe<C> {
    return other._ap(this);
  }

  chain<B>(f: (a: A) => Maybe<B>): Maybe<B> {
    return nothing;
  }

  fold<B>(defaultValue: B): B {
    return defaultValue;
  }

  toString(): string {
    return 'Nothing';
  }

  inspect() {
    return this.toString();
  }
}

class Just<A> implements Functor.Interface<A> {
  private readonly [$type] = $Just;
  private readonly [$value]: A;

  constructor(value: A) {
    this[$value] = value;
  }

  // map :: Maybe a ~> (a -> b) -> Maybe b
  map<B>(f: (a: A) => B): Maybe<B> {
    return just(f(this[$value]));
  }

  _ap<B>(other: Maybe<(a: A) => B>): Maybe<B> {
    return other instanceof Nothing ? nothing : just(other[$value](this[$value]));
  }

  // ap :: Maybe (a -> b) ~> Maybe a -> Maybe b
  ap<B, C>(this: Maybe<(b: B) => C>, other: Maybe<B>): Maybe<C> {
    return other._ap(this);
  }

  // chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
  chain<U>(f: (x: A) => Maybe<U>): Maybe<U> {
    return f(this[$value]);
  }

  fold<U>(defaultValue: U): A {
    return this[$value];
  }

  toString(): string {
    return `Just ${this[$value]}`;
  }

  inspect(): string {
    return this.toString();
  }
}

/** Public Interfaces */

export type Maybe<T> = Nothing<T> | Just<T>;
export const nothing: Maybe<never> = new Nothing();
export const just = <T>(x: T): Maybe<T> => new Just(x);

export const of = just;
// export const empty = nothing;

export const fromNullable = <T>(x: undefined | null | T): Maybe<T> =>
  x == null ? nothing : just(x);

// ---

// type Curried<A, B> = (a: A) => B;
// type Curried2<A, B, C> = (a: A) => Curried<B, C>;

// Lift a binary function to actions.
// liftA2 :: (a -> b -> c) -> f a -> f b -> f c
// const liftA2 = <
//   MA extends Maybe<any>,
//   MB extends Maybe<any>,
//   MC extends Maybe<any>
// >(
//   fn: Curried2<MA, MB, MC>
// ) => (a: MA) => (b: MB) =>
//   of(fn)
//     .ap(a)
//     .ap(b);
