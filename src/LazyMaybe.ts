/**
 * Use when the cause of error does not need to be communicated.
 */

import { Lazy, identity } from './utils';
import * as Monad from './Monad';

/** Internal implementation. Do not export. */

// consumers never works with the contained value directly
const $thunk = Symbol('Maybe.thunk');
const $id = Symbol('Maybe.id');
const $Nothing = Symbol('Maybe.Nothing');
const $Just = Symbol('Maybe.Just');

class Nothing<T> implements Monad.Interface<T> {
  private readonly [$id] = $Nothing;
  private readonly [$thunk]: Lazy<T>;

  // eager
  fold<L, U>(f: () => L, g: (x: T) => U): L {
    return f();
  }

  map<U>(f: (x: T) => U): Maybe<U> {
    return nothing;
  }

  ap<A, B>(this: Maybe<(a: A) => B>, other: Maybe<A>): Maybe<B> {
    return nothing;
  }

  run(): T {
    // WRONG. fix this
    return nothing as never;
  }

  chain<U>(f: (x: T) => Maybe<U>): Maybe<U> {
    return nothing;
  }

  toString(): string {
    return 'Nothing';
  }

  inspect() {
    return this.toString();
  }
}

class Just<T> implements Monad.Interface<T> {
  private readonly [$id] = $Just;
  private readonly [$thunk]: Lazy<T>;

  constructor(thunk: Lazy<T>) {
    this[$thunk] = thunk;
  }

  run(): T {
    return this[$thunk]();
  }

  // eager
  fold<L, U>(f: () => L, g: (x: T) => U): U {
    return g(this[$thunk]());
  }

  // map :: Maybe a ~> (a -> b) -> Maybe b
  map<U>(f: (x: T) => U): Maybe<U> {
    // create a new thunk that returns the result of `f(thunk()) ~> f(x)`
    // put the thunk in `Just` because this is `Just`
    const thunk = this[$thunk];
    return new Just(() => f(thunk()));

    // this is better but need to fix compose (it doesn't infer type correctly)
    // return new Just(compose(f, this[$thunk]));
    // return this.chain(x => just(f(x)));
  }

  // T is (a: A) => B
  // ap :: Maybe (a -> b) ~> Maybe a -> Maybe b
  ap<A, B>(this: Maybe<(a: A) => B>, other: Maybe<A>): Maybe<B> {
    throw new NotImplementedError('ap');
    // return this.chain(f => other.map(f));
  }

  // chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
  chain<U>(f: (x: T) => Maybe<U>): Maybe<U> {
    // const thunk = this[$thunk];
    // throw new NotImplementedError('chain');

    // cannot call `Maybe<T>.run` because it could be Nothing
    // what is run for `Nothing`?
    // `this.run` is fine because we know we are in `Just`
    return new Just(() => f(this.run()).run());
  }

  // this "runs" all "queued" functions
  toString(): string {
    return `Just ${this.run()}`;
  }

  inspect() {
    return this.toString();
  }
}

export type Maybe<T> = Nothing<T> | Just<T>;
export const nothing: Maybe<never> = new Nothing();
export const just = <T>(x: T): Maybe<T> => new Just(() => x);

export const of = just;
// export const empty = nothing;

export const fromNullable = <T>(x: undefined | null | T): Maybe<T> =>
  x == null ? nothing : just(x);

class NotImplementedError extends Error {
  constructor(name: string) {
    super(`"${name}" is not implemented`);
  }
}
