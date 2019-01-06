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

  map<U>(f: (x: T) => U): Functor<U> {
    return new Functor(f(this.value));
  }
}

// of :: (Functor f) => a -> f a
export const of = <T>(x: T): Functor<T> => new Functor(x);

// fmap :: (Functor f) => (a -> b) -> f a -> f b
