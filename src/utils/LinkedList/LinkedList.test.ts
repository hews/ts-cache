import LinkedList, {
  LinkedListNode as Node,
  LinkedListDirection as Direction,
} from '.';

describe('constructor()', () => {
  it('initializes an empty ll by default', () => {
    const ll = new LinkedList();

    expect(ll.head).toBeUndefined();
    expect(ll.tail).toBeUndefined();
    expect(ll.length).toBe(0);
  });
  it('initializes ll from an iterable', () => {
    const ll = new LinkedList(['alpha', 'beta', 'gamma', 'delta']);

    expect(ll.head!.data).toBe('alpha');
    expect(ll.tail!.data).toBe('delta');
    expect(ll.length).toBe(4);
  });
});

describe('pushNode()', () => {
  let ll: LinkedList<string>;
  let n1: Node<string>;
  let n2: Node<string>;

  beforeEach(() => {
    ll = new LinkedList();
    n1 = new Node({ data: 'alpha' });
    n2 = new Node({ data: 'beta' });
  });

  it('adds the node to the tail of the list', () => {
    ll.pushNode(n1);
    expect(ll.tail).toBe(n1);

    ll.pushNode(n2);
    expect(ll.tail).toBe(n2);
  });

  it('points the next of the former tail to itself', () => {
    ll.pushNode(n1);
    expect(n1.next).toBeUndefined();

    ll.pushNode(n2);
    expect(n1.next).toBe(n2);
    expect(n2.next).toBeUndefined();
  });

  it('points the nodes previous to the former tail', () => {
    ll.pushNode(n1);
    expect(n1.prev).toBe(undefined);

    ll.pushNode(n2);
    expect(n1.prev).toBe(undefined);
    expect(n2.prev).toBe(n1);
  });

  it('iterates the length', () => {
    expect(ll.length).toBe(0);

    ll.pushNode(n1);
    expect(ll.length).toBe(1);

    ll.pushNode(n2);
    expect(ll.length).toBe(2);
  });

  describe('when on an empty list', () => {
    it('adds the node to the head and tail of the list', () => {
      ll.pushNode(n1);
      expect(ll.tail).toBe(n1);
      expect(ll.head).toBe(n1);

      ll.pushNode(n2);
      expect(ll.head).toBe(n1);
    });
  });

  describe('when the node is already in the list', () => {
    it('is removed from the list first, then pushed', () => {
      ll.pushNode(n1);
      ll.pushNode(n2);
      ll.pushNode(n1);

      expect(ll.head).toBe(n2);
      expect(ll.tail).toBe(n1);
    });
    it('the length does not iterate', () => {
      ll.pushNode(n1);
      ll.pushNode(n2);
      ll.pushNode(n1);

      expect(ll.length).toBe(2);
    });
  });
});

describe('unshiftNode()', () => {
  let ll: LinkedList<string>;
  let n1: Node<string>;
  let n2: Node<string>;

  beforeEach(() => {
    ll = new LinkedList();
    n1 = new Node({ data: 'alpha' });
    n2 = new Node({ data: 'beta' });
  });

  it('adds the node to the tail of the list', () => {
    ll.unshiftNode(n1);
    expect(ll.head).toBe(n1);

    ll.unshiftNode(n2);
    expect(ll.head).toBe(n2);
  });

  it('points the prev of the former head to itself', () => {
    ll.unshiftNode(n1);
    expect(n1.prev).toBe(undefined);

    ll.unshiftNode(n2);
    expect(n1.prev).toBe(n2);
    expect(n2.prev).toBe(undefined);
  });

  it('points the nodes next to the former head', () => {
    ll.unshiftNode(n1);
    expect(n1.next).toBe(undefined);

    ll.unshiftNode(n2);
    expect(n1.next).toBe(undefined);
    expect(n2.next).toBe(n1);
  });

  it('iterates the length', () => {
    expect(ll.length).toBe(0);

    ll.unshiftNode(n1);
    expect(ll.length).toBe(1);

    ll.unshiftNode(n2);
    expect(ll.length).toBe(2);
  });

  describe('when on an empty list', () => {
    it('adds the node to the head and tail of the list', () => {
      ll.unshiftNode(n1);
      expect(ll.head).toBe(n1);
      expect(ll.tail).toBe(n1);

      ll.unshiftNode(n2);
      expect(ll.tail).toBe(n1);
    });
  });

  describe('when the node is already in the list', () => {
    it('is removed from the list first, then unshifted', () => {
      ll.unshiftNode(n2);
      ll.unshiftNode(n1);
      ll.unshiftNode(n2);

      expect(ll.head).toBe(n2);
      expect(ll.tail).toBe(n1);
    });
    it('the length does not iterate', () => {
      ll.unshiftNode(n1);
      ll.unshiftNode(n2);
      ll.unshiftNode(n1);

      expect(ll.length).toBe(2);
    });
  });
});

