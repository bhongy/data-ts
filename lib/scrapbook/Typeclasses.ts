// WIP

interface Functor<A> {
  map<B>(f: (x: A) => B): Functor<B>;
}

interface Apply<T> {
  ap<U>(x: Apply<U>): Apply<T> ;
}

namespace FunctorStatic {
  export type map = <A, B>(f: (x: A) => B) => (fa: Functor<A>) => Functor<B>;
}

class F<T> implements Functor<T>, Apply<T> {
  static map: FunctorStatic.map = (f) => fa => fa.map(f);

  constructor(private readonly value: T) {}

  map<U>(f: (x: T) => U): Functor<U> {
    return new F(f(this.value));
  }

  // WIP incorrect
  ap<U>(x: F<U>): F<T> {
    return new F(this.value);
  }
}

// interface Apply<T> {
//   ap()
// }
