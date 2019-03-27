import { just } from './LazyMaybe';

describe('LazyMaybe', () => {
  test('... lazy ...', () => {
    const f = jest.fn((x: number) => x * 10);
    const g = jest.fn((x: number) => just(x / 10));
    const u = just(1)
      .map(f)
      // .chain(g)
      .map(f);

    expect(f).not.toHaveBeenCalled();
    // expect(g).not.toHaveBeenCalled();

    const y = u.fold(x => x + 5);
    // expect(y).toBe(15);
    expect(y).toBe(105);
    expect(f).toHaveBeenCalledTimes(2);
  });
});
