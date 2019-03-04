/** TODO: refactor all the tests and use <Typeclass>.Properties tests */

import { constant, Curried3 } from './utils';
import * as Maybe from './Maybe';
import * as Functor from './Functor';

describe('Maybe', () => {
  const { just, nothing } = Maybe;
  const double = (x: number) => x * 2;

  Functor.Properties(Maybe);
  // Apply
  // Applicative

  // taking the value out
  test('.fold', () => {
    const f = constant('puppy');
    const g = (s: string) => `cute ${s}`;

    const u: Maybe.Maybe<string> = just('panda');
    expect(u.fold(f, g)).toBe('cute panda');

    const v: Maybe.Maybe<string> = nothing;
    expect(v.fold(f, g)).toBe('puppy');
  });

  // (.map) use cases

  test('.ap', () => {
    const f = (x: number) => x * 2;
    const u = just(5);

    expect(nothing.ap(nothing)).toEqual(nothing);
    expect(just(f).ap(nothing)).toEqual(nothing);
    expect(nothing.ap(u)).toEqual(nothing);
    expect(just(f).ap(u)).toEqual(just(10));
  });

  test('.ap (example)', () => {
    const add = (x: number) => (y: number) => x + y;
    const joinWith: Curried3<
      string,
      string,
      string,
      string
    > = delimeter => x => y => x + delimeter + y;

    [
      [
        Maybe.of(add)
          .ap(just(10))
          .ap(just(25)),
        Maybe.of(35),
      ],
      [
        // of -> map is an alternative to lift the function
        Maybe.of('Doe')
          .map(joinWith(', '))
          .ap(just('John')),
        Maybe.of('Doe, John'),
      ],
    ].forEach(([a, b]) => expect(a).toEqual(b));
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
      expect(Maybe.of('hello')).toEqual(just('hello'));
      expect(Maybe.of(null)).toEqual(just(null));
      // why does this fail?
      // expect(Maybe.of(undefined)).toEqual(just(undefined));

      expect(Maybe.of(undefined)).not.toEqual(nothing);
    });
  });

  describe('fromNullable', () => {
    test('returns Nothing from null or undefined', () => {
      expect(Maybe.fromNullable(undefined)).toEqual(nothing);
      expect(Maybe.fromNullable(null)).toEqual(nothing);
    });
  });
});
