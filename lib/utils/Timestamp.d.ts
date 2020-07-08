export default class Timestamp {
    secs: number;
    static now(): Timestamp;
    constructor();
    hasPassed(ttl: number): boolean;
    diffTo(ts: Timestamp): number;
}
