# typescript-fp

Fantasyland-compliant Data Types written in Typescript.

![algebraic data structure dependencies](./dependencies.png)

- https://github.com/fantasyland/fantasy-land
- https://github.com/rpominov/static-land


## Run Test

```sh
$ yarn jest
$ yarn jest --watch
```

## Instances

- [ ] Identity
- [~] Either
- [ ] Maybe
- [ ] Task


## TODO Ideas

- implements instances like: Either, Maybe
- implements the lazy version of Either, Identity types that apply multiple maps per item
- implements naive, non-persistent (but immutable) versions of: LinkedList, Stack, Tree, Dictionary (still useful for small inputs)
- implements **persistent** versions of: LinkedList, Stack, Tree, Dictionary


## References

- https://github.com/fantasyland/fantasy-land
- https://github.com/rpominov/static-land
- https://github.com/gcanti/fp-ts
- https://github.com/sanctuary-js
- https://github.com/evilsoft/crocks
- https://funkia.github.io/jabz/
- https://github.com/origamitower/folktale
- https://github.com/ramda/ramda-fantasy
- https://github.com/futurize/futurize
- https://github.com/fluture-js


## Brain dump

- semigroup/monoid is useful because it allows you to implement pairwise funtions/operators and they will just work on your monoid (e.g. list). With associativity and that allows divide & conquer algorithms, parallelization, and incremental accumulation.
- function composition can be a monoid if the functions have the same type of input and output (endomorphisms)
- hence, a monad is just a monoid in the category of endofunctors

> A **functor** is a structure-preserving transformation between categories. It's some way to map objects from one category to objects of another category while also preserving the arrows between objects—think of it as a category homomorphism. ... An **endofunctor** is a functor from one category back to the same category.
https://www.quora.com/What-is-an-endofunctor

`fmap` (haskell) can be viewed as `fmap :: Functor f => (a -> b) -> (f a -> f b)` which shows the preserved structor that maps from `(a -> b)` into `(f a -> f b)`
