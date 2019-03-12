export type Lazy<A> = () => A;

export type Fn<A, B> = (a: A) => B;
export type Fn2<A, B, C> = (a: A, b: B) => C;
export type Fn3<A, B, C, D> = (a: A, b: B, c: C) => D;

export type Curried2<A, B, C> = (a: A) => (b: B) => C;
export type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D;

export const identity = <A>(a: A): A => a;
export const constant = <A>(a: A): Lazy<A> => () => a;

// return a function (lazy) that when called
// it will call the whole chain of composition
export function compose<A, B, C>(bc: Fn<B, C>, ab: Fn<A, B>): Fn<A, C>;
export function compose<A, B, C, D>(
  cd: Fn<C, D>,
  bc: Fn<B, C>,
  ab: Fn<A, B>
): Fn<A, D>;
export function compose<A, B, C, D, E>(
  de: Fn<D, E>,
  cd: Fn<C, D>,
  bc: Fn<B, C>,
  ab: Fn<A, B>
): Fn<A, E>;
export function compose(...fns: Array<Function>): Function {
  return (x: any) => fns.reduceRight((y, fn) => fn(y), x);
}

// export function curry<A, B>(fn: Fn<A, B>): Fn<A, B>;
// export function curry<A, B, C>(fn: Fn2<A, B, C>): Curried2<A, B, C>;
// export function curry<A, B, C, D>(fn: Fn3<A, B, C, D>): Curried3<A, B, C, D>;
// export function curry<A, U>(fn: (a: A, ...args: Array<any>) => U): Function {
//   return (a: A) => curry(fn.bind(fn, a));
// }
