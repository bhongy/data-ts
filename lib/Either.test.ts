import * as Either from './Either';
import * as Functor from './Functor';
import * as Apply from './Apply';
// Applicative
// Chain
// Monad
// Semigroup

describe('Either', () => {
  // test applicative first so we know that we can lift (`of`) to the type
  // Applicative.Properties(Either);
  Functor.Properties(Either);
  Apply.Properties(Either);
  // ^ why is it okay that Left doesn't conform to these properties

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
      test('Left(a).ap(Left(b)) == Left(b)', () => {
        const a = Either.left(10);
        const b = Either.left(square);
        expect(a.ap(b)).toEqual(b);
      });

      test('Left(a).ap(Right(b)) == Left(a)', () => {
        const a = Either.left(10);
        const b = Either.right(square);
        expect(a.ap(b)).toEqual(a);
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
      test('Right(a).ap(Left(b)) == Left(b)', () => {
        const a = Either.right(10);
        const b = Either.left(square);
        expect(a.ap(b)).toEqual(b);
      });

      test('Right(a).ap(Right(b)) == Right(b(x))', () => {
        const a = Either.right(10);
        const b = Either.right(square);
        expect(a.ap(b)).toEqual(Either.right(square(10)));
      });
    });
  });
});
