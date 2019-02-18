import * as Either from './Either';
import * as Functor from './Functor';
import * as Apply from './Apply';
// Applicative
// Chain
// Monad
// Semigroup

describe('Either', () => {
  // `Left` does not conform to these properties
  Functor.Properties(Either);
  Apply.Properties(Either);

  const square = (x: number) => x * x;

  test('Left(x) does not equal Right(x)', () => {
    expect(Either.left(35)).not.toEqual(Either.right(35));
  });

  describe('Left', () => {
    describe('.map', () => {
      it('does nothing and returns itself', () => {
        const a = Either.left(10);
        expect(a.map(square)).toEqual(a);
      });
    });

    describe('.ap', () => {
      test('does nothing and returns itself', () => {
        const u = Either.left(10);

        const left = Either.left(square);
        expect(u.ap(left)).toEqual(u);

        const right = Either.right(square);
        expect(u.ap(right)).toEqual(u);
      });
    });
  });

  describe('Right', () => {
    describe('.map', () => {
      it('is immutable', () => {
        const u = Either.right(9);
        expect(u.map(square)).not.toBe(u);
      });

      it('applies the function and returns a new Right', () => {
        const u = Either.right(10);
        expect(u.map(square)).toEqual(Either.right(100));
      });
    });

    describe('.ap', () => {
      test('Right(x).ap(Left(f)) == Left(f)', () => {
        const a = Either.right(10);
        const b = Either.left(square);
        expect(a.ap(b)).toEqual(b);
      });

      test('Right(x).ap(Right(f)) == Right(f(x))', () => {
        const a = Either.right(10);
        const b = Either.right(square);
        expect(a.ap(b)).toEqual(Either.right(square(10)));
      });
    });
  });
});
