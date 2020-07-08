// CacheKey, CacheValue provide basic constraints for the key and value
// types that can be supported. Further contrainst can be placed by the
// storage adapters.
//
export type CacheKey = string | number | bigint;
export type CacheValue = NonNullable<any> | null;

// Our cache supports cache eviction policies in terms of insertion
// order (FIFO, LIFO), read order (LRU), or random access (RR). No
// eviction: or failure to set, is not supported. More complex or
// stats-based eviction policies (LFU, eg) are also not supported, both
// for general simplicity-of-use and also compatibility.
//
// A given adaptor may also limit the policies it will accept: Redis,
// would only allow LRU and RR, eg.
//
export enum CacheEvictionPolicies {
  FIFO = 'FIFO',
  LIFO = 'LIFO',
  LRU = 'LRU',
  RR = 'RR',
}

// CacheConstructorOptions define the standard set of parameters we can
// initialize a cache with. The partial interface is aliased as the
// nice-to-use CacheOpts.
//
export interface CacheConstructorOptions {
  // The maximum size of the cache, and its meaning is adapter-dependent.
  // Defaults to Infinity for the default MemoryCacheAdapter; using 0 is
  // the same as Infinity. In a non-type checked environment, be sure
  // not to pass a negative number bc that messes everything up.
  size: PositiveNumber;

  // Maximum TTL/age in seconds. Exactly how expiration is implemented
  // is controlled by the adapter.
  ttl: PositiveNumber;

  // A callback that is called on items when they are dropped from the
  // cache, either by update, removal, expiration or eviction. This
  // can be handy if you want to close file descriptors or do other
  // cleanup tasks when items are no longer accessible. Called with key,
  // value.
  //
  // It's called before actually removing the item from the internal
  // cache, so if you want to immediately put it back in, you'll have to
  // do that in a nextTick callback (or similar, setImmediate may not
  // work if we are relying on the adaptor to use some IO and step to
  // the next phase of the event loop) or it won't do anything.
  dispose: DisposeCb;

  // By default, if you set a dispose callback, then it will be called
  // whenever a set operation overwrites an existing key. If you set
  // this option, the dispose callback will only be called when a key
  // falls out of the cache (or is removed), not when it is overwritten.
  disposeOnUpdate: boolean;

  // The eviction policy to implement in the cache.
  evictionPolicy: CacheEvictionPolicies;

  // // TODO: [PJ] Allow setting a minimum buffer for cache evictions
  // // in the case that we have a high memory-pressured cache and we
  // // want to minimize the number of eviction events (PositiveNumber).
  // //
  // // Check the compatibility of this across Redis/memcached.
  // minimumEvictionSize: PositiveNumber = 0;
}
export type CacheOpts = Partial<CacheConstructorOptions>;
export type PositiveNumber = number;
export type DisposeCb = (key: CacheKey, value: CacheValue) => any;

// CacheConstructor defines the static interface for the NewCache
// provisioner: a constructor that accepts some options and returns
// a Cache interface.
export interface CacheConstructor<
  K extends CacheKey,
  V extends CacheValue,
  O extends CacheOpts
> {
  new (opts?: O): CacheInterface<K, V>;
}

// Cache entries must hold the value itself, but each adpater is free
// to append more data to the entry to implement whatever logic is
// needed.
//
export interface CacheEntry<T> {
  value: T;
}

// CacheSetOptions, CacheReadOptions, CacheHasOptions, CacheGetOptions,
// and CacheDelOptions define options objects for the cache API.
//
export interface CacheSetOptions {
  // Sets an entry-specific expiration TTL. If this is done, it is used
  // INSTEAD of any cache-wide TTL rule, not alongside it.
  ttl: number;
}
export interface CacheReadOptions {
  // When used, the accessed item will not have either it's recency or
  // read time updated. This will affect the entry's expiration (if the
  // cache is using a resetTTL strategy) and LRU eviction order.
  peek: boolean;
}
export interface CacheHasOptions extends CacheReadOptions {}
export interface CacheGetOptions extends CacheReadOptions {
  // Instead of returning just the value, return the underlying entry
  // representation, which is adapter dependent. THIS IS AN ANTI-PATTERN,
  // and only useful for debugging / profiling purposes.
  entry: boolean;
}
export interface CacheDelOptions {}

// Defines the interface for this package's Cache.
//
// There is an async (promise-based) interface, but the default methods
// are synchronous: most users want to use a cache in order to optimize
// execution, and therefore the storage is quick to access. User's code
// will usually want to prioritize calls to the cache and not hand
// control back to the event loop.
//
// If you're not using the cache this way, and as like a KV-store that
// might involve networked communication, eg, then the async interface
// is here for you.
//
export interface CacheInterface<K extends CacheKey, V extends CacheValue> {
  // Default, synchronous interface.
  set(key: K, value: V, opts?: CacheSetOptions): V | undefined;
  get(key: K, opts?: CacheGetOptions): V | CacheEntry<V> | undefined;
  has(key: K, opts?: CacheHasOptions): boolean;
  del(key: K, opts?: CacheDelOptions): V | undefined;

  // Async interface.
  aset(key: K, value: V, opts?: CacheSetOptions): Promise<V | undefined>;
  aget(key: K, opts?: CacheGetOptions): Promise<V | CacheEntry<V> | undefined>;
  ahas(key: K, opts?: CacheHasOptions): Promise<boolean>;
  adel(key: K, opts?: CacheDelOptions): Promise<V | undefined>;
}
