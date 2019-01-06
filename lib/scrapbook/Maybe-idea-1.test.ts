import { Maybe } from './Maybe';

describe('Maybe', () => {
  // it('map nothing to nothing', () => {
  //   const maybe = Maybe.of(null);
  //   expect(maybe.map(Number).inspect()).toBe('Nothing');
  // });

  it('map something', () => {
    const maybe = Maybe.of(7);
    expect(maybe.inspect()).toBe('Just 7');
  });
});
