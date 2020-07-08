import { LinkedListNodeInterface as NodeI, LinkedListInterface as LinkedListI } from './types';
export default class LinkedListNode<T> implements NodeI<T> {
    data?: T;
    prev?: NodeI<T>;
    next?: NodeI<T>;
    list?: LinkedListI<T>;
    constructor({ data, prev, next, list }?: NodeI<T>);
}
