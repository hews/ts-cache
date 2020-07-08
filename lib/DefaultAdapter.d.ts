import { CacheInterface, CacheConstructorOptions, CacheKey as Key, CacheValue as Val, CacheEntry, CacheSetOptions, CacheGetOptions, CacheHasOptions, CacheDelOptions, PositiveNumber, DisposeCb, CacheEvictionPolicies } from './types';
import LinkedList, { LinkedListNode as Node } from './utils/LinkedList';
import Timestamp from './utils/Timestamp';
export interface DefaultAdapterEntry<V> extends CacheEntry<V> {
    ttl: number;
    inserted: Timestamp;
    touched: Timestamp;
    lruNode: Node<DefaultAdapterEntry<V>>;
    insNode: Node<DefaultAdapterEntry<V>>;
}
declare type Entry<V> = DefaultAdapterEntry<V>;
export interface DefaultAdapterGetOptions extends CacheGetOptions {
    stale: boolean;
}
export declare type EntrySizeCb = (entry: Entry<Val>) => PositiveNumber;
export interface DefaultAdapterConstructorOptions extends CacheConstructorOptions {
    entrySize: EntrySizeCb;
    stale: boolean;
    resetTTL: boolean;
}
export declare type DefaultOpts = Partial<DefaultAdapterConstructorOptions>;
export default class DefaultAdapter<K extends Key, V extends Val> implements CacheInterface<K, V> {
    map: Map<K, Entry<V>>;
    lru: LinkedList<Entry<V>>;
    ins: LinkedList<Entry<V>>;
    evictionPolicy: CacheEvictionPolicies;
    ttl: number;
    size: number;
    used: number;
    disposeOnUpdate: boolean;
    stale: boolean;
    resetTTL: boolean;
    entrySize: EntrySizeCb;
    dispose: DisposeCb;
    constructor(opts?: Partial<DefaultAdapterConstructorOptions>);
    set(key: K, value: V, { ttl }?: Partial<CacheSetOptions>): V | undefined;
    get(key: K, { peek, entry: returnEntry, stale, }?: Partial<DefaultAdapterGetOptions>): V | Entry<V> | undefined;
    has(key: K, { peek }?: Partial<CacheHasOptions>): boolean;
    del(key: K, opts?: Partial<CacheDelOptions>): V | undefined;
    aset(key: K, value: V, opts?: Partial<CacheSetOptions>): Promise<V | undefined>;
    aget(key: K, opts?: Partial<DefaultAdapterGetOptions>): Promise<V | Entry<V> | undefined>;
    ahas(key: K, opts?: Partial<CacheHasOptions>): Promise<boolean>;
    adel(key: K, opts?: Partial<CacheDelOptions>): Promise<V | undefined>;
    touch(entry: Entry<V>): void;
    evict(size: number): void;
}
export {};
