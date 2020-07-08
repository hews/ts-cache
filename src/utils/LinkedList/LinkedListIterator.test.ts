/* eslint-disable no-restricted-syntax */

import LinkedList, {
  LinkedListNode as Node,
  LinkedListIterator as ListIterator,
  LinkedListDirection as Direction,
} from '.';

// Creates a new linked list iterator / walker of a given length, and
// also returns the underlying list and a simple array of the nodes for
// easy access in testing.
//
// NOTE: [PJ] WW is just a shorthand for "walker." "ii" is too weird.
//       Hope no confusion.
//
function setupWW(
  len: number = 0
): { ww: ListIterator<number>; ll: LinkedList<number>; nodes: Node<number>[] } {
  const ll = new LinkedList<number>();
  const nodes = new Array<Node<number>>(len);
  for (let i = 0; i < len; i++) {
    const n = new Node<number>({ data: i });
    nodes[i] = n;
    ll.pushNode(n);
  }
  return { ll, nodes, ww: new ListIterator(ll) };
}

describe('constructor()', () => {
  it('accepts a list and initializes a head-to-tail walker', () => {
    const ll = new LinkedList();
    const n1 = new Node();
    ll.pushNode(n1);

    const ww = new ListIterator(ll);
    expect(ww.list).toBe(ll);
    expect(ww.curr).toBe(n1);
    expect(ww.direction).toBe(Direction.Forward);
  });
});

describe('backward()', () => {
  it('sets the direction backward', () => {
    const ll = new LinkedList();
    const ww = new ListIterator(ll);

    expect(ww.direction).toBe(Direction.Forward);
    expect(ww.backward().direction).toBe(Direction.Backward);
  });
});

describe('forward()', () => {
  it('sets the direction forward', () => {
    const ll = new LinkedList();
    const ww = new ListIterator(ll);

    ww.direction = Direction.Backward;
    expect(ww.forward().direction).toBe(Direction.Forward);
  });
});

describe('reverse()', () => {
  it('toggles the direction', () => {
    const ll = new LinkedList();
    const ww = new ListIterator(ll);

    ww.direction = Direction.Forward;
    expect(ww.reverse().direction).toBe(Direction.Backward);
    expect(ww.reverse().direction).toBe(Direction.Forward);
    expect(ww.reverse().direction).toBe(Direction.Backward);
  });
});

describe('reset()', () => {
  describe('when the direction is forward', () => {
    it('moves the curr pointer to the head', () => {
      const { ww, ll, nodes } = setupWW(3);
      const { ww: empty } = setupWW();

      empty.direction = Direction.Forward;
      expect(empty.reset().curr).toBeUndefined();
      ww.direction = Direction.Forward;
      expect(ww.step().step().reset().curr).toBe(nodes[0]);

      // When empty.
      ww.step();
      ll.removeNode(nodes[0]);
      ll.removeNode(nodes[1]);
      ll.removeNode(nodes[2]);
      expect(ww.reset().curr).toBeUndefined();
    });
  });

  describe('when the direction is backward', () => {
    it('moves the curr pointer to the tail', () => {
      const { ww, ll, nodes } = setupWW(3);
      const { ww: empty } = setupWW();

      empty.direction = Direction.Backward;
      expect(empty.reset().curr).toBeUndefined();
      ww.direction = Direction.Backward;
      expect(ww.step().step().reset().curr).toBe(nodes[2]);

      // When empty.
      ww.step();
      ll.removeNode(nodes[0]);
      ll.removeNode(nodes[1]);
      ll.removeNode(nodes[2]);
      expect(ww.reset().curr).toBeUndefined();
    });
  });
});

