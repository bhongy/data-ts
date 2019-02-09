import * as Functor from './Functor';

describe('Functor', () => {
  describe('map (specification)', () => {
    // identity: `u.map(a => a) == u`
    it('identity', () => {
      const identity = <T>(v: T): T => v;
      const u = Functor.of('Saarbrücken');
      expect(u.map(identity)).toEqual(u);
      expect(u.map(identity)).toEqual(Functor.of('Saarbrücken'));
    });

    // composition: `u.map(x => f(g(x))) == u.map(g).map(f)`
    it('composition', () => {
      const add10 = (x: number) => x + 10;
      const square = (x: number) => x ** 2;
      const u = Functor.of(3);
      const actual = u.map(x => square(add10(x)));
      const expected = u.map(add10).map(square);
      expect(actual).toEqual(expected);
    });
  });

  describe('fold', () => {
    it('apply the function and returns the unwrapped value', () => {
      const square = (x: number) => x ** 2;
      const u = Functor.of(5);
      expect(u.fold(x => x)).toEqual(5);
      expect(u.fold(square)).toEqual(25);
    });
  });

  it('supports mapping functions', () => {
    const u = Functor.of((s: string) => s.toUpperCase())
      .map(f => (s: string) => `${f(s)}!!!`)
      .map(f => f('hello'));

    expect(u).toEqual(Functor.of('HELLO!!!'));
  });

  // it('lift (a -> b) into (f a -> f b) function');
});
