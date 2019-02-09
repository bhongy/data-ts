/**
 * Apply. https://github.com/fantasyland/fantasy-land#apply
 * ... not that useful ... use Applicative instead?
 *
 * Extends: Functor
 *
 * Specification:
 * - implements `ap` method: `ap :: Apply f => f a ~> f (a -> b) -> f b`
 *   - `a` is the Apply of value (could be a function)
 *   - `b` must be an apply of a function
 *   - `ap` applies the function `b` to value `a`
 *
 * Properties:
 * - composition: `c.ap(b.ap(a.map(f => g => x => f(g(x))))) == c.ap(b).ap(a)`
 */

class Apply<T> {
  constructor(private readonly value: T) {}

  map<U>(f: (x: T) => U): Apply<U> {
    return new Apply(this.fold(f));
  }

  fold<U>(f: (x: T) => U): U {
    return f(this.value);
  }

  // a.k.a. map with a Functor of a function
  ap<U>(ff: Apply<(x: T) => U>): Apply<U> {
    return this.map(ff.fold(f => f));
  }
}

export const of = <T>(x: T): Apply<T> => new Apply(x);
