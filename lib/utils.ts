export type Lazy<A> = () => A;

export type Curried2<A, B, C> = (x: A) => (y: B) => C;
export type Curried3<A, B, C, D> = (x: A) => Curried2<B, C, D>;

export const identity = <A>(a: A): A => a;
export const constant = <A>(a: A): Lazy<A> => () => a;

// compose
// curry
