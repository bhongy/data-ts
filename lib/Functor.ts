/**
 * Functor. https://github.com/fantasyland/fantasy-land#functor
 *
 * Specification:
 * - implements `map` method: `map :: Functor f => f a ~> (a -> b) -> f b`
 *   - `f` must be a function
 *   - `f` can returns any value
 *
 * Properties:
 * - identity: `u.map(a => a) == u`
 * - composition: `u.map(x => f(g(x))) == u.map(g).map(f)`
 */

class Functor<T> {
  constructor(private readonly value: T) {}

  // a.k.a. lateral function application
  map<U>(f: (x: T) => U): Functor<U> {
    return new Functor(f(this.value));
  }

  // a.k.a. reduce type to the contained value - get the value out
  // alias: reduce
  fold<U>(f: (x: T) => U): U {
    return f(this.value);
  }
}

// of :: (Functor f) => a -> f a
export const of = <T>(x: T): Functor<T> => new Functor(x);


/** IDEAS */

/*

// fmap :: (Functor f) => (a -> b) -> f a -> f b
export const fmap = <T, U>(f: (x: T) => U) => (fx: Functor<T>): Functor<U> =>
  // this is merely an inteface: delegates to the class
  // all logic should be defined in the class
  fx.map(f);

// this class is an abstraction over language primitive so
// it will define what it means for two of its instance to be equal
// equal :: (Functor f) => f a -> f b -> boolean

// ensure the runtime "type" only create by this contructor
// preventing user to write tests that rely on implementation detail like
// { value: ... }
// private static type = Symbol('Functor');
// private readonly $$type = Functor.type;
// another idea is to use symbol for the key for "value" instead of string literal

*/
