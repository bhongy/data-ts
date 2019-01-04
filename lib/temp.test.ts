import { add } from './temp';

describe('Temp', () => {
  it('adds numbers correct', () => {
    expect(add(10, 5)).toBe(15);
  });
});
