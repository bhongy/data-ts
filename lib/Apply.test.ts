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
    expect(u.map(compose(add10, square))).toEqual(u.map(add10).map(square));
  });

  describe('ap (specification)', () => {
    // composition: a.ap(b.ap(c.map(f => g => x => f(g(x))))) == a.ap(b).ap(c)
    it('composition', () => {
      const a = Apply.of('foo');
      const b = Apply.of((x: string) => x.toUpperCase());
      expect(a.ap(b)).toEqual(Apply.of('FOO'));
      const c = Apply.of((x: string) => x.split(''));
      expect(a.ap(b).ap(c)).toEqual(Apply.of(['F', 'O', 'O']));
    });
  });
});
