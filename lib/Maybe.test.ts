import * as Maybe from './Maybe';
import * as Functor from './Functor';

describe('Maybe', () => {
  const double = (x: number) => x * 2;

  Functor.Properties(Maybe);
  // Apply
  // Applicative

  describe('(.ap) { WIP }', () => {
    const { just } = Maybe;
    const nothing = Maybe.nothing();

    it('returns Nothing if either Maybe is Nothing', () => {
      expect(nothing.ap(just(7))).toEqual(nothing);
      expect(just(double).ap(nothing)).toEqual(nothing);
      expect(nothing.ap(nothing)).toEqual(nothing);
    });

    it('returns Just if both Maybes are Justs', () => {
      expect(just(double).ap(just(7))).toEqual(just(14));
    });

    // it('throws if calling .ap on Maybe of non-function', () => {
    //   expect(() => Maybe.just(0).ap(Maybe.just(10))).toThrow();
    //   expect(() => Maybe.just(0).ap(Maybe.nothing())).toThrow();
    // });

    it('returns Nothing if calling .ap on Maybe of non-function', () => {
      expect(just(0).ap(just(10))).toEqual(nothing);
      expect(just(0).ap(nothing)).toEqual(nothing);
    });

    test('(.ap) examples [TEMPORARY]', () => {
      const add = (x: number) => (y: number) => x + y;
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
      typeof x === 'number' ? Maybe.just(x) : Maybe.nothing();

    expect(
      // @ts-ignore
      Maybe.just(10)
        .chain(maybeNumber)
        .map(double)
    ).toEqual(Maybe.just(20));

    expect(
      // @ts-ignore
      Maybe.just({})
        .chain(maybeNumber)
        .map(double)
    ).toEqual(Maybe.nothing());
  });

  // fold -> taking the value out
  describe('(.fold)', () => {
    test('Just: returns the contained value', () => {
      const x = 25;
      expect(Maybe.just(x).fold('anything')).toBe(x);
    });

    test('Nothing: returns the default value', () => {
      const DEFAULT = 34;
      expect(Maybe.nothing().fold(DEFAULT)).toBe(DEFAULT);
    });
  });

  // (.map) use cases

  describe('of', () => {
    test('always equivalent to Just', () => {
      expect(Maybe.of('hello')).toEqual(Maybe.just('hello'));
      expect(Maybe.of(null)).toEqual(Maybe.just(null));
      // why does this fail?
      // expect(Maybe.of(undefined)).toEqual(Maybe.just(undefined));

      expect(Maybe.of(undefined)).not.toEqual(Maybe.nothing());
    });
  });

  describe('fromNullable', () => {
    test('returns Nothing from null or undefined', () => {
      expect(Maybe.fromNullable(undefined)).toEqual(Maybe.nothing());
      expect(Maybe.fromNullable(null)).toEqual(Maybe.nothing());
    });
  });
});
