const { toChar, applyDiscount } = require('./Box');

describe('Box', () => {
  test('toChar', () => {
    expect(toChar('  64 ')).toBe('A');
  });

  test('applyDiscount', () => {
    expect(applyDiscount('$5.00', '20%')).toBe(4);
  });
});
