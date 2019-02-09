describe('First (Either)', () => {
  const { Left, Right } = require('./Either');
  const { First } = require('./Semigroup-Monoid-fold');
  it('keeps the first Right', () => {
    const actual = First(Left('foo'))
      .concat(First(Right('bar')))
      .concat(First(Right('baz')));
    expect(actual.toString()).toEqual('First(Right(bar))');
  });

  it('keeps the last Left if no Right', () => {
    const actual = First(Left('foo'))
      .concat(First(Left('bar')))
      .concat(First(Left('baz')));
    expect(actual.toString()).toEqual('First(Left(baz))');
  });
});

describe('find', () => {
  const { find } = require('./Semigroup-Monoid-fold');

  it('found', () => {
    const actual = find(x => x > 4)([2, 3, 4, 5, 6]);
    expect(actual.toString()).toBe('First(Right(5))');
  });

  it('not found', () => {
    const actual = find(x => x > 6)([2, 3, 4, 5, 6]);
    expect(actual.toString()).toBe('First(Left(null))');
  });
});

describe('Fn', () => {
  const { Any, All, Fn, compose } = require('./Semigroup-Monoid-fold');

  it('allows function composition', () => {
    const data = ['gym', 'bird', 'lilac'];

    const hasVowels = x => /[aeiou]/gi.test(x);
    const longWord = x => x.length >= 5;

    // prettier-ignore
    const both1 = Fn(compose(All, hasVowels))
          .concat(Fn(compose(All, longWord)));
    // need to do `.x` because we wraps it in `All`
    expect(data.filter(x => both1.fold(x).x)).toEqual(['lilac']);

    // prettier-ignore
    const both2 = Fn(compose(Any, hasVowels))
          .concat(Fn(compose(Any, longWord)));
    expect(data.filter(x => both2.fold(x).x)).toEqual(['bird', 'lilac']);
  });
});
