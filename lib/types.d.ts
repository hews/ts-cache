export declare type CacheKey = string | number | bigint;
export declare type CacheValue = NonNullable<any> | null;
export declare enum CacheEvictionPolicies {
    FIFO = "FIFO",
    LIFO = "LIFO",
    LRU = "LRU",
    RR = "RR"
}
export interface CacheConstructorOptions {
    size: PositiveNumber;
    ttl: PositiveNumber;
    dispose: DisposeCb;
    disposeOnUpdate: boolean;
    evictionPolicy: CacheEvictionPolicies;
}
export declare type CacheOpts = Partial<CacheConstructorOptions>;
export declare type PositiveNumber = number;
export declare type DisposeCb = (key: CacheKey, value: CacheValue) => any;
export interface CacheConstructor<K extends CacheKey, V extends CacheValue, O extends CacheOpts> {
    new (opts?: O): CacheInterface<K, V>;
}
export interface CacheEntry<T> {
    value: T;
}
export interface CacheSetOptions {
    ttl: number;
}
export interface CacheReadOptions {
    peek: boolean;
}
export interface CacheHasOptions extends CacheReadOptions {
}
export interface CacheGetOptions extends CacheReadOptions {
    entry: boolean;
}
export interface CacheDelOptions {
}
export interface CacheInterface<K extends CacheKey, V extends CacheValue> {
    set(key: K, value: V, opts?: CacheSetOptions): V | undefined;
    get(key: K, opts?: CacheGetOptions): V | CacheEntry<V> | undefined;
    has(key: K, opts?: CacheHasOptions): boolean;
    del(key: K, opts?: CacheDelOptions): V | undefined;
    aset(key: K, value: V, opts?: CacheSetOptions): Promise<V | undefined>;
    aget(key: K, opts?: CacheGetOptions): Promise<V | CacheEntry<V> | undefined>;
    ahas(key: K, opts?: CacheHasOptions): Promise<boolean>;
    adel(key: K, opts?: CacheDelOptions): Promise<V | undefined>;
}