describe('step()', () => {
  let ww: ListIterator<number>;
  let nodes: Node<number>[];
  let ll: LinkedList<number>;

  beforeEach(() => {
    ({ ww, ll, nodes } = setupWW(3));
  });

  it('returns the walker for chaining', () => {
    ({ ww } = setupWW());
    expect(ww.step()).toBe(ww);
  });

  describe('when the list is empty', () => {
    it('does nothing', () => {
      ({ ww } = setupWW());

      expect(ww.curr).toBeUndefined();
      expect(() => {
        ww.step();
      }).not.toThrow();
      expect(ww.curr).toBeUndefined();

      ww.backward();
      expect(() => {
        ww.step();
      }).not.toThrow();
      expect(ww.curr).toBeUndefined();
    });
  });

  describe('when the list is not empty', () => {
    it('moves the current pointer to the subsequent node (forward or backward)', () => {
      expect(ww.curr).toBe(nodes[0]);
      expect(ww.step().curr).toBe(nodes[1]);
      expect(ww.step().curr).toBe(nodes[2]);
      expect(ww.backward().step().curr).toBe(nodes[1]);
    });

    it('does not move past the end', () => {
      expect(() => {
        ww.step().step().step().step();
      }).not.toThrow();
      expect(ww.curr).toBe(nodes[2]);

      ww.backward();
      expect(() => {
        ww.step().step().step().step();
      }).not.toThrow();
      expect(ww.curr).toBe(nodes[0]);
    });
  });

  describe('when the list changes', () => {
    describe('by adding nodes to a list being walked', () => {
      it('continues its stride in a casual, impassive manner', () => {
        expect(ww.step().curr).toBe(nodes[1]);

        const n4 = new Node<number>({ data: 3 });
        ll.pushNode(n4);
        expect(ww.step().step().curr).toBe(n4);
      });
    });

    describe('by removing nodes to a list being walked', () => {
      it('continues its stride in a casual, impassive manner', () => {
        expect(ww.step().curr).toBe(nodes[1]);
        ll.removeNode(nodes[2]);
        expect(ww.step().curr).toBe(nodes[1]);
      });
    });

    describe('by deleting the current node', () => {
      it('resets curr to the start of the given direction', () => {
        expect(ww.step().curr).toBe(nodes[1]);
        ll.removeNode(nodes[1]);
        expect(ww.curr).toBe(nodes[1]);
        expect(ww.step().curr).toBe(nodes[0]);

        // and the other way!...
        ww.backward();
        ll.removeNode(nodes[0]);
        expect(ww.curr).toBe(nodes[0]);
        expect(ww.step().curr).toBe(nodes[2]);
      });
      it('resets curr to undefined when list is empty', () => {
        expect(ww.step().curr).toBe(nodes[1]);
        ll.removeNode(nodes[0]);
        ll.removeNode(nodes[1]);
        ll.removeNode(nodes[2]);

        expect(ww.step().curr).toBeUndefined();
      });
    });

    describe('by adding nodes to an empty list', () => {
      it('moves curr to the *first* node', () => {
        const n1 = new Node<number>({ data: 0 });
        const n2 = new Node<number>({ data: 1 });

        ({ ww, ll } = setupWW());
        expect(ww.curr).toBeUndefined();

        ll.pushNode(n1);
        ll.pushNode(n2);
        expect(ww.step().curr).toBe(n1);

        ({ ww, ll } = setupWW());
        expect(ww.curr).toBeUndefined();
        ll.pushNode(n1);
        ll.pushNode(n2);
        expect(ww.backward().step().curr).toBe(n2);
      });
    });
  });
});

describe('reversed', () => {
  it('returns a new, reset, reversed iterator', () => {
    const { ww: w1, nodes } = setupWW(3);

    // New.
    const w2 = w1.reversed;
    expect(w1).not.toBe(w2);
    expect(w1.list).toBe(w2.list);

    // Reversed.
    expect(w1.direction).toBe(Direction.Forward);
    expect(w2.direction).toBe(Direction.Backward);

    // Reset.
    expect(w1.curr).toBe(nodes[0]);
    expect(w2.curr).toBe(nodes[2]);
  });
});

