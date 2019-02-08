// from: https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript

// Concept of "or" such as error handling, null checking
// type Either = Right | Left;

const Right = x => ({
  map: f => Right(f(x)),
  chain: f => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = x => ({
  map: f => Left(x), // does nothing
  chain: f => Left(x), // does nothing (return itself back)
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const fromNullable = x => (x != null ? Right(x) : Left(x));

const findColor = (colorMap, name) => fromNullable(colorMap[name]);
// the version below can handle when `colorMap` is nullable
// const findColor = (colorMap, name) =>
//   fromNullable(colorMap).chain(o => fromNullable(o[name]));

const fs = require('fs');
const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const getPort = file =>
  tryCatch(() => fs.readFileSync(file))
    .chain(s => tryCatch(() => JSON.parse(s)))
    .map(o => o.port);

const showLogin = () => 'Please login.';
const renderPage = user => `Hello, ${user}!`;
const openSite = currentUser =>
  fromNullable(currentUser).fold(showLogin, renderPage);

const DEFAULT_PREFERENCES = { name: 'john doe' };
const loadPreferences = preferences => ({ name: preferences.name });
const getPreferences = user =>
  fromNullable(user)
    .map(u => u.preferences)
    .fold(() => DEFAULT_PREFERENCES, loadPreferences);

const streetName = (user) =>
  fromNullable(user.address)
  .chain(address => fromNullable(address.street))
  .map(street => street.name)
  .fold(() => 'no street', x => x);

const concatUnique = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0]).fold(() => ys.concat(x), () => ys);

const readFileSync = filename => tryCatch(() => fs.readFileSync(filename));
const getPreview = example =>
  fromNullable(example.previewPath)
    .chain(readFileSync)
    .fold(() => example, preview => Object.assign({ preview }, example));

const parseDbUrl = config =>
  tryCatch(() => JSON.parse(config))
    .chain(c => fromNullable(c.url))
    .fold(() => null, url => url.match(/dbregex/gi));

module.exports = {
  findColor,
  getPort,
};
