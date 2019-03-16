import { compose, identity } from './utils';

// class Nothing {
//   map(f: (x: never) => unknown): Maybe<never> {
//     return this;
//   }
// }

class Just<T, U = T> {
  constructor(
    private readonly __value: T,
    private readonly __pipeline: (x: T) => U
  ) {}

  map<V>(f: (x: U) => V): Just<T, V> {
    return new Just(this.__value, compose(f, this.__pipeline));
  }

  // this is wrong ...
  chain<V>(f: (x: T) => Just<T, V>): Just<T, V> {
    const $f = (x: T) => f(x).__value;
    // @ts-ignore
    return new Just(this.__value, compose($f, this.__pipeline))
  }

  fold<U>(f: (x: T) => U): U {
    // @ts-ignore
    return compose(f, this.__pipeline)(this.__value);
  }
}

// export type Maybe<T> = Nothing | Just<T>;
export const just = <T>(x: T) => new Just(x, identity);
// export const nothing = new Nothing();
