import LinkedList, { LinkedListNode as Node } from '.';

describe('constructor()', () => {
  it('sets a value and optional list/previous/next', () => {
    const data = 'value';

    const n1 = new Node({ data });
    expect(n1.data).toBe(data);
    expect(n1.list).toBeUndefined();
    expect(n1.prev).toBeUndefined();
    expect(n1.next).toBeUndefined();

    const list = new LinkedList();
    const prev = new Node({ data });
    const next = new Node({ data });

    const n2 = new Node({ data, list, prev, next });
    expect(n2.data).toBe(data);
    expect(n2.list).toBe(list);
    expect(n2.prev).toBe(prev);
    expect(n2.next).toBe(next);
  });
});
