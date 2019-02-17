/**
 * Apply. https://github.com/fantasyland/fantasy-land#apply
 *
 * Extends: Functor
 *
 * Specification:
 * - implements `ap` method: `ap :: Apply f => f a ~> f (a -> b) -> f b`
 *   - `a` is the Apply of value (could be a function)
 *   - `b` must be an Apply of a function
 *   - `ap` applies the function `b` to value `a`
 *
 * Note: the signature was changed from `f (a -> b) -> f a -> f b`
 * use `lift` to apply a curry function with "Apply" arguments
 * - https://github.com/fantasyland/fantasy-land/issues/283#issuecomment-362183754
 * - https://github.com/fantasyland/fantasy-land/issues/242
 * - https://github.com/fantasyland/fantasy-land/issues/181
 *
 * This signature is conceptually similar to `value.apply(function)`
 * while the old (Haskell-consistent) signature
 * is conceptually similar to `function.appy(value)`
 *
 * Properties:
 * - composition: `c.ap(b.ap(a.map(f => g => x => f(g(x))))) == c.ap(b).ap(a)`
 */

interface IApply<T> {
  // a.k.a. apply contained value to a container of function
  // you might get a container of partially applied function or a value out
  ap<U>(b: IApply<(x: T) => U>): IApply<U>;
}

export { IApply as Interface };

export function Properties(Subject: { of: Function }) {
  describe('Apply Properties (.ap)', () => {
    // composition: `a.ap(b.ap(c.map(f => g => x => f(g(x))))) == a.ap(b).ap(c)`
    test('composition', () => {
      const a = Subject.of(5);
      const b = Subject.of((x: number) => x ** 2);
      const c = Subject.of((x: number) => x * 4);
      // @ts-ignore
      const composed = a.ap(b.ap(c.map(f => g => x => f(g(x)))));
      const chained = a.ap(b).ap(c);
      expect(composed).toEqual(chained);
      expect(composed).toEqual(Subject.of(100));
    });

    test('[temporary] a.ap(A(f)) is the same as a.map(f)', () => {
      const a = Subject.of('squirrels');
      const f = (s: string) => s.toUpperCase();
      const b = Subject.of(f);
      const applied = a.ap(b);
      const mapped = a.map(f);
      expect(applied).toEqual(mapped);
      expect(applied).toEqual(Subject.of('SQUIRRELS'));
    });

    test('[temporary] can start with an Apply of a function', () => {
      const a = Subject.of((x: number) => x ** 2);
      const b = Subject.of((f: (x: number) => number) => f(5));
      expect(a.ap(b)).toEqual(Subject.of(25));
    });

    test('[temporary] works with a curried function', () => {
      const f = (x: number) => (y: number) => (z: number) => x * y * z;
      const a = Subject.of(5);
      const b = Subject.of(8);
      const c = Subject.of(10);
      // read `c.ap(b.ap(a.map(f)))` inside-out
      // 1) create an Apply of a function by `a.map` (supplies the first argument, `x`)
      // 2) `.ap` (apply) `b` (an Apply of a value) to the Apply of the partially applied function
      //    (supplies the second argument `y`)
      // 3) `.ap` (apply) `c` (an Apply of a value) to the Apply of the partially applied function
      //    (supplies the last argument `z`)
      // could also be written as: `c.ap(b.ap(a.ap(Subject.of(f))))`
      expect(c.ap(b.ap(a.map(f)))).toEqual(Subject.of(400));
    });
  });
}
