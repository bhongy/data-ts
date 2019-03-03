/** TODO: refactor all the tests and use <Typeclass>.Properties tests */

import * as Maybe from './Maybe';
import * as Functor from './Functor';

describe('Maybe', () => {
  const { just, nothing } = Maybe;
  const double = (x: number) => x * 2;

  Functor.Properties(Maybe);
  // Apply
  // Applicative

  describe('(.ap) { WIP }', () => {
    it('returns Nothing if either Maybe is Nothing', () => {
      expect(nothing.ap(just(7))).toEqual(nothing);
      expect(just(double).ap(nothing)).toEqual(nothing);
      expect(nothing.ap(nothing)).toEqual(nothing);
    });

    it('returns Just if both Maybes are Justs', () => {
      expect(just(double).ap(just(7))).toEqual(just(14));
    });

    test('(.ap) examples [TEMPORARY]', () => {
      const add = (x: number) => (y: number) => x + y;
      const add10 = add(10);
      const joinWith = (delimeter: string) => (x: string) => (y: string) =>
        x + delimeter + y;

      [
        {
          actual: Maybe.of(add)
            .ap(just(10))
            .ap(just(25)),
          expected: Maybe.of(35),
        },
        {
          // of -> map is an alternative to lift the function
          actual: Maybe.of('Doe')
            .map(joinWith(', '))
            .ap(just('John')),
          expected: Maybe.of('Doe, John'),
        },
      ].forEach(({ actual, expected }) => {
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('(.chain) { WIP }', () => {
    const maybeNumber = (x: unknown): Maybe.Maybe<number> =>
      typeof x === 'number' ? just(x) : nothing;

    expect(
      just(10)
        .chain(maybeNumber)
        .map(double)
    ).toEqual(just(20));

    expect(
      just({})
        .chain(maybeNumber)
        .map(double)
    ).toEqual(nothing);
  });

  // fold -> taking the value out
  // describe('(.fold)', () => {
  //   test('Just: returns the contained value', () => {
  //     expect(just('arugula').fold('broccoli')).toBe('arugula');
  //   });

  //   test('Nothing: returns the default value', () => {
  //     expect(nothing.fold(DEFAULT)).toBe(DEFAULT);
  //   });
  // });

  // (.map) use cases

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
