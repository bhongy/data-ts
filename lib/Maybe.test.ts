import * as Maybe from './Maybe';
import * as Functor from './Functor';

describe('Maybe', () => {
  Functor.Properties(Maybe);
  // Apply
  // Applicative

  describe('fold', () => {
    test('Just: returns the contained value', () => {
      const x = 25;
      expect(Maybe.just(x).fold('anything')).toBe(x);
    });

    test('Nothing: returns the default value', () => {
      const DEFAULT = 34;
      expect(Maybe.nothing().fold(DEFAULT)).toBe(DEFAULT);
    });
  });
});
