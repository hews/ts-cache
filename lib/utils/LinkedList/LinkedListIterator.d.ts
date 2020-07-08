import { LinkedListDirection as Direction, LinkedListIteratorInterface as ListIteratorI, LinkedListInterface as LinkedListI, LinkedListNodeInterface as NodeI } from './types';
export default class LinkedListIterator<T> implements ListIteratorI<T> {
    list: LinkedListI<T>;
    curr?: NodeI<T>;
    direction: Direction;
    constructor(list: LinkedListI<T>);
    reset(): LinkedListIterator<T>;
    backward(): LinkedListIterator<T>;
    forward(): LinkedListIterator<T>;
    reverse(): LinkedListIterator<T>;
    step(): LinkedListIterator<T>;
    get reversed(): LinkedListIterator<T>;
    for(cb: (n: NodeI<T>, done: () => any) => void): void;
    find(cb: (data?: T) => any): NodeI<T> | undefined;
    [Symbol.iterator](): IterableIterator<NodeI<T>>;
}
