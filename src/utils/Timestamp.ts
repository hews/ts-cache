// Implements some simple logic for managing seconds-based timestamps
// and timespans, especially focused on determining TTL expiration.
//
export default class Timestamp {
  secs: number;

  static now(): Timestamp {
    return new Timestamp();
  }

  constructor() {
    this.secs = Date.now() / 1000;
  }

  hasPassed(ttl: number): boolean {
    return this.diffTo(Timestamp.now()) >= ttl;
  }

  diffTo(ts: Timestamp): number {
    return ts.secs - this.secs;
  }
}