describe('removeNode()', () => {
  describe('when the list does not contain the node', () => {
    it('throws an error', () => {
      const ll = new LinkedList();

      expect(() => {
        ll.removeNode(new Node({ data: 'alpha' }));
      }).toThrow('removing node which does not belong to this list');

      ll.pushNode(new Node({ data: 'alpha' }));
      expect(() => {
        ll.removeNode(new Node({ data: 'alpha' }));
      }).toThrow('removing node which does not belong to this list');
    });
  });

  describe('when the list is not empty', () => {
    let ll: LinkedList<string>;
    let n1: Node<string>;
    let n2: Node<string>;
    let n3: Node<string>;
    let n4: Node<string>;

    beforeEach(() => {
      ll = new LinkedList();
      n1 = new Node({ data: 'alpha' });
      n2 = new Node({ data: 'beta' });
      n3 = new Node({ data: 'gamma' });
      n4 = new Node({ data: 'delta' });
      [n1, n2, n3, n4].forEach((n) => ll.pushNode(n));
    });

    it('decrements the length', () => {
      ll.removeNode(n1);
      expect(ll.length).toBe(3);
    });

    it('clears out the nodes pointers', () => {
      ll.removeNode(n1);
      expect(n1.data).toBe('alpha');
      expect(n1.next).toBeUndefined();
      expect(n1.prev).toBeUndefined();
      expect(n1.list).toBeUndefined();
    });

    describe('when the node is the head', () => {
      it('sets the head to be the nodes next pointer', () => {
        const { next } = n1;
        ll.removeNode(n1);
        expect(next).toBe(n2);
        expect(ll.head).toBe(next);
      });
    });

    describe('when the node is the tail', () => {
      it('sets the tail to be the nodes prev pointer', () => {
        const { prev } = n4;
        ll.removeNode(n4);
        expect(prev).toBe(n3);
        expect(ll.tail).toBe(prev);
      });
    });

    it('updates adjacent nodes pointers', () => {
      ll.removeNode(n2);
      expect(n1.next).toBe(n3);
      expect(n3.prev).toBe(n1);

      ll.removeNode(n3);
      expect(n1.next).toBe(n4);
      expect(n4.prev).toBe(n1);

      ll.removeNode(n4);
      expect(n1.next).toBeUndefined();
    });
  });

  describe('when the list has one data', () => {
    it('sets the head and tail to undefined', () => {
      const ll = new LinkedList(['alpha']);

      ll.shift();
      expect(ll!.tail).toBeUndefined();
      expect(ll!.head).toBeUndefined();
    });
  });
});

describe('push()', () => {
  describe('when passed a single data', () => {
    it('calls .pushNode() with a new Node', () => {
      const ll = new LinkedList();
      ll.pushNode = jest.fn(ll.pushNode);
      const pushNodeMock = (ll.pushNode as jest.Mock).mock;

      ll.push('alpha');
      expect(pushNodeMock.calls.length).toBe(1);
      expect(pushNodeMock.calls[0][0]!.data).toBe('alpha');
    });
  });

  describe('when passed an iterable', () => {
    it('pushes each on in a row', () => {
      const ll = new LinkedList();

      ll.push(['alpha', 'beta', 'gamma']);
      expect(ll.head!.data).toBe('alpha');
      expect(ll.tail!.data).toBe('gamma');
      expect(ll.length).toBe(3);
    });
  });
});

describe('unshift()', () => {
  describe('when passed a single data', () => {
    it('calls .unshiftNode() with a new Node', () => {
      const ll = new LinkedList();
      ll.unshiftNode = jest.fn(ll.unshiftNode);
      const unshiftNodeMock = (ll.unshiftNode as jest.Mock).mock;

      ll.unshift('alpha');
      expect(unshiftNodeMock.calls.length).toBe(1);
      expect(unshiftNodeMock.calls[0][0]!.data).toBe('alpha');
    });
  });

  describe('when passed an iterable', () => {
    it('unshifts each on in a row', () => {
      const ll = new LinkedList();

      ll.unshift(['alpha', 'beta', 'gamma']);
      expect(ll.head!.data).toBe('gamma');
      expect(ll.tail!.data).toBe('alpha');
      expect(ll.length).toBe(3);
    });
  });
});

describe('pop()', () => {
  describe('when the list is empty', () => {
    it('returns undefined and the length stays 0', () => {
      const ll = new LinkedList();

      const data = ll.pop();
      expect(data).toBeUndefined();
      expect(ll.length).toBe(0);
    });
  });

  describe('when the list is not empty', () => {
    it('calls .removeNode() with the lists tail', () => {
      const ll = new LinkedList(['alpha', 'beta']);
      const n3 = new Node<string>({ data: 'gamma' });
      ll.removeNode = jest.fn(ll.removeNode);
      const removeNodeMock = (ll.removeNode as jest.Mock).mock;

      ll.pushNode(n3);
      ll.pop();
      expect(removeNodeMock.calls.length).toBe(1);
      expect(removeNodeMock.calls[0][0]).toBe(n3);
    });

    it('returns the data of the tail', () => {
      const ll = new LinkedList(['alpha', 'beta', 'gamma']);
      expect(ll.pop()).toBe('gamma');
    });
  });
});

describe('shift()', () => {
  describe('when the list is empty', () => {
    it('returns undefined and the length stays 0', () => {
      const ll = new LinkedList();

      const data = ll.shift();
      expect(data).toBeUndefined();
      expect(ll.length).toBe(0);
    });
  });

  describe('when the list is not empty', () => {
    it('calls .removeNode() with the lists head', () => {
      const ll = new LinkedList(['beta', 'gamma']);
      const n1 = new Node<string>({ data: 'alpha' });
      ll.removeNode = jest.fn(ll.removeNode);
      const removeNodeMock = (ll.removeNode as jest.Mock).mock;

      ll.unshiftNode(n1);
      ll.shift();
      expect(removeNodeMock.calls.length).toBe(1);
      expect(removeNodeMock.calls[0][0]).toBe(n1);
    });

    it('returns the data of the head', () => {
      const ll = new LinkedList(['alpha', 'beta', 'gamma']);
      expect(ll.shift()).toBe('alpha');
    });
  });
});

describe('iterator()', () => {
  it('returns a head-to-tail walker for the list', () => {
    const ll = new LinkedList(['alpha', 'beta', 'gamma']);
    const ww = ll.iterator;

    expect(ww.list).toBe(ll);
    expect(ww.direction).toBe(Direction.Forward);
    expect(ww.curr!.data).toBe('alpha');
  });
});
