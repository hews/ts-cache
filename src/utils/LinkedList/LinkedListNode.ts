/* eslint no-param-reassign:
    ["error", { "props": true, "ignorePropertyModificationsFor": ["next","prev"] }] */

import {
  LinkedListNodeInterface as NodeI,
  LinkedListInterface as LinkedListI,
} from './types';

// A representation of a single node on a LinkedList. In essence, it is
// just typing on a bare object, plus a constructor function to handle
// insertion logic.
//
export default class LinkedListNode<T> implements NodeI<T> {
  public data?: T;

  public prev?: NodeI<T>;

  public next?: NodeI<T>;

  public list?: LinkedListI<T>;

  constructor({ data, prev, next, list }: NodeI<T> = {}) {
    this.data = data;
    this.list = list;
    this.prev = prev;
    this.next = next;

    if (prev !== undefined) {
      prev.next = this;
    }
    if (next !== undefined) {
      next.prev = this;
    }
  }
}
