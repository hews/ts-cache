/* eslint
    no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["entry"] }] */

import {
  CacheInterface,
  CacheConstructorOptions,
  CacheKey as Key,
  CacheValue as Val,
  CacheEntry,
  CacheSetOptions,
  CacheGetOptions,
  CacheHasOptions,
  CacheDelOptions,
  PositiveNumber,
  DisposeCb,
  CacheEvictionPolicies,
} from './types';
import LinkedList, { LinkedListNode as Node } from './utils/LinkedList';
import Timestamp from './utils/Timestamp';

// DefaultAdapterEntry expands the default CacheEntry with necessary
// metadata for TTL and eviction.
//
export interface DefaultAdapterEntry<V> extends CacheEntry<V> {
  ttl: number;
  inserted: Timestamp;
  touched: Timestamp;
  lruNode: Node<DefaultAdapterEntry<V>>;
  insNode: Node<DefaultAdapterEntry<V>>;
}
type Entry<V> = DefaultAdapterEntry<V>; // Easy.

// DefaultAdapterGetOptions expands CacheGetOptions with a stale param.
//
export interface DefaultAdapterGetOptions extends CacheGetOptions {
  // In the case that the accessed value has expired, this instructs the
  // get to return the (stale) value before disposing of it.
  stale: boolean;
}

// EntrySizeCb is the signature of entry-size calculation callbacks.
//
export type EntrySizeCb = (entry: Entry<Val>) => PositiveNumber;

// DefaultAdapterConstructorOptions expands CacheConstructorOptions with
// paramters for instantiating and tuning the DefaultAdapter. For use by
// human people it's partial interface is aliased as DefaultOpts.
//
export interface DefaultAdapterConstructorOptions
  extends CacheConstructorOptions {
  // This adapter does not provide a facility for measuring the size of
  // stored entries. Therefore we must define the (max) size in terms of
  // some abstract value, and then we can set a function to calculate
  // the relative size of each entry and track the used size for
  // determining evictions.
  //
  // The simplest (and default) algorithm is to define the max size as
  // "max number of entries," and the entrySize callback as returning
  // "1", ie "this is a single entry."
  //
  // If you're storing strings or buffers, then you probably want to do
  // something like (key, value) => value.length.
  entrySize: EntrySizeCb;

  // While the behavior is not defined in the public API, this adapter
  // removes expired entries lazily, ie, only once they are accessed by a
  // read operation: get() or has(). This means that you can have a whole
  // bunch just lying around, taking up space.
  //
  // But it also means that we can choose to pull stale items (items that
  // have expired) and return them before deleting them. Passing the
  // stale option on construction means you want to implement this
  // behavior by default.
  //
  // Only get() is affected by this option. has() will never return true
  // for an expired item.
  stale: boolean;

  // When using a TTL with entires, the resetTTL option causes the TTL
  // to reset on any read operation: get() or has().
  resetTTL: boolean;
}
export type DefaultOpts = Partial<DefaultAdapterConstructorOptions>;

