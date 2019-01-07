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

import * as Functor from './Functor';

/*
// this inheritance pattern probably won't allow us
// to compose multiple types like: Setoid + Functor
// what's the solution?
class Apply<T> extends Functor<T> {
  map<U>(f: (x: T) => U): Apply<U> {
    return new Apply(this.fold(f));
  }

  // a.k.a. map with a Functor/Apply of a function
  ap<U>(fb: Apply<(x: T) => U>): Apply<U> {
    // `ap` should only responsible to "apply" what's inside fb to fa.map
    return this.map(fb.fold(f => f));
  }
}

export const of = <T>(x: T): Apply<T> => new Apply(x);
*/

/*
*/
class Apply2<T> {
  private readonly fa: Functor.UID<T>;
  constructor(x: T) {
    this.fa = Functor.of(x);
  }

  map<U>(f: (x: T) => U): Apply2<U> {
    return new Apply2(this.fold(f));
  }

  fold<U>(f: (x: T) => U): U {
    // only place that knows implementation detail
    // i.e. delegate to Functor<T>.fold
    // this is probably incorrect because we bypass Functor.map
    // because the specification is implemented in the map not fold
    return this.fa.fold(f);
  }

  // a.k.a. map with a Functor of a function
  ap<U>(fb: Apply2<(x: T) => U>): Apply2<U> {
    return this.map(fb.fold(f => f));
  }
}

export const of = <T>(x: T): Apply2<T> => new Apply2(x);
