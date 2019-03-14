/**
 * Monad.
 *
 * Derived: Applicative.
 *
 * Specification:
 * - implements `chain` method: `chain :: Monad m => m a ~> (a -> m b) -> m b`
 *   a.k.a. bind, >>=, flatMap
 *
 * Laws: http://hackage.haskell.org/package/base-4.11.0.0/docs/Control-Monad.html#t:Monad
 * - left identity: `M.of(x).chain(f) == f(x)`
 * - right identity: `m.chain(M.of) == m`
 * - associativity: `m.chain(f).chain(g) == m.chain(x => f(x).chain(g))`
 * (also: https://wiki.haskell.org/Monad_laws)
 *
 * Intuitions:
 * - program with effects (State, I/O, Nullability, Errors).
 */

import * as Applicative from './Applicative';

interface IMonad<T> extends Applicative.Interface<T> {
  // a.k.a. combine function with effects
  chain<U>(f: (x: T) => IMonad<U>): IMonad<U>;
}

export { IMonad as Interface };

export function Laws(M: { of<T>(x: T): IMonad<T> }) {
  describe('Monad Laws (.chain)', () => {
    const x = 5;
    const m = M.of(x);
    const f = (x: number) => M.of(x * 20);
    const g = (x: number) => M.of(x - 32);

    // left identity: `M.of(x).chain(f) == f(x)`
    test('left identity', () => {
      expect(M.of(x).chain(f)).toEqual(f(x));
      expect(M.of(x).chain(f)).toEqual(M.of(100));
    });

    // right identity: `m.chain(M.of) == m`
    test('right identity', () => {
      expect(m.chain(M.of)).toEqual(m);
    });

    // associativity: `m.chain(f).chain(g) == m.chain(x => f(x).chain(g))`
    test('associativity', () => {
      expect(m.chain(f).chain(g)).toEqual(m.chain(x => f(x).chain(g)));
      expect(m.chain(f).chain(g)).toEqual(M.of(68));
    });
  });
}
