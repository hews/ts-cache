/* eslint-disable no-restricted-syntax */

import {
  LinkedListDirection as Direction,
  LinkedListIteratorInterface as ListIteratorI,
  LinkedListInterface as LinkedListI,
  LinkedListNodeInterface as NodeI,
} from './types';

// Represents an iterable LinkedList with a pointer. Handles controlled
// walking behavior as well. As my man Miguel says:
//
//     «Sky-walking on these haters…»
//
export default class LinkedListIterator<T> implements ListIteratorI<T> {
  list: LinkedListI<T>;

  curr?: NodeI<T>;

  direction: Direction;

  constructor(list: LinkedListI<T>) {
    this.list = list;
    this.curr = list.head;
    this.direction = Direction.Forward;
  }

  reset(): LinkedListIterator<T> {
    this.curr =
      this.direction === Direction.Forward ? this.list.head : this.list.tail;
    return this;
  }

  backward(): LinkedListIterator<T> {
    this.direction = Direction.Backward;
    return this;
  }

  forward(): LinkedListIterator<T> {
    this.direction = Direction.Forward;
    return this;
  }

  reverse(): LinkedListIterator<T> {
    return this.direction === Direction.Forward
      ? this.backward()
      : this.forward();
  }

  step(): LinkedListIterator<T> {
    if (undefined === this.curr) {
      // QUES: [PJ] Is it worth it to not combine the top here
      //       into one check that always resets? Benchmark it, I guess?
      if (this.list.length !== 0) {
        return this.reset();
      }
      return this;
    }
    // "If the current node has been removed…"
    // NOTE: [PJ] Removing a node clears its pointers, one of which can
    //       be effectively ensured to exist here: the list.
    if (this.list !== this.curr.list) {
      return this.reset();
    }
    const ptr =
      this.direction === Direction.Forward ? this.curr.next : this.curr.prev;
    if (undefined !== ptr) {
      this.curr = ptr;
    }
    return this;
  }

  get reversed(): LinkedListIterator<T> {
    const ww = new LinkedListIterator<T>(this.list);
    return ww.reverse().reset();
  }

  for(cb: (n: NodeI<T>, done: () => any) => void): void {
    let quit = false;
    const done = () => (quit = true); // eslint-disable-line no-return-assign
    const followingPtrName =
      this.direction === Direction.Forward ? 'next' : 'prev';
    for (; this.curr; this.step()) {
      cb(this.curr, done);
      if (quit || !this.curr[followingPtrName]) break;
    }
  }

  find(cb: (data?: T) => any): NodeI<T> | undefined {
    let found;
    this.reset().for((node, done) => {
      if (cb(node.data)) {
        found = node;
        done();
      }
    });
    return found;
  }

  // TODO: [PJ] conditionally load based on environment (must
  //       must be compiled separately for that environment, or
  //       conditionally appended to class/prototype). Also:
  //       remove the no-restricted-syntax ignore rule if possible.
  *[Symbol.iterator](): IterableIterator<NodeI<T>> {
    const followingPtrName =
      this.direction === Direction.Forward ? 'next' : 'prev';
    for (this.reset(); this.curr; this.step()) {
      yield this.curr;
      if (!this.curr[followingPtrName]) break;
    }
  }
}
