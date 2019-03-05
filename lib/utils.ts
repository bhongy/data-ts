export type Lazy<A> = () => A;

export type Fn<A, B> = (a: A) => B;
export type Fn2<A, B, C> = (a: A, b: B) => C;
export type Fn3<A, B, C, D> = (a: A, b: B, c: C) => D;

export type Curried2<A, B, C> = (a: A) => (b: B) => C;
export type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D;

export const identity = <A>(a: A): A => a;
export const constant = <A>(a: A): Lazy<A> => () => a;

// compose

// export function curry<A, B>(fn: Fn<A, B>): Fn<A, B>;
// export function curry<A, B, C>(fn: Fn2<A, B, C>): Curried2<A, B, C>;
// export function curry<A, B, C, D>(fn: Fn3<A, B, C, D>): Curried3<A, B, C, D>;
// export function curry<A, U>(fn: (a: A, ...args: Array<any>) => U): Function {
//   return (a: A) => curry(fn.bind(fn, a));
// }
