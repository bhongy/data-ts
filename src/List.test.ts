import { Default as $List } from './List';
import * as Functor from './Functor';
import { just, nothing } from './Maybe';

describe('List', () => {
  Functor.Laws($List);

  const xs = $List.of(1, 3, 5, 7);

  test('.uncons', () => {
    expect($List.empty.uncons()).toEqual(nothing);
    expect($List.of(1).uncons()).toEqual(just([1, $List.empty]));
    expect($List.of(1, 2).uncons()).toEqual(just([1, $List.of(2)]));
    expect($List.of(1, 2, 3).uncons()).toEqual(just([1, $List.of(2, 3)]));
  });

  test('.concat', () => {
    // need to provide type if empty is in the input position
    const empty = $List.empty as $List.List<number>;
    expect(empty.concat(xs)).toEqual(xs);
    expect(xs.concat(empty)).toEqual(xs);

    const a = $List.of(1, 2, 3);
    const b = $List.of(4, 5, 6);
    expect(a.concat(b).toArray()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  // TODO: test via Foldable laws
  test('.foldl', () => {
    expect(xs.foldl((acc, x) => `${acc}${x}`, '')).toEqual('1357');
  });

  // TODO: test via Foldable laws
  test('.foldr', () => {
    expect(xs.foldr((x, acc) => `${acc}${x}`, '')).toEqual('7531');
  });

  test('.length', () => {
    expect($List.empty.length).toEqual(0);
    expect(xs.length).toEqual(4);
  });

  test('.head', () => {
    expect($List.empty.head).toEqual(nothing);
    expect(xs.head).toEqual(just(1));
  });

  test('.tail', () => {
    expect($List.empty.tail).toEqual($List.empty);
    expect($List.of(1).tail).toEqual($List.empty);
    expect($List.of(1, 2).tail.toArray()).toEqual([2]);
    expect($List.of(1, 2, 3).tail.toArray()).toEqual([2, 3]);
  });

  test('.last', () => {
    expect($List.empty.last).toEqual(nothing);
    expect(xs.last).toEqual(just(7));
  });

  // test('.init', () => {
  //   expect(empty.init).toEqual(empty);
  //   expect($List.of(1).init).toEqual(empty);
  //   expect($List.of(1, 2).init.toArray()).toEqual([1]);
  //   expect($List.of(1, 2, 3).init.toArray()).toEqual([1, 2]);
  // });

  test('.map [example]', () => {
    const square = (x: number) => x * x;
    expect(xs.map(square).toArray()).toEqual([1, 9, 25, 49]);
  });
});
