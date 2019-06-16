/**
 * Use when the cause of error does not need to be communicated.
 */

import * as Monad from './Monad';
import * as Monoid from './Monoid';

/** Internal implementation. Do not export. */

// consumers never works with the contained value directly
const $value = Symbol('Maybe.value');
const $type = Symbol('Maybe.type');
const $Nothing = Symbol('Maybe.Nothing');
const $Just = Symbol('Maybe.Just');

class Nothing<A> implements Monad.Interface<A>, Monoid.Interface<A> {
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

  concat<A extends Monoid.Interface<T>, T>(
    this: Maybe<A>,
    other: Maybe<A>
  ): Maybe<A> {
    return other;
  }

  toString(): string {
    return 'Nothing';
  }

  inspect() {
    return this.toString();
  }
}

class Just<A> implements Monad.Interface<A>, Monoid.Interface<A> {
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
    // return this.chain(compose(of, f)); // need to fix compose typing
    // return of(f).ap(this);
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

  concat<A extends Monoid.Interface<T>, T>(
    this: Maybe<A>,
    other: Maybe<A>
  ): Maybe<A> {
    return other.fold(() => this, y => this.map(x => x.concat(y)));
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
export const empty = nothing;

export const fromNullable = <A>(a: undefined | null | A): Maybe<A> =>
  a == null ? nothing : just(a);

/*
notice the value inside (`a`) must be a member of Semigroup
notice also that `a` in instance line is a type
  while `a` and `b` in implementation lines are name bindings (variables)

instance Semigroup a => Semigroup (Maybe a) where
    Nothing <> b       = b
    a       <> Nothing = a
    Just a  <> Just b  = Just (a <> b)

instance Semigroup a => Monoid (Maybe a) where
    mempty = Nothing
*/
