import { CacheInterface, PositiveNumber } from './types';

export { default as NewCache } from './NewCache';
export { default as DefaultAdapter, DefaultOpts } from './DefaultAdapter';

// A utility type guard for checking the input of the cache constructor.
//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isPositiveNumber(n: any): n is PositiveNumber {
  return typeof n === 'number' && n >= 0;
}

export { CacheInterface };
