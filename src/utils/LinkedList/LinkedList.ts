/* eslint no-param-reassign:
      ["error", { "props": true, "ignorePropertyModificationsFor": ["node"] }] */

import { LinkedListInterface, LinkedListNodeInterface as NodeI } from './types';
import ListIterator from './LinkedListIterator';
import Node from './LinkedListNode';

// A utility type assertion function for type guarding below.
//
function isIterable<T>(v: T | Iterable<T>): v is Iterable<T> {
  return (
    typeof v !== 'string' &&
    typeof (v as Iterable<T>)[Symbol.iterator] === 'function'
  );
}

// A simple, typed, doubly-linked list implementation included to allow
// us to build the LRU linked list for the default MemoryStore
// datamapper. This is also exported to allow an including library to
// build its own, more specific storage implementation, but with a (now)
// off-the-shelf linked list implementation.
//
// It's included to allow us to keep our no-dependencies cool. Based on
// {@link https://github.com/isaacs/yallist}.
//
export default class LinkedList<T> implements LinkedListInterface<T> {
  head?: NodeI<T> = undefined;

  tail?: NodeI<T> = undefined;

  length: number = 0;

  constructor(iterable?: Iterable<T>) {
    if (iterable) {
      // NOTE: [PJ] not utilizing iterable for portability.
      const arr = Array.from(iterable);
      for (let i = 0, len = arr.length; i < len; i++) {
        this.push(arr[i]);
      }
    }
  }

  pushNode(node: NodeI<T>): void {
    if (node.list) {
      node.list.removeNode(node);
    }
    node.list = this;

    const { tail } = this;
    node.prev = tail;
    if (tail) {
      tail.next = node;
    }
    this.tail = node;

    if (!this.head) {
      this.head = node;
    }
    this.length += 1;
  }

  unshiftNode(node: NodeI<T>): void {
    if (node.list) {
      node.list.removeNode(node);
    }
    node.list = this;

    const { head } = this;
    node.next = head;
    if (head) {
      head.prev = node;
    }
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
    this.length += 1;
  }

  removeNode(node: NodeI<T>): void {
    if (node.list !== this) {
      throw new Error('removing node which does not belong to this list');
    }

    const { next } = node;
    const { prev } = node;

    if (next) {
      next.prev = prev;
    }
    if (prev) {
      prev.next = next;
    }

    if (node === this.head) {
      this.head = next;
    }
    if (node === this.tail) {
      this.tail = prev;
    }

    node.next = undefined;
    node.prev = undefined;
    node.list = undefined;

    this.length -= 1;
  }

  push(data: T | Iterable<T>): void {
    if (isIterable<T>(data)) {
      // NOTE: [PJ] not utilizing iterable for portability.
      const arr = Array.from(data);
      for (let i = 0, len = arr.length; i < len; i++) {
        this.push(arr[i]);
      }
      return;
    }
    this.pushNode(new Node({ data }));
  }

  unshift(data: T | Iterable<T>): void {
    if (isIterable<T>(data)) {
      // NOTE: [PJ] not utilizing iterable for portability.
      const arr = Array.from(data);
      for (let i = 0, len = arr.length; i < len; i++) {
        this.unshift(arr[i]);
      }
      return;
    }
    this.unshiftNode(new Node({ data }));
  }

  pop(): T | undefined {
    if (this.tail === undefined) {
      return undefined;
    }
    const { data } = this.tail;
    this.removeNode(this.tail);
    return data;
  }

  shift(): T | undefined {
    if (this.head === undefined) {
      return undefined;
    }
    const { data } = this.head;
    this.removeNode(this.head);
    return data;
  }

  get iterator(): ListIterator<T> {
    return new ListIterator<T>(this);
  }
}
