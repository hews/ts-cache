"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPositiveNumber = isPositiveNumber;
Object.defineProperty(exports, "NewCache", {
  enumerable: true,
  get: function () {
    return _NewCache.default;
  }
});
Object.defineProperty(exports, "DefaultAdapter", {
  enumerable: true,
  get: function () {
    return _DefaultAdapter.default;
  }
});
Object.defineProperty(exports, "DefaultOpts", {
  enumerable: true,
  get: function () {
    return _DefaultAdapter.DefaultOpts;
  }
});
Object.defineProperty(exports, "CacheInterface", {
  enumerable: true,
  get: function () {
    return _types.CacheInterface;
  }
});
Object.defineProperty(exports, "PositiveNumber", {
  enumerable: true,
  get: function () {
    return _types.PositiveNumber;
  }
});

var _NewCache = _interopRequireDefault(require("./NewCache"));

var _DefaultAdapter = _interopRequireWildcard(require("./DefaultAdapter"));

var _types = require("./types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A utility type guard for checking the input of the cache constructor.
//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isPositiveNumber(n) {
  return typeof n === 'number' && n >= 0;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJpc1Bvc2l0aXZlTnVtYmVyIiwibiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNPLFNBQVNBLGdCQUFULENBQTBCQyxDQUExQixFQUF1RDtBQUM1RCxTQUFPLE9BQU9BLENBQVAsS0FBYSxRQUFiLElBQXlCQSxDQUFDLElBQUksQ0FBckM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IGRlZmF1bHQgYXMgTmV3Q2FjaGUgfSBmcm9tICcuL05ld0NhY2hlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRGVmYXVsdEFkYXB0ZXIsIERlZmF1bHRPcHRzIH0gZnJvbSAnLi9EZWZhdWx0QWRhcHRlcic7XG5pbXBvcnQgeyBDYWNoZUludGVyZmFjZSwgUG9zaXRpdmVOdW1iZXIgfSBmcm9tICcuL3R5cGVzJztcblxuLy8gQSB1dGlsaXR5IHR5cGUgZ3VhcmQgZm9yIGNoZWNraW5nIHRoZSBpbnB1dCBvZiB0aGUgY2FjaGUgY29uc3RydWN0b3IuXG4vL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuZXhwb3J0IGZ1bmN0aW9uIGlzUG9zaXRpdmVOdW1iZXIobjogYW55KTogbiBpcyBQb3NpdGl2ZU51bWJlciB7XG4gIHJldHVybiB0eXBlb2YgbiA9PT0gJ251bWJlcicgJiYgbiA+PSAwO1xufVxuXG5leHBvcnQgeyBDYWNoZUludGVyZmFjZSwgUG9zaXRpdmVOdW1iZXIgfTtcbiJdfQ==