// DefaultAdapter acts as a thin wrapper around a native Map object,
// implementing the basic Cache interface with some added options for
// calculating the cache's memory pressure ("usage"/"size") and
// handling expiration (returning "stale" entries and resetting TTLs).
//
// TODO: [PJ] implement CacheConstructor on the static interface for the
// class. Not sure if the difficulties in using the class expression:
//
//   const Cache: CacheConstructor = class Cache implements Cache { ... }
//
// ... arise from a lexical inability to deal with generics for the
// static interface, a bug, or my own (probably) inability to wrap my
// head around the syntax.
//
// Example here: https://www.typescriptlang.org/docs/handbook/interfaces.html#difference-between-the-static-and-instance-sides-of-classes
//
export default class DefaultAdapter<K extends Key, V extends Val>
  implements CacheInterface<K, V> {
  map: Map<K, Entry<V>> = new Map();

  lru: LinkedList<Entry<V>> = new LinkedList<Entry<V>>();

  ins: LinkedList<Entry<V>> = new LinkedList<Entry<V>>();

  evictionPolicy: CacheEvictionPolicies;

  ttl: number;

  size: number;

  used: number = 0;

  disposeOnUpdate: boolean;

  stale: boolean;

  resetTTL: boolean;

  entrySize: EntrySizeCb;

  dispose: DisposeCb;

  constructor(opts: Partial<DefaultAdapterConstructorOptions> = {}) {
    this.size = opts.size ?? Infinity;
    this.ttl = opts.ttl ?? Infinity;
    this.dispose = opts.dispose ?? (() => {});
    this.disposeOnUpdate = opts.disposeOnUpdate ?? true;
    this.evictionPolicy = opts.evictionPolicy ?? CacheEvictionPolicies.LRU;
    this.entrySize = opts.entrySize ?? (() => 1);
    this.stale = opts.stale ?? false;
    this.resetTTL = opts.resetTTL ?? true;
  }

  set(
    key: K,
    value: V,
    { ttl = Infinity }: Partial<CacheSetOptions> = {}
  ): V | undefined {
    const inserted = new Timestamp();
    const touched = new Timestamp();
    const lruNode = new Node<Entry<V>>();
    const insNode = new Node<Entry<V>>();

    const entry = {
      ttl,
      value,
      inserted,
      touched,
      lruNode,
      insNode,
    };
    lruNode.data = entry;
    insNode.data = entry;

    const prev = this.map.get(key);
    if (prev && this.disposeOnUpdate) {
      // NOTE: [PJ] since pushing an existing node also removes it, we
      // can assume that happens below.
      this.dispose(key, prev.value);
    }
    this.evict(this.entrySize(entry));

    this.map.set(key, entry);
    this.lru.pushNode(lruNode);
    this.ins.pushNode(insNode);

    return prev?.value;
  }

  get(
    key: K,
    {
      peek = false,
      entry: returnEntry = false,
      stale = false,
    }: Partial<DefaultAdapterGetOptions> = {}
  ): V | Entry<V> | undefined {
    const entry = this.map.get(key);
    if (entry === undefined) {
      return undefined;
    }
    const ts = this.resetTTL ? entry.inserted : entry.touched;
    const ttl = entry.ttl ? entry.ttl : this.ttl;
    if (ts.hasPassed(ttl)) {
      this.del(key);
      return stale ? entry.value : undefined;
    }
    if (!peek) {
      this.touch(entry);
    }
    return returnEntry ? entry : entry.value;
  }

  has(key: K, { peek = false }: Partial<CacheHasOptions> = {}): boolean {
    const entry = this.map.get(key);
    if (entry === undefined) {
      return false;
    }
    if (!peek) {
      this.touch(entry);
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  del(key: K, opts: Partial<CacheDelOptions> = {}): V | undefined {
    const entry = this.map.get(key);
    if (entry === undefined) {
      return undefined;
    }
    this.dispose(key, entry);
    this.lru.removeNode(entry.lruNode);
    this.ins.removeNode(entry.insNode);
    this.map.delete(key);
    return entry.value;
  }

  aset(
    key: K,
    value: V,
    opts: Partial<CacheSetOptions> = {}
  ): Promise<V | undefined> {
    return Promise.resolve(this.set(key, value, opts));
  }

  aget(
    key: K,
    opts: Partial<DefaultAdapterGetOptions> = {}
  ): Promise<V | Entry<V> | undefined> {
    return Promise.resolve(this.get(key, opts));
  }

  ahas(key: K, opts: Partial<CacheHasOptions> = {}): Promise<boolean> {
    return Promise.resolve(this.has(key, opts));
  }

  adel(key: K, opts: Partial<CacheDelOptions> = {}): Promise<V | undefined> {
    return Promise.resolve(this.del(key, opts));
  }

  touch(entry: Entry<V>): void {
    entry.touched = new Timestamp();
    this.lru.pushNode(entry.lruNode);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  evict(size: number): void {
    // ...
  }
}