describe('for()', () => {
  it('walks the list, passing each node and a function "done" to the callback', () => {
    const { ww, nodes } = setupWW(5);
    const cb = jest.fn();

    expect(ww.for(cb)).toBeUndefined();
    expect(cb).toHaveBeenCalledTimes(5);
    expect(cb.mock.calls[0]).toEqual([nodes[0], expect.any(Function)]);
    expect(cb.mock.calls[1]).toEqual([nodes[1], expect.any(Function)]);
    expect(cb.mock.calls[2]).toEqual([nodes[2], expect.any(Function)]);
    expect(cb.mock.calls[3]).toEqual([nodes[3], expect.any(Function)]);
    expect(cb.mock.calls[4]).toEqual([nodes[4], expect.any(Function)]);

    // ... and backwards.
    cb.mockClear();
    expect(ww.reversed.for(cb)).toBeUndefined();
    expect(cb).toHaveBeenCalledTimes(5);
    expect(cb.mock.calls[0]).toEqual([nodes[4], expect.any(Function)]);
    expect(cb.mock.calls[1]).toEqual([nodes[3], expect.any(Function)]);
    expect(cb.mock.calls[2]).toEqual([nodes[2], expect.any(Function)]);
    expect(cb.mock.calls[3]).toEqual([nodes[1], expect.any(Function)]);
    expect(cb.mock.calls[4]).toEqual([nodes[0], expect.any(Function)]);
  });
  it('stops iterating after the function "done" is invoked', () => {
    const { ww, nodes } = setupWW(5);
    const cb = jest.fn((node, done) => {
      if (node === nodes[2]) done();
    });

    ww.for(cb);
    expect(cb).toHaveBeenCalledTimes(3);

    // ... and backwards.
    cb.mockClear();
    ww.reversed.for(cb);
    expect(cb).toHaveBeenCalledTimes(3);
  });
  it('begins from the current ptr, not the start', () => {
    const { ww, nodes } = setupWW(6);
    const cb = jest.fn((node, done) => {
      if (node === nodes[1] || node === nodes[4]) done();
    });

    ww.forward().step().step().for(cb);
    expect(cb).toHaveBeenCalledTimes(3);

    // ... and backwards.
    cb.mockClear();
    ww.reversed.step().step().for(cb);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('find()', () => {
  it('walks the list, passing the data in each node to the callback, returning undef', () => {
    const { ww } = setupWW(5);
    const cb = jest.fn();

    expect(ww.find(cb)).toBeUndefined();
    expect(cb).toHaveBeenCalledTimes(5);
    expect(cb.mock.calls[0]).toEqual([0]);
    expect(cb.mock.calls[1]).toEqual([1]);
    expect(cb.mock.calls[2]).toEqual([2]);
    expect(cb.mock.calls[3]).toEqual([3]);
    expect(cb.mock.calls[4]).toEqual([4]);

    // ... and backwards.
    cb.mockClear();
    expect(ww.reversed.find(cb)).toBeUndefined();
    expect(cb).toHaveBeenCalledTimes(5);
    expect(cb.mock.calls[0]).toEqual([4]);
    expect(cb.mock.calls[1]).toEqual([3]);
    expect(cb.mock.calls[2]).toEqual([2]);
    expect(cb.mock.calls[3]).toEqual([1]);
    expect(cb.mock.calls[4]).toEqual([0]);
  });
  it('stops iterating if the callback returns a truthy value, returning the node', () => {
    const { ww, nodes } = setupWW(5);
    const cb = jest.fn((d) => (d === 2 ? 1 : 0));

    expect(ww.find(cb)).toBe(nodes[2]);
    expect(cb).toHaveBeenCalledTimes(3);

    // ... and backwards.
    cb.mockClear();
    expect(ww.reversed.find(cb)).toBe(nodes[2]);
    expect(cb).toHaveBeenCalledTimes(3);
  });
  it('iterates from the start, based on the direction', () => {
    const { ww } = setupWW(5);
    const cb = jest.fn(() => false);

    ww.forward().step().step().find(cb);
    expect(cb).toHaveBeenCalledTimes(5);
    expect(cb.mock.calls[0]).toEqual([0]);

    // ... and backwards.
    cb.mockClear();
    ww.reversed.step().step().find(cb);
    expect(cb).toHaveBeenCalledTimes(5);
    expect(cb.mock.calls[0]).toEqual([4]);
  });
});

describe('itself is iterable', () => {
  it('starts from first based on direction, iterates nodes', () => {
    const { ww, nodes } = setupWW(5);
    const cb = jest.fn();

    for (const node of ww.forward().step()) {
      cb(node);
    }
    expect(cb).toHaveBeenCalledTimes(5);
    expect(cb.mock.calls[0]).toEqual([nodes[0]]);
    expect(cb.mock.calls[1]).toEqual([nodes[1]]);
    expect(cb.mock.calls[2]).toEqual([nodes[2]]);
    expect(cb.mock.calls[3]).toEqual([nodes[3]]);
    expect(cb.mock.calls[4]).toEqual([nodes[4]]);

    // ... and backwards.
    cb.mockClear();
    for (const node of ww.reversed.step()) {
      cb(node);
    }
    expect(cb).toHaveBeenCalledTimes(5);
    expect(cb.mock.calls[0]).toEqual([nodes[4]]);
    expect(cb.mock.calls[1]).toEqual([nodes[3]]);
    expect(cb.mock.calls[2]).toEqual([nodes[2]]);
    expect(cb.mock.calls[3]).toEqual([nodes[1]]);
    expect(cb.mock.calls[4]).toEqual([nodes[0]]);
  });
});
