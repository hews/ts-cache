"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("./types");

let _Symbol$iterator;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Symbol$iterator = Symbol.iterator;

// Represents an iterable LinkedList with a pointer. Handles controlled
// walking behavior as well. As my man Miguel says:
//
//     «Sky-walking on these haters…»
//
class LinkedListIterator {
  constructor(list) {
    _defineProperty(this, "list", void 0);

    _defineProperty(this, "curr", void 0);

    _defineProperty(this, "direction", void 0);

    this.list = list;
    this.curr = list.head;
    this.direction = _types.LinkedListDirection.Forward;
  }

  reset() {
    this.curr = this.direction === _types.LinkedListDirection.Forward ? this.list.head : this.list.tail;
    return this;
  }

  backward() {
    this.direction = _types.LinkedListDirection.Backward;
    return this;
  }

  forward() {
    this.direction = _types.LinkedListDirection.Forward;
    return this;
  }

  reverse() {
    return this.direction === _types.LinkedListDirection.Forward ? this.backward() : this.forward();
  }

  step() {
    if (undefined === this.curr) {
      // QUES: [PJ] Is it worth it to not combine the top here
      //       into one check that always resets? Benchmark it, I guess?
      if (this.list.length !== 0) {
        return this.reset();
      }

      return this;
    } // "If the current node has been removed…"
    // NOTE: [PJ] Removing a node clears its pointers, one of which can
    //       be effectively ensured to exist here: the list.


    if (this.list !== this.curr.list) {
      return this.reset();
    }

    const ptr = this.direction === _types.LinkedListDirection.Forward ? this.curr.next : this.curr.prev;

    if (undefined !== ptr) {
      this.curr = ptr;
    }

    return this;
  }

  get reversed() {
    const ww = new LinkedListIterator(this.list);
    return ww.reverse().reset();
  }

  for(cb) {
    let quit = false;

    const done = () => quit = true; // eslint-disable-line no-return-assign


    const followingPtrName = this.direction === _types.LinkedListDirection.Forward ? 'next' : 'prev';

    for (; this.curr; this.step()) {
      cb(this.curr, done);
      if (quit || !this.curr[followingPtrName]) break;
    }
  }

  find(cb) {
    let found;
    this.reset().for((node, done) => {
      if (cb(node.data)) {
        found = node;
        done();
      }
    });
    return found;
  } // TODO: [PJ] conditionally load based on environment (must
  //       must be compiled separately for that environment, or
  //       conditionally appended to class/prototype). Also:
  //       remove the no-restricted-syntax ignore rule if possible.


  *[_Symbol$iterator]() {
    const followingPtrName = this.direction === _types.LinkedListDirection.Forward ? 'next' : 'prev';

    for (this.reset(); this.curr; this.step()) {
      yield this.curr;
      if (!this.curr[followingPtrName]) break;
    }
  }

}

