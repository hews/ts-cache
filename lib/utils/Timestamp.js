"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Implements some simple logic for managing seconds-based timestamps
// and timespans, especially focused on determining TTL expiration.
//
class Timestamp {
  static now() {
    return new Timestamp();
  }

  constructor() {
    _defineProperty(this, "secs", void 0);

    this.secs = Date.now() / 1000;
  }

  hasPassed(ttl) {
    return this.diffTo(Timestamp.now()) >= ttl;
  }

  diffTo(ts) {
    return ts.secs - this.secs;
  }

}

exports.default = Timestamp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9UaW1lc3RhbXAudHMiXSwibmFtZXMiOlsiVGltZXN0YW1wIiwibm93IiwiY29uc3RydWN0b3IiLCJzZWNzIiwiRGF0ZSIsImhhc1Bhc3NlZCIsInR0bCIsImRpZmZUbyIsInRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDZSxNQUFNQSxTQUFOLENBQWdCO0FBRzdCLFNBQU9DLEdBQVAsR0FBd0I7QUFDdEIsV0FBTyxJQUFJRCxTQUFKLEVBQVA7QUFDRDs7QUFFREUsRUFBQUEsV0FBVyxHQUFHO0FBQUE7O0FBQ1osU0FBS0MsSUFBTCxHQUFZQyxJQUFJLENBQUNILEdBQUwsS0FBYSxJQUF6QjtBQUNEOztBQUVESSxFQUFBQSxTQUFTLENBQUNDLEdBQUQsRUFBdUI7QUFDOUIsV0FBTyxLQUFLQyxNQUFMLENBQVlQLFNBQVMsQ0FBQ0MsR0FBVixFQUFaLEtBQWdDSyxHQUF2QztBQUNEOztBQUVEQyxFQUFBQSxNQUFNLENBQUNDLEVBQUQsRUFBd0I7QUFDNUIsV0FBT0EsRUFBRSxDQUFDTCxJQUFILEdBQVUsS0FBS0EsSUFBdEI7QUFDRDs7QUFqQjRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wbGVtZW50cyBzb21lIHNpbXBsZSBsb2dpYyBmb3IgbWFuYWdpbmcgc2Vjb25kcy1iYXNlZCB0aW1lc3RhbXBzXG4vLyBhbmQgdGltZXNwYW5zLCBlc3BlY2lhbGx5IGZvY3VzZWQgb24gZGV0ZXJtaW5pbmcgVFRMIGV4cGlyYXRpb24uXG4vL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXN0YW1wIHtcbiAgc2VjczogbnVtYmVyO1xuXG4gIHN0YXRpYyBub3coKTogVGltZXN0YW1wIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZWNzID0gRGF0ZS5ub3coKSAvIDEwMDA7XG4gIH1cblxuICBoYXNQYXNzZWQodHRsOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaWZmVG8oVGltZXN0YW1wLm5vdygpKSA+PSB0dGw7XG4gIH1cblxuICBkaWZmVG8odHM6IFRpbWVzdGFtcCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRzLnNlY3MgLSB0aGlzLnNlY3M7XG4gIH1cbn1cbiJdfQ==