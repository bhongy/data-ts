interface MaybeInterface<T> /* extends Maybe..., MaybeMonad */ {
  // lift
  // fmap
  map<U>(f: (value: T) => U): Maybe<U>;
  // flatMap
  // bind :: Monad
  // return :: Monad
  // fold<U>(f: (value: T) => U): U;
  inspect(): string;
}

class Nothing implements MaybeInterface<any> {
  map(): Nothing {
    return this;
  }

  inspect() {
    return 'Nothing';
  }
}

class Just<T> implements MaybeInterface<T> {
  constructor(private value: T) {}

  map<U>(f: (value: T) => U): Just<U> {
    return new Just(f(this.value));
  }

  inspect() {
    // issue with object/array
    return `Just ${this.value}`;
  }
}

export type Maybe<T> = Just<T> | Nothing;

// const isJust = <T extends Maybe<any>>(
//   x: T
// ): T extends Just<any> ? true : false => x instanceof Just;

// const isNothing = <T extends Maybe<any>>(
//   x: T
// ): T extends Nothing ? true : false => x instanceof Nothing;

// type T to be not "nothing"
export const just = <T>(value: T): Just<T> => {
  if (value == null) {
    throw TypeError('Provided value must not be empty');
  }
  return new Just(value);
};
export const nothing = (): Nothing => new Nothing();
// caller is responsible to translate "empty"
// into `null` or `undefined` before invoking this function
// static lift(value)
export const of = <T>(value: T | void): Maybe<T> =>
  // isJust(value)
  value != null ? just(value) : nothing();
