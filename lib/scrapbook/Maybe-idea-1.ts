interface IMaybe<T> {
  // lift
  // fmap
  map<U>(f: (value: T) => U): TMaybe<U>;
  // flatMap
  // bind
  // return
  // fold<U>(f: (value: T) => U): U;
  inspect(): string;
}

class Nothing implements IMaybe<any> {
  map(): Nothing {
    return new Nothing();
  }

  inspect() {
    return 'Nothing';
  }
}

class Just<T> {
  constructor(private value: T) {}

  map<U>(f: (value: T) => U): Just<U> {
    return new Just(f(this.value));
  }

  inspect() {
    // issue with object/array
    return `Just ${this.value}`;
  }
}

type TMaybe<T> = Just<T> | Nothing;

export class Maybe {
  static just<T>(value: T): Just<T> {
    if (value == null) {
      throw TypeError('Provided value must not be empty');
    }
    return new Just(value);
  }

  static nothing(): Nothing {
    return new Nothing();
  }

  // caller is responsible to translate "empty"
  // into `null` or `undefined` before invoking this function
  // static lift(value)
  static of<T>(value: T | void): TMaybe<T> {
    return value != null ? Maybe.just(value) : Maybe.nothing();
  }
}
