import * as $List from './List';
// import { List } from './List';
import * as Functor from './Functor';

describe('List', () => {
  Functor.Laws($List);

  // TEST >
  // const u = empty<number>().concat(fromArray([1,3,5]));
  // TEST >
  // const v = fromArray([1,3,5]).concat(empty());
});
