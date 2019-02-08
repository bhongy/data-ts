// from: https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript

// const { inspect } = require('util');

const Box = x => ({
  map: f => Box(f(x)),
  chain: f => f(x), // a.k.a. flatMap
  fold: f => f(x), // to get the value out
  // [inspect.custom]: () => `Box(${x})`,
});

const toChar = str =>
  Box(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i => i + 1)
    .fold(i => String.fromCharCode(i));

const moneyToFloat = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ''))
    .fold(parseFloat);

const percentToFloat = str =>
  Box(str)
    .map(s => s.replace(/\%/g, ''))
    .map(parseFloat)
    .fold(n => n * 0.01);

const applyDiscount = (price, discount) =>
  Box(price)
    .map(moneyToFloat)
    // use "chain" (flatMap) because create a nested Box
    .chain(cost =>
      // nesting is how we work with multiple variables in the closure
      Box(discount)
        .map(percentToFloat)
        .map(savings => cost * (1 - savings))
    )
    .fold(x => x);

module.exports = {
  toChar,
  applyDiscount,
};
