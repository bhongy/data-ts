import { Lazy, compose, constant } from './utils';
import * as Functor from './Functor';

class Just<T> implements Functor.Interface<T> {
  constructor(private readonly x: Lazy<T>) {}

  map<U>(f: (x: T) => U): Maybe<U> {
    // cannot use `constant` here because we don't have value `x`
    return new Just(() => f(this.x()));
  }

  fold<U>(f: (x: T) => U): U {
    return f(this.x());
  }
}

export type Maybe<T> = Just<T>;
// using `constant` here is fine because `x` is already a value
export const just = <T>(x: T): Maybe<T> => new Just(constant(x));
