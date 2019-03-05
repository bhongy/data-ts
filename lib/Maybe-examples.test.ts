import { Curried3 } from './utils';
import * as Maybe from './Maybe';

describe('Maybe [Examples]', () => {
  const { just } = Maybe;

  describe('.map', () => {
    it('supports mapping of functions', () => {
      const toUpperCase = (s: string) => s.toUpperCase();
      const u = Maybe.of(toUpperCase)
        .map(f => (s: string) => `${f(s)}!!!`)
        .map(f => f('hello'));

      expect(u).toEqual(Maybe.of('HELLO!!!'));
    });
  });

  describe('.ap', () => {
    it('works with curried functions', () => {
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

    /*
    ... OLD from fantasyland/ap - need refactor to flip the applications ...

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
    */
  });
});
