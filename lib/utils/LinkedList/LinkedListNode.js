"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint no-param-reassign:
    ["error", { "props": true, "ignorePropertyModificationsFor": ["next","prev"] }] */
// A representation of a single node on a LinkedList. In essence, it is
// just typing on a bare object, plus a constructor function to handle
// insertion logic.
//
class LinkedListNode {
  constructor({
    data,
    prev,
    next,
    list
  } = {}) {
    _defineProperty(this, "data", void 0);

    _defineProperty(this, "prev", void 0);

    _defineProperty(this, "next", void 0);

    _defineProperty(this, "list", void 0);

    this.data = data;
    this.list = list;
    this.prev = prev;
    this.next = next;

    if (prev !== undefined) {
      prev.next = this;
    }

    if (next !== undefined) {
      next.prev = this;
    }
  }

}

exports.default = LinkedListNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9MaW5rZWRMaXN0L0xpbmtlZExpc3ROb2RlLnRzIl0sIm5hbWVzIjpbIkxpbmtlZExpc3ROb2RlIiwiY29uc3RydWN0b3IiLCJkYXRhIiwicHJldiIsIm5leHQiLCJsaXN0IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLE1BQU1BLGNBQU4sQ0FBNEM7QUFTekRDLEVBQUFBLFdBQVcsQ0FBQztBQUFFQyxJQUFBQSxJQUFGO0FBQVFDLElBQUFBLElBQVI7QUFBY0MsSUFBQUEsSUFBZDtBQUFvQkMsSUFBQUE7QUFBcEIsTUFBdUMsRUFBeEMsRUFBNEM7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDckQsU0FBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0csSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFFBQUlELElBQUksS0FBS0csU0FBYixFQUF3QjtBQUN0QkgsTUFBQUEsSUFBSSxDQUFDQyxJQUFMLEdBQVksSUFBWjtBQUNEOztBQUNELFFBQUlBLElBQUksS0FBS0UsU0FBYixFQUF3QjtBQUN0QkYsTUFBQUEsSUFBSSxDQUFDRCxJQUFMLEdBQVksSUFBWjtBQUNEO0FBQ0Y7O0FBckJ3RCIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBuby1wYXJhbS1yZWFzc2lnbjpcbiAgICBbXCJlcnJvclwiLCB7IFwicHJvcHNcIjogdHJ1ZSwgXCJpZ25vcmVQcm9wZXJ0eU1vZGlmaWNhdGlvbnNGb3JcIjogW1wibmV4dFwiLFwicHJldlwiXSB9XSAqL1xuXG5pbXBvcnQge1xuICBMaW5rZWRMaXN0Tm9kZUludGVyZmFjZSBhcyBOb2RlSSxcbiAgTGlua2VkTGlzdEludGVyZmFjZSBhcyBMaW5rZWRMaXN0SSxcbn0gZnJvbSAnLi90eXBlcyc7XG5cbi8vIEEgcmVwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgbm9kZSBvbiBhIExpbmtlZExpc3QuIEluIGVzc2VuY2UsIGl0IGlzXG4vLyBqdXN0IHR5cGluZyBvbiBhIGJhcmUgb2JqZWN0LCBwbHVzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaGFuZGxlXG4vLyBpbnNlcnRpb24gbG9naWMuXG4vL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2VkTGlzdE5vZGU8VD4gaW1wbGVtZW50cyBOb2RlSTxUPiB7XG4gIHB1YmxpYyBkYXRhPzogVDtcblxuICBwdWJsaWMgcHJldj86IE5vZGVJPFQ+O1xuXG4gIHB1YmxpYyBuZXh0PzogTm9kZUk8VD47XG5cbiAgcHVibGljIGxpc3Q/OiBMaW5rZWRMaXN0STxUPjtcblxuICBjb25zdHJ1Y3Rvcih7IGRhdGEsIHByZXYsIG5leHQsIGxpc3QgfTogTm9kZUk8VD4gPSB7fSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICB0aGlzLnByZXYgPSBwcmV2O1xuICAgIHRoaXMubmV4dCA9IG5leHQ7XG5cbiAgICBpZiAocHJldiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwcmV2Lm5leHQgPSB0aGlzO1xuICAgIH1cbiAgICBpZiAobmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXh0LnByZXYgPSB0aGlzO1xuICAgIH1cbiAgfVxufVxuIl19