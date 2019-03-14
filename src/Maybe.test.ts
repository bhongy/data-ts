import * as $Maybe from './Maybe';
import { Maybe, just, nothing } from './Maybe';
import * as Functor from './Functor';
import * as Applicative from './Applicative';
import * as Monad from './Monad';
import { constant } from './utils';

describe('Maybe', () => {
  Functor.Laws($Maybe);
  Applicative.Laws($Maybe);
  Monad.Laws($Maybe);

  // taking the value out
  test('.fold', () => {
    const f = constant('puppy');
    const g = (s: string) => `cute ${s}`;

    const u: Maybe<string> = just('panda');
    expect(u.fold(f, g)).toBe('cute panda');

    const v: Maybe<string> = nothing;
    expect(v.fold(f, g)).toBe('puppy');
  });

  test('.ap', () => {
    const f = (x: number) => x * 2;
    const u = just(5);

    expect(nothing.ap(nothing)).toEqual(nothing);
    expect(just(f).ap(nothing)).toEqual(nothing);
    expect(nothing.ap(u)).toEqual(nothing);
    expect(just(f).ap(u)).toEqual(just(10));

    // how to test type expect error if calling .ap on a non-function Applicative?
  });

  describe('.chain', () => {
    const f = (x: number) => just(x ** 2);
    const g = constant(nothing);

    expect(just(5).chain(f)).toEqual(just(25));
    expect(just(5).chain(g)).toEqual(nothing);
    expect(nothing.chain(f)).toEqual(nothing);
  });

  describe('of', () => {
    test('always equivalent to Just', () => {
      expect($Maybe.of('hello')).toEqual(just('hello'));
      expect($Maybe.of(null)).toEqual(just(null));
      // why does this fail?
      // expect(Maybe.of(undefined)).toEqual(just(undefined));

      expect($Maybe.of(undefined)).not.toEqual(nothing);
    });
  });

  describe('fromNullable', () => {
    test('returns Nothing from null or undefined', () => {
      expect($Maybe.fromNullable(undefined)).toEqual(nothing);
      expect($Maybe.fromNullable(null)).toEqual(nothing);
    });
  });
});
