/**
 * Functor.
 *
 * Specification:
 * - implements `map` method: `map :: Functor f => f a ~> (a -> b) -> f b`
 *   a.k.a fmap, <$>
 *
 * Laws: http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Functor.html
 * - identity: `u.map(x => x) == u`
 *   "mapping identity over item(s) should have no effect"
 * - composition: `u.map(compose(f, g)) == u.map(f).map(g)`
 *   "mapping a function composition `g . f` is the same as mapping `f` then `g`"
 *
 * Intuitions:
 * - mapping between categories - preserving structure
 * - applying a function to a value in a context (without altering the context)
 * - lifting a function into the computational context
 */

import { compose, identity } from './utils';

interface IFunctor<T> {
  // a.k.a. fmap
  map<U>(f: (x: T) => U): IFunctor<U>;
}
export { IFunctor as Interface };

export function Laws(F: { of: <T>(x: T) => IFunctor<T> }) {
  describe('Functor Laws (.map)', () => {
    // identity: `u.map(x => x) == u`
    test('identity', () => {
      const u = F.of('Saarbrücken');
      expect(u.map(identity)).toEqual(u);
      expect(u.map(identity)).toEqual(F.of('Saarbrücken'));
    });

    // composition: `u.map(compose(f, g)) == u.map(f).map(g)`
    //              `u.map(x => g(f(x))) == u.map(f).map(g)`
    // i.e. chaining maps preserves function composition
    test('composition', () => {
      const add10 = (x: number) => x + 10;
      const square = (x: number) => x ** 2;
      const u = F.of(3);
      const composed = u.map(compose(square, add10));
      const chained = u.map(add10).map(square);
      expect(composed).toEqual(chained);
      expect(composed).toEqual(F.of(169));
    });
  });
}