exports.default = LinkedListIterator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9MaW5rZWRMaXN0L0xpbmtlZExpc3RJdGVyYXRvci50cyJdLCJuYW1lcyI6WyJTeW1ib2wiLCJpdGVyYXRvciIsIkxpbmtlZExpc3RJdGVyYXRvciIsImNvbnN0cnVjdG9yIiwibGlzdCIsImN1cnIiLCJoZWFkIiwiZGlyZWN0aW9uIiwiRGlyZWN0aW9uIiwiRm9yd2FyZCIsInJlc2V0IiwidGFpbCIsImJhY2t3YXJkIiwiQmFja3dhcmQiLCJmb3J3YXJkIiwicmV2ZXJzZSIsInN0ZXAiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJwdHIiLCJuZXh0IiwicHJldiIsInJldmVyc2VkIiwid3ciLCJmb3IiLCJjYiIsInF1aXQiLCJkb25lIiwiZm9sbG93aW5nUHRyTmFtZSIsImZpbmQiLCJmb3VuZCIsIm5vZGUiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7OzttQkFxR0lBLE1BQU0sQ0FBQ0MsUTs7QUE5Rlg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLE1BQU1DLGtCQUFOLENBQXdEO0FBT3JFQyxFQUFBQSxXQUFXLENBQUNDLElBQUQsRUFBdUI7QUFBQTs7QUFBQTs7QUFBQTs7QUFDaEMsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRCxJQUFJLENBQUNFLElBQWpCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkMsMkJBQVVDLE9BQTNCO0FBQ0Q7O0FBRURDLEVBQUFBLEtBQUssR0FBMEI7QUFDN0IsU0FBS0wsSUFBTCxHQUNFLEtBQUtFLFNBQUwsS0FBbUJDLDJCQUFVQyxPQUE3QixHQUF1QyxLQUFLTCxJQUFMLENBQVVFLElBQWpELEdBQXdELEtBQUtGLElBQUwsQ0FBVU8sSUFEcEU7QUFFQSxXQUFPLElBQVA7QUFDRDs7QUFFREMsRUFBQUEsUUFBUSxHQUEwQjtBQUNoQyxTQUFLTCxTQUFMLEdBQWlCQywyQkFBVUssUUFBM0I7QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFFREMsRUFBQUEsT0FBTyxHQUEwQjtBQUMvQixTQUFLUCxTQUFMLEdBQWlCQywyQkFBVUMsT0FBM0I7QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFFRE0sRUFBQUEsT0FBTyxHQUEwQjtBQUMvQixXQUFPLEtBQUtSLFNBQUwsS0FBbUJDLDJCQUFVQyxPQUE3QixHQUNILEtBQUtHLFFBQUwsRUFERyxHQUVILEtBQUtFLE9BQUwsRUFGSjtBQUdEOztBQUVERSxFQUFBQSxJQUFJLEdBQTBCO0FBQzVCLFFBQUlDLFNBQVMsS0FBSyxLQUFLWixJQUF2QixFQUE2QjtBQUMzQjtBQUNBO0FBQ0EsVUFBSSxLQUFLRCxJQUFMLENBQVVjLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsZUFBTyxLQUFLUixLQUFMLEVBQVA7QUFDRDs7QUFDRCxhQUFPLElBQVA7QUFDRCxLQVIyQixDQVM1QjtBQUNBO0FBQ0E7OztBQUNBLFFBQUksS0FBS04sSUFBTCxLQUFjLEtBQUtDLElBQUwsQ0FBVUQsSUFBNUIsRUFBa0M7QUFDaEMsYUFBTyxLQUFLTSxLQUFMLEVBQVA7QUFDRDs7QUFDRCxVQUFNUyxHQUFHLEdBQ1AsS0FBS1osU0FBTCxLQUFtQkMsMkJBQVVDLE9BQTdCLEdBQXVDLEtBQUtKLElBQUwsQ0FBVWUsSUFBakQsR0FBd0QsS0FBS2YsSUFBTCxDQUFVZ0IsSUFEcEU7O0FBRUEsUUFBSUosU0FBUyxLQUFLRSxHQUFsQixFQUF1QjtBQUNyQixXQUFLZCxJQUFMLEdBQVljLEdBQVo7QUFDRDs7QUFDRCxXQUFPLElBQVA7QUFDRDs7QUFFRCxNQUFJRyxRQUFKLEdBQXNDO0FBQ3BDLFVBQU1DLEVBQUUsR0FBRyxJQUFJckIsa0JBQUosQ0FBMEIsS0FBS0UsSUFBL0IsQ0FBWDtBQUNBLFdBQU9tQixFQUFFLENBQUNSLE9BQUgsR0FBYUwsS0FBYixFQUFQO0FBQ0Q7O0FBRURjLEVBQUFBLEdBQUcsQ0FBQ0MsRUFBRCxFQUFtRDtBQUNwRCxRQUFJQyxJQUFJLEdBQUcsS0FBWDs7QUFDQSxVQUFNQyxJQUFJLEdBQUcsTUFBT0QsSUFBSSxHQUFHLElBQTNCLENBRm9ELENBRWxCOzs7QUFDbEMsVUFBTUUsZ0JBQWdCLEdBQ3BCLEtBQUtyQixTQUFMLEtBQW1CQywyQkFBVUMsT0FBN0IsR0FBdUMsTUFBdkMsR0FBZ0QsTUFEbEQ7O0FBRUEsV0FBTyxLQUFLSixJQUFaLEVBQWtCLEtBQUtXLElBQUwsRUFBbEIsRUFBK0I7QUFDN0JTLE1BQUFBLEVBQUUsQ0FBQyxLQUFLcEIsSUFBTixFQUFZc0IsSUFBWixDQUFGO0FBQ0EsVUFBSUQsSUFBSSxJQUFJLENBQUMsS0FBS3JCLElBQUwsQ0FBVXVCLGdCQUFWLENBQWIsRUFBMEM7QUFDM0M7QUFDRjs7QUFFREMsRUFBQUEsSUFBSSxDQUFDSixFQUFELEVBQThDO0FBQ2hELFFBQUlLLEtBQUo7QUFDQSxTQUFLcEIsS0FBTCxHQUFhYyxHQUFiLENBQWlCLENBQUNPLElBQUQsRUFBT0osSUFBUCxLQUFnQjtBQUMvQixVQUFJRixFQUFFLENBQUNNLElBQUksQ0FBQ0MsSUFBTixDQUFOLEVBQW1CO0FBQ2pCRixRQUFBQSxLQUFLLEdBQUdDLElBQVI7QUFDQUosUUFBQUEsSUFBSTtBQUNMO0FBQ0YsS0FMRDtBQU1BLFdBQU9HLEtBQVA7QUFDRCxHQW5Gb0UsQ0FxRnJFO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSx3QkFBaUQ7QUFDL0MsVUFBTUYsZ0JBQWdCLEdBQ3BCLEtBQUtyQixTQUFMLEtBQW1CQywyQkFBVUMsT0FBN0IsR0FBdUMsTUFBdkMsR0FBZ0QsTUFEbEQ7O0FBRUEsU0FBSyxLQUFLQyxLQUFMLEVBQUwsRUFBbUIsS0FBS0wsSUFBeEIsRUFBOEIsS0FBS1csSUFBTCxFQUE5QixFQUEyQztBQUN6QyxZQUFNLEtBQUtYLElBQVg7QUFDQSxVQUFJLENBQUMsS0FBS0EsSUFBTCxDQUFVdUIsZ0JBQVYsQ0FBTCxFQUFrQztBQUNuQztBQUNGOztBQWhHb0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5pbXBvcnQge1xuICBMaW5rZWRMaXN0RGlyZWN0aW9uIGFzIERpcmVjdGlvbixcbiAgTGlua2VkTGlzdEl0ZXJhdG9ySW50ZXJmYWNlIGFzIExpc3RJdGVyYXRvckksXG4gIExpbmtlZExpc3RJbnRlcmZhY2UgYXMgTGlua2VkTGlzdEksXG4gIExpbmtlZExpc3ROb2RlSW50ZXJmYWNlIGFzIE5vZGVJLFxufSBmcm9tICcuL3R5cGVzJztcblxuLy8gUmVwcmVzZW50cyBhbiBpdGVyYWJsZSBMaW5rZWRMaXN0IHdpdGggYSBwb2ludGVyLiBIYW5kbGVzIGNvbnRyb2xsZWRcbi8vIHdhbGtpbmcgYmVoYXZpb3IgYXMgd2VsbC4gQXMgbXkgbWFuIE1pZ3VlbCBzYXlzOlxuLy9cbi8vICAgICDCq1NreS13YWxraW5nIG9uIHRoZXNlIGhhdGVyc+KApsK7XG4vL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2VkTGlzdEl0ZXJhdG9yPFQ+IGltcGxlbWVudHMgTGlzdEl0ZXJhdG9ySTxUPiB7XG4gIGxpc3Q6IExpbmtlZExpc3RJPFQ+O1xuXG4gIGN1cnI/OiBOb2RlSTxUPjtcblxuICBkaXJlY3Rpb246IERpcmVjdGlvbjtcblxuICBjb25zdHJ1Y3RvcihsaXN0OiBMaW5rZWRMaXN0STxUPikge1xuICAgIHRoaXMubGlzdCA9IGxpc3Q7XG4gICAgdGhpcy5jdXJyID0gbGlzdC5oZWFkO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkZvcndhcmQ7XG4gIH1cblxuICByZXNldCgpOiBMaW5rZWRMaXN0SXRlcmF0b3I8VD4ge1xuICAgIHRoaXMuY3VyciA9XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkZvcndhcmQgPyB0aGlzLmxpc3QuaGVhZCA6IHRoaXMubGlzdC50YWlsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYmFja3dhcmQoKTogTGlua2VkTGlzdEl0ZXJhdG9yPFQ+IHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5CYWNrd2FyZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZvcndhcmQoKTogTGlua2VkTGlzdEl0ZXJhdG9yPFQ+IHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5Gb3J3YXJkO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV2ZXJzZSgpOiBMaW5rZWRMaXN0SXRlcmF0b3I8VD4ge1xuICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkZvcndhcmRcbiAgICAgID8gdGhpcy5iYWNrd2FyZCgpXG4gICAgICA6IHRoaXMuZm9yd2FyZCgpO1xuICB9XG5cbiAgc3RlcCgpOiBMaW5rZWRMaXN0SXRlcmF0b3I8VD4ge1xuICAgIGlmICh1bmRlZmluZWQgPT09IHRoaXMuY3Vycikge1xuICAgICAgLy8gUVVFUzogW1BKXSBJcyBpdCB3b3J0aCBpdCB0byBub3QgY29tYmluZSB0aGUgdG9wIGhlcmVcbiAgICAgIC8vICAgICAgIGludG8gb25lIGNoZWNrIHRoYXQgYWx3YXlzIHJlc2V0cz8gQmVuY2htYXJrIGl0LCBJIGd1ZXNzP1xuICAgICAgaWYgKHRoaXMubGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzZXQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBcIklmIHRoZSBjdXJyZW50IG5vZGUgaGFzIGJlZW4gcmVtb3ZlZOKAplwiXG4gICAgLy8gTk9URTogW1BKXSBSZW1vdmluZyBhIG5vZGUgY2xlYXJzIGl0cyBwb2ludGVycywgb25lIG9mIHdoaWNoIGNhblxuICAgIC8vICAgICAgIGJlIGVmZmVjdGl2ZWx5IGVuc3VyZWQgdG8gZXhpc3QgaGVyZTogdGhlIGxpc3QuXG4gICAgaWYgKHRoaXMubGlzdCAhPT0gdGhpcy5jdXJyLmxpc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGNvbnN0IHB0ciA9XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkZvcndhcmQgPyB0aGlzLmN1cnIubmV4dCA6IHRoaXMuY3Vyci5wcmV2O1xuICAgIGlmICh1bmRlZmluZWQgIT09IHB0cikge1xuICAgICAgdGhpcy5jdXJyID0gcHRyO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCByZXZlcnNlZCgpOiBMaW5rZWRMaXN0SXRlcmF0b3I8VD4ge1xuICAgIGNvbnN0IHd3ID0gbmV3IExpbmtlZExpc3RJdGVyYXRvcjxUPih0aGlzLmxpc3QpO1xuICAgIHJldHVybiB3dy5yZXZlcnNlKCkucmVzZXQoKTtcbiAgfVxuXG4gIGZvcihjYjogKG46IE5vZGVJPFQ+LCBkb25lOiAoKSA9PiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBsZXQgcXVpdCA9IGZhbHNlO1xuICAgIGNvbnN0IGRvbmUgPSAoKSA9PiAocXVpdCA9IHRydWUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJldHVybi1hc3NpZ25cbiAgICBjb25zdCBmb2xsb3dpbmdQdHJOYW1lID1cbiAgICAgIHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uRm9yd2FyZCA/ICduZXh0JyA6ICdwcmV2JztcbiAgICBmb3IgKDsgdGhpcy5jdXJyOyB0aGlzLnN0ZXAoKSkge1xuICAgICAgY2IodGhpcy5jdXJyLCBkb25lKTtcbiAgICAgIGlmIChxdWl0IHx8ICF0aGlzLmN1cnJbZm9sbG93aW5nUHRyTmFtZV0pIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGZpbmQoY2I6IChkYXRhPzogVCkgPT4gYW55KTogTm9kZUk8VD4gfCB1bmRlZmluZWQge1xuICAgIGxldCBmb3VuZDtcbiAgICB0aGlzLnJlc2V0KCkuZm9yKChub2RlLCBkb25lKSA9PiB7XG4gICAgICBpZiAoY2Iobm9kZS5kYXRhKSkge1xuICAgICAgICBmb3VuZCA9IG5vZGU7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICAvLyBUT0RPOiBbUEpdIGNvbmRpdGlvbmFsbHkgbG9hZCBiYXNlZCBvbiBlbnZpcm9ubWVudCAobXVzdFxuICAvLyAgICAgICBtdXN0IGJlIGNvbXBpbGVkIHNlcGFyYXRlbHkgZm9yIHRoYXQgZW52aXJvbm1lbnQsIG9yXG4gIC8vICAgICAgIGNvbmRpdGlvbmFsbHkgYXBwZW5kZWQgdG8gY2xhc3MvcHJvdG90eXBlKS4gQWxzbzpcbiAgLy8gICAgICAgcmVtb3ZlIHRoZSBuby1yZXN0cmljdGVkLXN5bnRheCBpZ25vcmUgcnVsZSBpZiBwb3NzaWJsZS5cbiAgKltTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Tm9kZUk8VD4+IHtcbiAgICBjb25zdCBmb2xsb3dpbmdQdHJOYW1lID1cbiAgICAgIHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uRm9yd2FyZCA/ICduZXh0JyA6ICdwcmV2JztcbiAgICBmb3IgKHRoaXMucmVzZXQoKTsgdGhpcy5jdXJyOyB0aGlzLnN0ZXAoKSkge1xuICAgICAgeWllbGQgdGhpcy5jdXJyO1xuICAgICAgaWYgKCF0aGlzLmN1cnJbZm9sbG93aW5nUHRyTmFtZV0pIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19