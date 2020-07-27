/* eslint
    no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["entry"] }] */

import { TsCache } from './Cache';
import LinkedList, {
  LinkedListNode as Node,
  LinkedListNodeInterface,
} from './utils/LinkedList';
import Timestamp from './utils/Timestamp';

declare module './Cache' {
  export namespace TsCache {
    interface InMemoryEntry<V> extends TsCache.Entry<V> {
      ttl: number;
      inserted: Timestamp;
      touched: Timestamp;
      lruNode: LinkedListNodeInterface<InMemoryEntry<V>>;
      insNode: LinkedListNodeInterface<InMemoryEntry<V>>;
    }
  }
}

export default class InMemoryAdapter<K extends string, V extends TsCache.Value>
  implements TsCache.Interface<K, V> {
  map: Map<K, TsCache.InMemoryEntry<V>> = new Map();

  lru: LinkedList<TsCache.InMemoryEntry<V>> = new LinkedList<
    TsCache.InMemoryEntry<V>
  >();

  ins: LinkedList<TsCache.InMemoryEntry<V>> = new LinkedList<
    TsCache.InMemoryEntry<V>
  >();

  evictionPolicy: TsCache.EvictionPolicies;

  ttl: number;

  size: number;

  used: number = 0;

  disposeOnUpdate: boolean;

  dispose: TsCache.DisposeCb;

  constructor(opts: TsCache.Opts = {}) {
    this.size = opts.size ?? Infinity;
    this.ttl = opts.ttl ?? Infinity;
    this.dispose = opts.dispose ?? (() => {});
    this.disposeOnUpdate = opts.disposeOnUpdate ?? true;
    this.evictionPolicy = opts.evictionPolicy ?? TsCache.EvictionPolicies.LRU;
  }

  set(
    key: K,
    value: V,
    { ttl = Infinity }: Partial<TsCache.SetOptions> = {}
  ): V | undefined {
    const inserted = new Timestamp();
    const touched = new Timestamp();
    const lruNode = new Node<TsCache.InMemoryEntry<V>>();
    const insNode = new Node<TsCache.InMemoryEntry<V>>();

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
    // this.evict();

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
    }: Partial<TsCache.GetOptions> = {}
  ): V | TsCache.Entry<V> | undefined {
    const entry = this.map.get(key);
    if (entry === undefined) {
      return undefined;
    }
    const ts = entry.inserted;
    const ttl = entry.ttl ? entry.ttl : this.ttl;
    if (ts.hasPassed(ttl)) {
      this.del(key);
      return undefined;
    }
    if (!peek) {
      this.touch(entry);
    }
    return returnEntry ? entry : entry.value;
  }

  has(key: K, { peek = false }: Partial<TsCache.HasOptions> = {}): boolean {
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
  del(key: K, opts: Partial<TsCache.DelOptions> = {}): V | undefined {
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
    opts: Partial<TsCache.SetOptions> = {}
  ): Promise<V | undefined> {
    return Promise.resolve(this.set(key, value, opts));
  }

  aget(
    key: K,
    opts: Partial<TsCache.GetOptions> = {}
  ): Promise<V | TsCache.Entry<V> | undefined> {
    return Promise.resolve(this.get(key, opts));
  }

  ahas(key: K, opts: Partial<TsCache.HasOptions> = {}): Promise<boolean> {
    return Promise.resolve(this.has(key, opts));
  }

  adel(key: K, opts: Partial<TsCache.DelOptions> = {}): Promise<V | undefined> {
    return Promise.resolve(this.del(key, opts));
  }

  touch(entry: TsCache.InMemoryEntry<V>): void {
    entry.touched = new Timestamp();
    this.lru.pushNode(entry.lruNode);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  evict(size: number): void {
    // ...
  }
}
