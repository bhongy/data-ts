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

// Lift a binary function to apply to Applicatives
// liftA2 :: (a -> b -> c) -> f a -> f b -> f c
// const liftA2 = <A, B, C>(f: Curried2<A, B, C>) => (ma: Maybe<A>) => (
//   mb: Maybe<B>
// ): Maybe<C> => ma.map(f).ap(mb);

// implements varient of <*>
// (*>) :: Applicative f => f a -> f b -> f b
// sequence action keep right
// (<*) :: Applicative f => f a -> f b -> f a
// sequence action keep left
// (<**>) :: Applicative f => f a -> f (a -> b) -> f b
// like (<*>) with arguments reversed
// (<$) :: a -> f b -> f a
// fmap . const - replace all locations in the input with the same value `a`

// maybe :: b -> (a -> b) -> Maybe a -> b
// http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Maybe.html#v:maybe
// const maybe = <A, B extends A>(
//   defaultValue: B,
//   f: (a: A) => B,
//   ma: Maybe<A>
// ): B => ma.fold(() => defaultValue, f);

// fromMaybe :: A -> Maybe a -> b
// const fromMaybe = <A>(defaultValue: A): Fn<Maybe<A>, A> =>
//   maybe.bind(null, defaultValue, identity);

// fromMaybe
// listToMaybe
// maybeToList
// catMaybes
// mapMaybes
