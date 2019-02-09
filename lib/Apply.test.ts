import * as Apply from './Apply';

describe('Apply', () => {
  it('implements Functor specification', () => {
    const u = Apply.of(32);

    // identity
    expect(u.map(x => x)).toEqual(u);

    const add10 = (x: number) => x + 10;
    const square = (x: number) => x ** 2;

    const compose = <T, U, V>(f: (x: T) => U, g: (y: U) => V) => (x: T): V =>
      g(f(x));

    // composition
    expect(u.map(x => square(add10(x)))).toEqual(u.map(add10).map(square));
    expect(
      u.map(
        compose(
          add10,
          square
        )
      )
    ).toEqual(u.map(add10).map(square));
  });

  describe('ap (specification)', () => {
    // composition: a.ap(b.ap(c.map(f => g => x => f(g(x))))) == a.ap(b).ap(c)
    it('composition', () => {
      const toUpperCase = (x: string) => x.toUpperCase();
      const splitChars = (x: string): Array<string> => x.split('');
      const a = Apply.of('foo_1');
      const b = Apply.of(toUpperCase);
      const c = Apply.of(splitChars);
      expect(a.ap(b).ap(c)).toEqual(Apply.of(['F', 'O', 'O', '_', '1']));
    });

    // currently, it doesn't support Apply.of(square).ap(Apply.of(5));
    // which means we cannot use it for curried functions
    //   Apply.of(a => b => a + b).ap(Apply.of(1)).ap(Apply.of(2))
    it('...', () => {
      const add10 = (x: number) => x + 10;
      const square = (x: number): number => x ** 2;
      const a = Apply.of(5).ap(Apply.of(square));
      const b = Apply.of(25);
      expect(a).toEqual(b);

      const c = Apply.of(5)
        .ap(Apply.of(square))
        .ap(Apply.of(add10));

      const d = Apply.of(5).ap(
        Apply.of(square).ap(
          Apply.of(add10).map(
            // @ts-ignore
            f => g => x => f(g(x))
          )
        )
      );

      const e = Apply.of(35);

      expect(c).toEqual(d);
      expect(c).toEqual(e);
    });

    /*
    it('supports Apply.of curried function', () => {
      const sum = (a: number) => (b: number): number => a + b;
      const x = Apply.of(sum).ap(Apply.of(1)).ap(Apply.of(2))
      const y = Apply.of(3);
      expect(x).toEqual(y);
    });
    */
  });
});
