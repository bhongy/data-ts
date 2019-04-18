// type Readonly<T> = { readonly [P in keyof T]: T[P] };
// type Partial<T> = { [P in keyof T]?: T[P] };
// type Required<T> = { [P in keyof T]-?: T[P] };
// type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// lodash.pick is pretty much typed this way
function pick<T extends object, K extends keyof T>(
  o: T,
  keys: Array<K>
): Pick<T, K> {
  return keys.reduce((r, k) => ({ ...r, [k]: o[k] }), {}) as Pick<T, K>;
}

const re = pick({ a: 10, b: false }, ['a']);
// re.a
// re.b

// function omit<T, K extends keyof T>(o: T, keys: Array<K>): Omit<T,K> {
//   return keys.reduce((r, k) => )
// }

function pluck<T, K extends keyof T>(o: T, keys: Array<K>): T[K][] {
  return keys.map(k => o[k]);
}

function filterMap<T, U>(
  pred: (x: T) => boolean,
  f: (x: T) => U,
  xs: Array<T>
): Array<U> {
  return xs.reduce((ys, x) => (pred(x) ? [...ys, f(x)] : ys), [] as Array<U>);
}

function partitionMap<T, L, R>(
  isLeft: (x: T) => boolean,
  mapL: (x: T) => L,
  mapR: (x: T) => R,
  xs: Array<T>
): [Array<L>, Array<R>] {
  const left: Array<L> = [];
  const right: Array<R> = [];
  xs.forEach(x => {
    isLeft(x) ? left.push(mapL(x)) : right.push(mapR(x));
  });
  return [left, right];
}
