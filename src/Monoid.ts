/**
 * Monoid.
 *
 * Derived: Semigroup (implementation included here)
 *
 * Specification:
 * - implements `empty` function: `empty :: Monoid m => m`
 * - implements `concat` method: `concat :: Monoid m => m a ~> m a -> m a`
 *   (in Haskell this method is `append` (`<>`) also `++` for `[]` instance)
 *
 * class Semigroup a => Monoid a where
 *   mempty <> x = x
 *   x <> mempty = x
 *   x <> (y <> z) = (x <> y) <> z (Semigroup)
 *   mconcat = foldr '(<>)' mempty
 *
 * Laws:
 * - left identity: `M.empty.concat(m) == m`
 * - right identity: `m.concat(M.empty) == m`
 * - associativity: `a.concat(b).concat(c) == a.concat(b.concat(c))` (Semigroup)
 *
 * Intuitions:
 * - combining (reducing) two values of the same type into a new value of that type
 *
 * http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Monoid.html
 */

interface IMonoid<T> {
  // Semigroup
  concat(other: IMonoid<T>): IMonoid<T>;
}
export { IMonoid as Interface };

// how to enforce instead of "any" `IMonoid<T>`
// it must be the same Monoid instances
// i.e. List<T> -> List<T> or Maybe<T> -> Maybe<T>
export function Laws(M: { of: <T>(x: T) => IMonoid<T>; empty: IMonoid<never> }) {
  describe('Monoid Laws (.concat, M.empty)', () => {
    const x = 5;
    const a = M.of(x);

    // left identity: `M.empty().concat(m) == m`
    test('left identity', () => {
      expect(M.empty.concat(a)).toEqual(a);
      expect(M.empty.concat(a)).toEqual(M.of(x));
    });

    // right identity: `m.concat(M.empty()) == m`
    test('right identity', () => {
      expect(a.concat(M.empty)).toEqual(a);
    });

    // associativity: `m.chain(f).chain(g) == m.chain(x => f(x).chain(g))`
    test('associativity', () => {
      const b = M.of(70);
      const c = M.of(42);
      expect(a.concat(b).concat(c) == a.concat(b.concat(c)));
    });
  });
}
