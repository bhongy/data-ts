/**
 * Functor. https://github.com/fantasyland/fantasy-land#functor
 *
 * Specification:
 * - implements `map` method: `map :: Functor f => f a ~> (a -> b) -> f b`
 *
 * Properties:
 * - identity: `u.map(a => a) == u`
 *   "mapping identity over item(s) should have no effect"
 * - composition: `u.map(x => g(f(x))) == u.map(f).map(g)`
 *   "mapping a function composition `g . f` is the same as mapping `f` then `g`"
 *
 * Intuitions:
 * - applying a function to a value in a context (without altering the context)
 * - lifting a function into the context
 */

import { identity } from './utils';

interface IFunctor<T> {
  // a.k.a. fmap
  map<U>(f: (x: T) => U): IFunctor<U>;
}
export { IFunctor as Interface };

export function Properties(Subject: { of: <T>(x: T) => IFunctor<T> }) {
  describe('Functor Properties (.map)', () => {
    // identity: `u.map(a => a) == u`
    test('identity', () => {
      const u = Subject.of('Saarbrücken');
      expect(u.map(identity)).toEqual(u);
      expect(u.map(identity)).toEqual(Subject.of('Saarbrücken'));
    });

    // composition: `u.map(x => g(f(x))) == u.map(f).map(g)`
    // i.e. chaining maps preserves function composition
    test('composition', () => {
      const add10 = (x: number) => x + 10;
      const square = (x: number) => x ** 2;
      const u = Subject.of(3);
      const re1 = u.map((x: number) => square(add10(x)));
      const re2 = u.map(add10).map(square);
      expect(re1).toEqual(re2);
      expect(re1).toEqual(Subject.of(169));
    });
  });
}
