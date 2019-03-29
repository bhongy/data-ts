import { Maybe, just, nothing } from './LazyMaybe';

describe('LazyMaybe', () => {
  const f = jest.fn((x: number) => x * 10);
  const g = jest.fn((x: number) => just(x / 10));

  beforeEach(() => {
    f.mockClear();
    g.mockClear();
  })

  test('Lazy: Just', () => {
    const u = just(1)
      .map(f)
      .map(f)
      .chain(g);

    expect(f).not.toHaveBeenCalled();
    expect(g).not.toHaveBeenCalled();

    const y = u.fold((): void => {}, (x: number) => x + 5);
    expect(y).toBe(15);
    expect(f).toHaveBeenCalledTimes(2);
  });

  test('Lazy: Nothing', () => {
    const u = nothing
      .map(f)
      .map(f)
      .chain(g);

    expect(f).not.toHaveBeenCalled();
    expect(g).not.toHaveBeenCalled();

    const y = u.fold((): string => 'nothing', (x: number) => x + 5);
    expect(y).toBe('nothing');

    expect(f).not.toHaveBeenCalled();
    expect(g).not.toHaveBeenCalled();
  });
});
