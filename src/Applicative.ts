/**
 * Pointed Applicative Functor.
 *
 * Derived: Functor.
 *
 * Specification:
 * - implements `of` function: `of :: Pointed f => a -> f a`
 *   a.k.a. pure, return, unit, point, singleton
 * - implements `ap` method: `ap :: Applicative f => f (a -> b) -> f a -> f b`
 *
 * Laws: http://hackage.haskell.org/package/base-4.12.0.0/docs/Control-Applicative.html
 * - identity: `A.of(x => x).ap(u) == u`
 * - composition:
*    `A.of(f => g => x => f(g(x))).ap(u).ap(v).ap(w) == u.ap(v.ap(w))`
 * - homomorphism: `A.of(f).ap(A.of(x)) == A.of(f(x))`
 *   "homomorphism means it preserves structure (function application)"
 * - interchange: `A.of(f).ap(A.of(x)) == A.of(f => f(x))).ap(f)`
 */

import { identity } from './utils';
import * as Functor from './Functor';

// to be correct, it has to extends Pointed Functor (with `of`)
// but `of` is a static not an instance method - TODO for the future
interface IApplicative<T> extends Functor.Interface<T> {
  // a.k.a. apply contained function to a contained value
  // you might get a container of partially applied function or a value out
  ap<A, B>(
    this: IApplicative<(x: A) => B>,
    other: IApplicative<A>
  ): IApplicative<B>;
}

export { IApplicative as Interface };

export function Laws(Subject: { of: <T>(x: T) => IApplicative<T> }) {
  describe('Applicative Laws (.ap)', () => {
    const times4 = (x: number) => x * 4;
    const square = (x: number) => x ** 2;

    // identity: `A.of(x => x).ap(u) == u`
    test('identity', () => {
      const u = Subject.of(5);
      expect(Subject.of(identity).ap(u)).toEqual(u);
    });

    // composition:
    //   `A.of(f => g => x => f(g(x))).ap(u).ap(v).ap(w) == u.ap(v.ap(w))`
    test('composition', () => {
      const u = Subject.of(times4);
      const v = Subject.of(square);
      const w = Subject.of(5);
      // @ts-ignore
      const a = Subject.of(f => g => x => f(g(x))).ap(u).ap(v).ap(w);
      // const a = Subject.of(compose).ap(u).ap(v).ap(w);
      const b = u.ap(v.ap(w));
      expect(a).toEqual(b);
      expect(a).toEqual(Subject.of(100));
    });

    // homomorphism: `A.of(f).ap(A.of(x)) == A.of(f(x))`
    test('homomorphism', () => {
      const f = times4;
      const x = 16;
      const a = Subject.of(f).ap(Subject.of(x));
      const b = Subject.of(f(x));
      expect(a).toEqual(b);
      expect(a).toEqual(Subject.of(64));
    });

    // interchange: `A.of(f).ap(A.of(x)) == A.of(f => f(x))).ap(f)`
    test('interchange', () => {
      const f = square;
      const a = Subject.of(f).ap(Subject.of(5));
      // @ts-ignore
      const b = Subject.of(f => f(5)).ap(Subject.of(f));
      expect(a).toEqual(b);
      expect(a).toEqual(Subject.of(25));
    });
  });
}
