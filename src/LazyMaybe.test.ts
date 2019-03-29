import { Fn } from './utils';
import { Maybe, just } from './LazyMaybe';

describe('LazyMaybe', () => {
  const f: Fn<number, number> = jest.fn((x: number) => x * 10);
  const g: Fn<number, Maybe<number>> = jest.fn((x: number) => just(x / 10));

  test('... lazy ...', () => {
    const u = just(1)
      .map(f)
      .chain(g)
      .map(f);

    expect(f).not.toHaveBeenCalled();
    expect(g).not.toHaveBeenCalled();

    const y = u.fold(() => null, (x: number) => x + 5);
    expect(y).toBe(15);
    expect(f).toHaveBeenCalledTimes(2);
  });
});
