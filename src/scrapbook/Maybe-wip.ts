import { Maybe, just, nothing } from '../Maybe';

export type Predicate<T> = (x: T) => boolean;
export type Refinement<T, U extends T> = (x: T) => x is U;

// type incorrect, need to fix this one
// this also belongs in utils not specific to Maybe
const ifElse = <T, U, V>(
  predicate: Predicate<T>,
  f: (x: T) => U,
  g: (x: T) => V
) => (x: T): U | V => (predicate(x) ? f(x) : g(x));

// safe is a more generic version of fromNullable
// which takes a predicate that determines cases when to returns Just or Nothing
// safe :: (a -> Boolean) -> a -> Maybe b
// const safe = <T, U extends T>(predicate: Refinement<T, U>) =>
const safe = <T, U extends T>(predicate: Refinement<T, U>) =>
  // ifElse(predicate, just, constant(nothing));
  (x: T): Maybe<U> => (predicate(x) ? just(x) : nothing);

// maybeNumber :: a -> Maybe number
// const maybeNumber = safe(isNumber);

// TODO: implements fromNullable from `safe`

// equals :: Maybe a -> Maybe b -> boolean

/*
// https://evilsoft.github.io/crocks/docs/crocks/Maybe.html

const safeShout = compose(
  map(toUpper),
  safe(isString)
)
*/
