const path = require('path');
const { findColor, getPort } = require('./Either');

describe('Either', () => {
  const colorMap = { red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' };

  test('findColor - found', () => {
    expect(
      findColor(colorMap, 'blue')
        .map(s => s.slice(1))
        .map(s => s.toUpperCase())
        .fold(() => '', x => x)
    ).toBe('3B5998');
  });

  test('findColor - not found', () => {
    expect(
      findColor(colorMap, 'green')
        .map(s => s.slice(1))
        .map(s => s.toUpperCase())
        .fold(() => 'no color', x => x)
    ).toBe('no color');
  });

  test('getPort - found', () => {
    const file = path.resolve(__dirname, 'Either-data.json');
    const DEFAULT_PORT = 3000;
    const port = getPort(file).fold(() => DEFAULT_PORT, x => x);
    expect(port).toBe(8888);
  });

  test('getPort - not found', () => {
    const DEFAULT_PORT = 3000;
    const port = getPort('file-not-exist').fold(() => DEFAULT_PORT, x => x);
    expect(port).toBe(DEFAULT_PORT);
  });
});
