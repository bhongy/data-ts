// import * as Monad from '../Monad';

/** Internal implementation. Do not export. */

// consumers never works with the contained value directly
const $value = Symbol('Either.value');
const $type = Symbol('Either.type');
const $Left = Symbol('Either.Left');
const $Right = Symbol('Either.Right');

// need interface Monad2<A, B> instead of Monad<T>
class Left<E, T> /* implements Monad.Interface<T> */ {
  // otherwise test: `expect(left(x)).toEqual(right(x))` will not fail
  private readonly [$type] = $Left;
  private readonly [$value]: E;

  constructor(value: E) {
    this[$value] = value;
  }

  map<U>(f: (x: T) => U): Either<E, U> {
    return left(this[$value]);
  }

  ap<B, C>(this: Either<E, (b: B) => C>, other: Either<E, B>): Either<E, C> {
    return left(this[$value]);
  }

  chain<U>(f: (x: T) => Either<E, U>): Either<E, U> {
    return left(this[$value]);
  }
}

class Right<E, T> /* implements Monad.Interface<T> */ {
  private readonly [$type] = $Right;
  private readonly [$value]: T;

  constructor(value: T) {
    this[$value] = value;
  }

  // fmap :: (t -> u) -> Either e t -> Either a b
  map<E, U>(f: (x: T) => U): Either<E, U> {
    return this.chain(x => right(f(x)));
  }

  ap<B, C>(this: Either<E, (b: B) => C>, other: Either<E, B>): Either<E, C> {
    return this.chain(f => other.map(f));
  }

  chain<U>(f: (x: T) => Either<E, U>): Either<E, U> {
    return f(this[$value]);
  }
}

/** Public Interfaces */

export type Either<E, T> = Left<E, T> | Right<E, T>;
// we need to explicitly pass the types through the constructor
// since it cannot completely infer from arguments (either miss E or T)
export const left = <E, T>(e: E): Either<E, T> => new Left(e);
export const right = <E, T>(x: T): Either<E, T> => new Right(x);

export const of = right;
// export const empty

// type Diff<T, U> = T extends U ? never : T;
// type NonNullable<T> = Diff<T, null | undefined>;
export const fromNullable = <T>(x: undefined | null | T): Either<null, T> =>
  x != null ? right(x) : left(null);
