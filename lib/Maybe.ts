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

class Nothing implements Functor.Interface<any> {
  private readonly [$type] = $Nothing;

  map(f: (x: any) => any): Nothing {
    return this;
  }

  ap(b: Maybe<any>): Nothing {
    return this;
  }

  fold<U>(defaultValue: U): U {
    return defaultValue;
  }
}

class Just<T> implements Functor.Interface<T> {
  private readonly [$type] = $Just;
  private readonly [$value]: T;

  constructor(value: T) {
    this[$value] = value;
  }

  map<U>(f: (x: T) => U): Just<U> {
    return just(f(this[$value]));
  }

  // how to ensure `T` is a function from this function
  ap<U>(other: Maybe<U>) {
    const x = this[$value];
    // should we throw instead of returning Nothing?
    // @ts-ignore
    return typeof x === 'function' ? other.map(x) : nothing();
  }

  fold(defaultValue: any): T {
    return this[$value];
  }
}

/** Public Interfaces */

export type Maybe<T> = Nothing | Just<T>;
export const nothing = () => new Nothing();
export const just = <T>(x: T) => new Just(x);

export const of = just;
// export const empty = nothing;

export const fromNullable = <T>(x: undefined | null | T): Nothing | Just<T> =>
  x == null ? nothing() : just(x);
