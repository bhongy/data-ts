import * as Functor from './Functor';

describe('Functor', () => {
  // identity: `u.map(a => a) == u`
  it('map ~> identity', () => {
    const identity = <T>(v: T): T => v;
    const u = Functor.of('Saarbrücken');
    expect(u.map(identity)).toEqual(u);
  });

  // composition: `u.map(x => f(g(x))) == u.map(g).map(f)`
  it('map ~> composition', () => {
    const add10 = (x: number) => x + 10;
    const square = (x: number) => x ** 2;
    const u = Functor.of(3);
    expect(u.map(x => square(add10(x)))).toEqual(u.map(add10).map(square));
  });

  // it('lift (a -> b) into (f a -> f b) function');
});
