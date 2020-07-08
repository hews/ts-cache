import { LinkedListInterface, LinkedListNodeInterface as NodeI } from './types';
import ListIterator from './LinkedListIterator';
export default class LinkedList<T> implements LinkedListInterface<T> {
    head?: NodeI<T>;
    tail?: NodeI<T>;
    length: number;
    constructor(iterable?: Iterable<T>);
    pushNode(node: NodeI<T>): void;
    unshiftNode(node: NodeI<T>): void;
    removeNode(node: NodeI<T>): void;
    push(data: T | Iterable<T>): void;
    unshift(data: T | Iterable<T>): void;
    pop(): T | undefined;
    shift(): T | undefined;
    get iterator(): ListIterator<T>;
}
