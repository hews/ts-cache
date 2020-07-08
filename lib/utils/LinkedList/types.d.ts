/**
 * This ghost module is used to avoid triggering cyclic-dependencies in
 * the LL internals, while also adhering to single-class per file best
 * practices. Static types not necessary, so we're allowing them to be
 * codeterminative with the epxorted class definitions.
 */
export declare enum LinkedListDirection {
    Forward = "HEAD_TO_TAIL",
    Backward = "TAIL_TO_HEAD"
}
export interface LinkedListNodeInterface<T> {
    data?: T;
    prev?: LinkedListNodeInterface<T>;
    next?: LinkedListNodeInterface<T>;
    list?: LinkedListInterface<T>;
}
export interface LinkedListIteratorInterface<T> {
    list: LinkedListInterface<T>;
    curr?: LinkedListNodeInterface<T>;
    direction: LinkedListDirection;
    reversed: LinkedListIteratorInterface<T>;
    reset(): LinkedListIteratorInterface<T>;
    backward(): LinkedListIteratorInterface<T>;
    forward(): LinkedListIteratorInterface<T>;
    reverse(): LinkedListIteratorInterface<T>;
    step(): LinkedListIteratorInterface<T>;
    for(cb: (n: LinkedListNodeInterface<T>, done: () => any) => void): void;
    find(cb: (data?: T) => any): LinkedListNodeInterface<T> | undefined;
}
export interface LinkedListInterface<T> {
    head?: LinkedListNodeInterface<T>;
    tail?: LinkedListNodeInterface<T>;
    length: number;
    iterator: LinkedListIteratorInterface<T>;
    pushNode(node: LinkedListNodeInterface<T>): void;
    unshiftNode(node: LinkedListNodeInterface<T>): void;
    removeNode(node: LinkedListNodeInterface<T>): void;
    push(data: T | Iterable<T>): void;
    unshift(data: T | Iterable<T>): void;
    pop(): T | undefined;
    shift(): T | undefined;
}
