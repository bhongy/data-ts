/**
 * Use when the cause of error does not need to be communicated.
 */

import * as Monad from './Monad';

/** Internal implementation. Do not export. */

// consumers never works with the contained value directly
const $value = Symbol('Maybe.value');
const $type = Symbol('Maybe.type');
const $Nothing = Symbol('Maybe.Nothing');
const $Just = Symbol('Maybe.Just');

class Nothing<A> implements Monad.Interface<A> {
  private readonly [$type] = $Nothing;

  fold<B, C>(f: () => B, g: (a: A) => C): B {
    return f();
  }

  map<B>(f: (a: A) => B): Maybe<B> {
    return nothing;
  }

  // A is (b: B) => C
  ap<B, C>(this: Maybe<(b: B) => C>, other: Maybe<B>): Maybe<C> {
    return nothing;
  }

  chain<B>(f: (a: A) => Maybe<B>): Maybe<B> {
    return nothing;
  }

  toString(): string {
    return 'Nothing';
  }

  inspect() {
    return this.toString();
  }
}

class Just<A> implements Monad.Interface<A> {
  private readonly [$type] = $Just;
  private readonly [$value]: A;

  constructor(value: A) {
    this[$value] = value;
  }

  fold<B, C>(f: () => B, g: (a: A) => C): C {
    return g(this[$value]);
  }

  // map :: Maybe a ~> (a -> b) -> Maybe b
  map<B>(f: (a: A) => B): Maybe<B> {
    return this.chain(x => of(f(x)));
  }

  // A is (b: B) => C
  // ap :: Maybe (a -> b) ~> Maybe a -> Maybe b
  ap<B, C>(this: Maybe<(b: B) => C>, other: Maybe<B>): Maybe<C> {
    return this.chain(f => other.map(f));
  }

  // chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
  chain<B>(f: (a: A) => Maybe<B>): Maybe<B> {
    return f(this[$value]);
  }

  toString(): string {
    return `Just ${this[$value]}`;
  }

  inspect(): string {
    return this.toString();
  }
}

/** Public Interfaces */

export type Maybe<A> = Nothing<A> | Just<A>;
export const nothing: Maybe<never> = new Nothing();
export const just = <A>(a: A): Maybe<A> => new Just(a);

export const of = just;
// export const empty = nothing;

export const fromNullable = <A>(a: undefined | null | A): Maybe<A> =>
  a == null ? nothing : just(a);

// ---

// Lift a binary function to apply to Applicatives
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
