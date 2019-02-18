/**
 * https://github.com/fantasyland/fantasy-land#applicative
 *
 * Extends: Apply
 *
 * Specification:
 * - implements `of` function: `of :: Applicative f => a -> f a`
 *
 * Properties:
 * - identity: `u.ap(A.of(x => x)) == u`
 * - homomorphism: `A.of(x).ap(A.of(f)) == A.of(f(x))`
 *   "homomorphism means it preserves the structure (function application)"
 * - interchange: `A.of(x).ap(u) == u.ap(A.of(f => f(x)))`
 */

// interface IApply<T> {}
// export { IApply as Interface };

// export function Properties(Subject: { of: Function }) {
//   describe('Apply Properties (.ap)', () => {
//     // composition: `a.ap(b.ap(c.map(f => g => x => f(g(x))))) == a.ap(b).ap(c)`
//     test('composition', () => {
//       const a = Subject.of(5);
//       const b = Subject.of((x: number) => x ** 2);
//       const c = Subject.of((x: number) => x * 4);
//       // @ts-ignore
//       const composed = a.ap(b.ap(c.map(f => g => x => f(g(x)))));
//       const chained = a.ap(b).ap(c);
//       expect(composed).toEqual(chained);
//       expect(composed).toEqual(Subject.of(100));
//     });

//     test('[temporary] a.ap(A(f)) is the same as a.map(f)', () => {
//       const a = Subject.of('squirrels');
//       const f = (s: string) => s.toUpperCase();
//       const b = Subject.of(f);
//       const applied = a.ap(b);
//       const mapped = a.map(f);
//       expect(applied).toEqual(mapped);
//       expect(applied).toEqual(Subject.of('SQUIRRELS'));
//     });

//     test('[temporary] can start with an Apply of a function', () => {
//       const a = Subject.of((x: number) => x ** 2);
//       const b = Subject.of((f: (x: number) => number) => f(5));
//       expect(a.ap(b)).toEqual(Subject.of(25));
//     });

//     test('[temporary] works with a curried function', () => {
//       const f = (x: number) => (y: number) => (z: number) => x * y * z;
//       const a = Subject.of(5);
//       const b = Subject.of(8);
//       const c = Subject.of(10);
//       // read `c.ap(b.ap(a.map(f)))` inside-out
//       // 1) create an Apply of a function by `a.map` (supplies the first argument, `x`)
//       // 2) `.ap` (apply) `b` (an Apply of a value) to the Apply of the partially applied function
//       //    (supplies the second argument `y`)
//       // 3) `.ap` (apply) `c` (an Apply of a value) to the Apply of the partially applied function
//       //    (supplies the last argument `z`)
//       // could also be written as: `c.ap(b.ap(a.ap(Subject.of(f))))`
//       expect(c.ap(b.ap(a.map(f)))).toEqual(Subject.of(400));
//     });
//   });
// }
