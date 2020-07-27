import DefaultAdapter from './DefaultAdapter';

export type PositiveNumber = number;
export function isPositiveNumber(n: number): n is PositiveNumber {
  return typeof n === 'number' && n >= 0;
}

export declare namespace TsCache {
  export type Key = string | number | bigint;
  export type Value = NonNullable<any> | null;

  // Cache static interface.
  export enum EvictionPolicies {
    FIFO = 'FIFO',
    LIFO = 'LIFO',
    LRU = 'LRU',
    RR = 'RR',
  }
  export type DisposeCb = (key: unknown, value: unknown) => void;

  export interface InitialOptions {
    size: PositiveNumber;
    ttl: PositiveNumber;
    dispose: DisposeCb;
    disposeOnUpdate: boolean;
    evictionPolicy: EvictionPolicies;
    // minimumEvictionSize: PositiveNumber = 0; // DO NOT IMPLEMENT.
  }
  export type Opts = Partial<InitialOptions>;

  export type CacheConstructor<K, V> = (
    opts: Opts,
    Adapter: AdapterConstructor<K, V>
  ) => Interface<K, V>;

  // Adapter static interface.
  export type AdapterConstructor<K, V> = {
    new (opts?: Opts): Interface<K, V>;
  };

  // Instance interface.
  export interface Entry<V> {
    value: V;
  }
  export interface SetOptions {
    ttl: number;
  }
  export interface ReadOptions {
    peek: boolean;
  }
  export interface HasOptions extends ReadOptions {}
  export interface GetOptions extends ReadOptions {
    entry: boolean;
  }
  export interface DelOptions {}

  export interface Interface<K, V> {
    // Default, synchronous interface.
    set(key: K, value: V, opts?: SetOptions): V | undefined;
    get(key: K, opts?: GetOptions): V | Entry<V> | undefined;
    has(key: K, opts?: HasOptions): boolean;
    del(key: K, opts?: DelOptions): V | undefined;

    // // Async interface.
    // aset(key: K, value: V, opts?: SetOptions): Promise<V | undefined>;
    // aget(key: K, opts?: GetOptions): Promise<V | Entry<V> | undefined>;
    // ahas(key: K, opts?: HasOptions): Promise<boolean>;
    // adel(key: K, opts?: DelOptions): Promise<V | undefined>;
  }
}

function NewCache<K, V>(
  opts: TsCache.Opts,
  Adapter: TsCache.AdapterConstructor<K, V>
): TsCache.Interface<K, V> {
  return new Adapter(opts);
}
export default NewCache;
