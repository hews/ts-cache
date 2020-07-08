import { CacheKey as Key, CacheValue as Val, CacheConstructorOptions, CacheConstructor, CacheInterface } from './types';
export default function NewCache<K extends Key, V extends Val, O extends Partial<CacheConstructorOptions>>(opts?: O, Adapter?: CacheConstructor<K, V, O>): CacheInterface<K, V>;
