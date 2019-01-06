class Maybe<T> {
  private constructor(private value: T | null) {}

  static some<T>(value: T) {
    if (!value) {
      throw Error("Provided value must not be empty");
    }
    return new Maybe(value);
  }

  static none<T>() {
    return new Maybe<T>(null);
  }

  static fromValue<T>(value: T) {
    return value ? Maybe.some(value) : Maybe.none();
  }

  getOrElse(defaultValue: T) {
    return this.value === null ? defaultValue : this.value;
  }
}

const foo = Maybe.some('foo').getOrElse('bar');

class Success<R> {
  result: 'success' = 'success';
  constructor(readonly payload: R) {}
}

class Failure<E> {
  result: 'failure' = 'failure';
  constructor(readonly error: E) {}
}

type Result<R, E> = Success<R> | Failure<E>;

function calculate(fail: boolean): Result<{ foo: string }, Error> {
  if (fail) {
    return new Failure(new Error('😱'));
  }
  return new Success({ foo: 'bar' });
}

const re = calculate(false);
if (re instanceof Failure) {
  re.error
} else {
  re.payload.foo
}
