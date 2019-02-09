// from: https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript

// A Semigroup is a type with a concat method with associative property.
// always think of Semigroup when combining two things of the same type
// unlike monoid, semigroup is not safe due to the lack of neutral (empty) element

// Any types below with `empty` method are Monoid.

const Sum = x => ({
  x,
  // think: what does it mean for me to "combine" with another of the same type as me
  // concat :: Semigroup a => a ~> a -> a
  concat: ({ x: y }) => Sum(x + y),
  toString: () => `Sum(${x})`,
});

Sum.empty = () => Sum(0);

const Product = x => ({
  x,
  concat: ({ x: y }) => Product(x * y),
});

Product.empty = () => Product(1);

const Any = x => ({
  x,
  concat: ({ x: y }) => Any(x || y),
});

Any.empty = () => Any(false);

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
});

All.empty = () => All(true);

const Max = x => ({
  x,
  concat: ({ x: y }) => Max(x > y ? x : y),
});

Max.empty = () => Max(-Infinity);

const Min = x => ({
  x,
  concat: ({ x: y }) => Min(x < y ? x : y),
});

Min.empty = () => Min(Infinity);

const stats = [
  { page: 'home', views: 40 },
  { page: 'about', views: 4 },
  { page: 'blog', views: 12 },
  // { page: 'blog', views: null },
];

// can't use arrow because we need `this` to be the instance of the Array
Array.prototype.fold = function ArrayFold(empty) {
  return this.reduce((prev, x) => prev.concat(x), empty);
};

Array.prototype.foldMap = function ArrayFoldMap(f, empty) {
  // not efficient, just educational
  // relationship between these methods are clearer this way
  return this.map(f).fold(empty);
};

const Either = require('./Either');

// const viewsCount = stats.foldMap(
//   ({ views }) => Either.fromNullable(views).map(Sum),
//   Either.Right(Sum.empty())
// );

const viewsCount = stats
  // return: Array< Left<null> | Right<Sum> >
  .map(({ views }) => Either.fromNullable(views).map(Sum))
  // if we don't have array fold we can manually implement using reduce, concat
  // think: combine (concat) underlying value (Either<null,Sum>)
  // (program to `.concat` interface)
  // .reduce((prev, x) => prev.concat(x), Either.Right(Sum.empty()));
  .fold(Either.Right(Sum.empty()));

// console.log(viewsCount.toString());

const First = myEither => ({
  // get the underlying type out (Either) not First<Either>
  fold: f => f(myEither),
  // First<Either> ~> First<Either> -> First<Either>
  // if my value is Left?
  // returns the new one which is First<Either>
  // otherwise returns First(my value)
  concat: other => (Either.isLeft(myEither) ? other : First(myEither)),
  toString: () => `First(${myEither.toString()})`,
});

// what is the value that `it.concat(x)` will result in `x`
// monoid has associtivity but not commutativity i.e. you cannot switch the order
First.empty = () => First(Either.Left());

const find = test => xs =>
  xs
    // Array<First<Either>>
    .map(x => First(test(x) ? Either.Right(x) : Either.Left(null)))
    // First<Either>
    .fold(First.empty());

// `f` must be a Semigroup (can combine many types of Semigroup)
const Fn = f => ({
  fold: f,
  // creates a new function to combine `o` with me (`Fn(f)`)
  // apply Semigroup `f` to `x`
  // and combine it with the result of applying Semigroup contained in `o` (Fn)
  // to the same `x` value
  concat: o => Fn(x => f(x).concat(o.fold(x))),
});

// compose(outer, inner)
// compose(f, g) === (...args) => f(g(...args))
const compose = (...funcs) =>
  funcs.reduceRight((prev, next) => (...args) => next(prev(...args)), x => x);

const Pair = (x, y) => ({
  x,
  y,
  concat: ({ x: x1, y: y1 }) => Pair(x.concat(x1), y.concat(y1)),
});

module.exports = {
  Any,
  All,
  First,
  find,
  Fn,
  compose,
};