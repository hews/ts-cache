import {
  CacheKey as Key,
  CacheValue as Val,
  CacheConstructorOptions,
  CacheConstructor,
  CacheInterface,
} from './types';
import DefaultAdapter from './DefaultAdapter';

// Provision a new cache in a simple, standardized way. Drop in a
// different adapter the necessary options type should be inferred.
//
export default function NewCache<
  K extends Key,
  V extends Val,
  O extends Partial<CacheConstructorOptions>
>(
  opts?: O,
  Adapter: CacheConstructor<K, V, O> = DefaultAdapter
): CacheInterface<K, V> {
  return new Adapter(opts);
}
