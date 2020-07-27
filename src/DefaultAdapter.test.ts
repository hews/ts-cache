import DefaultAdapter, { DefaultAdapterEntry } from './DefaultAdapter';

// TODO: constructor()
// TODO: evict()

describe.skip('set()/aset()', () => {
  it('stores an unstored entry, returning undefined', async () => {
    const m = new DefaultAdapter<string, number>();
    expect(m.set('alpha', 1)).toBe(undefined);
    expect(m.set('beta', 2)).toBe(undefined);

    // async ...
    await expect(m.aset('gamma', 1)).resolves.toBe(undefined);
    await expect(m.aset('delta', 2)).resolves.toBe(undefined);
  });

  it('updates a stored entry, returning previous value', async () => {
    const m = new DefaultAdapter<string, number>();
    m.set('alpha', 1);
    expect(m.set('alpha', 3)).toBe(1);
    expect(m.set('alpha', 3)).toBe(3);

    // async ...
    await m.aset('beta', 1);
    await expect(m.aset('beta', 3)).resolves.toBe(1);
    await expect(m.aset('beta', 3)).resolves.toBe(3);
  });

  it('calls evict with the amount of memory needed to fit the incoming value', () => {
    const m1 = new DefaultAdapter<string, number>();
    const m2 = new DefaultAdapter<string, number>({
      entrySize: (e: DefaultAdapterEntry<any>) => e.value * 10,
    });
    m1.evict = jest.fn();
    m1.set('alpha', 2);
    expect(m1.evict).toHaveBeenLastCalledWith(1);

    m2.evict = jest.fn();
    m2.set('alpha', 2);
    expect(m2.evict).toHaveBeenLastCalledWith(20);
  });

  describe('when updating an entry', () => {
    it('calls dispose on the overriden entry by default', () => {
      const m = new DefaultAdapter<string, number>({ dispose: jest.fn() });
      m.set('alpha', 1);
      m.set('alpha', 2);
      expect(m.dispose).toHaveBeenCalledTimes(1);
      expect(m.dispose).toHaveBeenCalledWith('alpha', 1);
    });

    it('does not call dispose on the overriden entry when disposeOnUpdate is false', () => {
      const m = new DefaultAdapter<string, number>({
        dispose: jest.fn(),
        disposeOnUpdate: false,
      });
      m.set('alpha', 1);
      m.set('alpha', 2);
      expect(m.dispose).not.toHaveBeenCalled();
    });
  });
});

describe.skip('get()/aget()', () => {
  it('returns a stored value', async () => {
    const m = new DefaultAdapter<string, number>();
    m.set('alpha', 1);
    m.set('beta', 2);
    expect(m.get('alpha')).toBe(1);
    expect(m.get('beta')).toBe(2);

    // async ...
    await expect(m.aget('alpha')).resolves.toBe(1);
    await expect(m.aget('beta')).resolves.toBe(2);
  });

  it('returns undefined when referencing an unstored key', async () => {
    const m = new DefaultAdapter<string, number>();
    expect(m.get('alpha')).toBe(undefined);
    expect(m.get('beta')).toBe(undefined);

    // async ...
    await expect(m.aget('alpha')).resolves.toBe(undefined);
    await expect(m.aget('beta')).resolves.toBe(undefined);
  });
});

describe.skip('has()/ahas()', () => {
  it('returns true when the entry is stored', async () => {
    const m = new DefaultAdapter<string, number>();
    m.set('alpha', 1);
    expect(m.has('alpha')).toBe(true);

    // async ...
    await expect(m.ahas('alpha')).resolves.toBe(true);
  });

  it('returns false when the entry is not stored', async () => {
    const m = new DefaultAdapter<string, number>();
    expect(m.has('alpha')).toBe(false);

    m.set('alpha', 1);
    m.del('alpha');
    expect(m.has('alpha')).toBe(false);

    // async ...
    m.set('alpha', 1);
    m.del('alpha');
    await expect(m.ahas('alpha')).resolves.toBe(false);
  });
});

describe.skip('del()/adel()', () => {
  it('removes the stored entry, returning the previously stored value', async () => {
    const m = new DefaultAdapter<string, number>();
    m.set('alpha', 1);
    expect(m.del('alpha')).toBe(1);
    expect(m.get('alpha')).toBe(undefined);

    // async ...
    m.set('alpha', 1);
    await expect(m.adel('alpha')).resolves.toBe(1);
    expect(m.get('alpha')).toBe(undefined);
  });

  it('returns undefined when referencing an unstored key', async () => {
    const m = new DefaultAdapter<string, number>();
    expect(m.del('alpha')).toBe(undefined);

    // async ...
    await expect(m.adel('alpha')).resolves.toBe(undefined);
  });
});
