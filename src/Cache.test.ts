import { DummyAdapter, optsReceiver } from './__test__/DummyAdapter';
import NewCache, { isPositiveNumber } from './Cache';

describe('isPositiveNumber()', () => {
  it('returns true when is zero or a positive number', () => {
    expect(isPositiveNumber(10000000000000)).toBe(true);
    expect(isPositiveNumber(1)).toBe(true);
    expect(isPositiveNumber(0)).toBe(true);
  });
  it('returns false when not a positive number', () => {
    expect(isPositiveNumber(-1)).toBe(false);
    expect(isPositiveNumber(-10000000000000)).toBe(false);
  });
});

describe('NewCache provider', () => {
  it('applies the passed options to the passed adapter', () => {
    const opts = { ttl: 361 };
    NewCache<string, string>(opts, DummyAdapter);

    expect(optsReceiver).toBeCalledWith(opts);
  });
  it.skip('returns an instance of the adapter', () => {
    const opts = {};
    // const cache = NewCache<string, string>(opts, DummyAdapter);
  });
  it.skip('uses the InMemoryAdapter by default', () => {
    const opts = {};
    // const cache = NewCache<string, string>(opts);
  });
});
