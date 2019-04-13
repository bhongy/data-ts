import { empty, of, fromArray } from './List';
import { just, nothing } from './Maybe';
import * as Functor from './Functor';

describe('List', () => {
  Functor.Laws({ of });

  test('.of', () => {
    expect(of(1, 2, 3).toArray()).toEqual([1, 2, 3]);
  });

  // guard againsts a bug that result in the "cons" intuition being reversed
  test('.fromArray - identity', () => {
    expect(fromArray([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
  });

  const xs = of(1, 3, 5, 7);

  test('.concat', () => {
    // need to provide type if empty is in the input position
    const a = empty<number>().concat(xs);
    const b = xs.concat(empty());
    expect(a).toEqual(b);
    expect(a.toArray()).toEqual([1, 3, 5, 7]);

    const c = of(1, 2, 3);
    const d = of(4, 5, 6);
    expect(c.concat(d).toArray()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('.map [example]', () => {
    const square = (x: number) => x * x;
    const a = of(1, 9, 25, 49);
    expect(xs.map(square)).toEqual(a);
    expect(
      empty<number>()
        .concat(xs)
        .map(square)
    ).toEqual(a);
    expect(xs.concat(empty()).map(square)).toEqual(a);
  });

  test('.length', () => {
    expect(empty().length).toEqual(0);
    expect(xs.length).toEqual(4);
    expect(empty<number>().concat(xs).length).toEqual(4);
    expect(xs.concat(empty()).length).toEqual(4);
  });

  test('.head', () => {
    expect(empty().head).toEqual(nothing);
    expect(xs.head).toEqual(just(1));
    expect(empty<number>().concat(xs).head).toEqual(just(1));
    expect(xs.concat(empty()).head).toEqual(just(1));
  });

  test('.tail', () => {
    expect(empty().tail).toEqual(empty());
    expect(of(1).tail).toEqual(empty());
    expect(of(1, 2).tail).toEqual(of(2));
    expect(of(1, 2, 3).tail).toEqual(of(2, 3));
    expect(of(1, 2, 3).tail.toArray()).toEqual([2, 3]);
  });

  test('.last', () => {
    expect(empty().last).toEqual(nothing);
    expect(xs.last).toEqual(just(7));
    expect(empty<number>().concat(xs).last).toEqual(just(7));
    expect(xs.concat(empty()).last).toEqual(just(7));
  });

  // test('.init', () => {
  //   expect(empty().init).toEqual(empty());
  //   expect(of(1).init).toEqual(empty());
  //   expect(of(1, 2).init).toEqual(of(1));
  //   expect(of(1, 2, 3).init).toEqual(of(1, 2));
  // });

  test('.uncons', () => {
    expect(empty().uncons()).toEqual(nothing);
    expect(of(1).uncons()).toEqual(just([1, empty()]));
    expect(of(1, 2).uncons()).toEqual(just([1, of(2)]));
    expect(of(1, 2, 3).uncons()).toEqual(just([1, of(2, 3)]));
  });
});
