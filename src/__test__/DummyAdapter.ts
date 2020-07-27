import { TsCache } from '../Cache';

export const optsReceiver: (opts: any) => any = jest.fn();

export const DummyAdapter = class DummyAdapter<K, V> {
  set: (key: K, value: V, opts?: TsCache.SetOptions) => V | undefined;
  get: (key: K, opts?: TsCache.GetOptions) => V | TsCache.Entry<V> | undefined;
  has: (key: K, opts?: TsCache.HasOptions) => boolean;
  del: (key: K, opts?: TsCache.DelOptions) => V | undefined;

  constructor(opts: TsCache.Opts) {
    optsReceiver(opts);
    this.set = jest.fn(() => undefined);
    this.get = jest.fn(() => undefined);
    this.has = jest.fn(() => false);
    this.del = jest.fn(() => undefined);
  }
};
