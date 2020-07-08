"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedListDirection = void 0;

/**
 * This ghost module is used to avoid triggering cyclic-dependencies in
 * the LL internals, while also adhering to single-class per file best
 * practices. Static types not necessary, so we're allowing them to be
 * codeterminative with the epxorted class definitions.
 */
let LinkedListDirection;
exports.LinkedListDirection = LinkedListDirection;

(function (LinkedListDirection) {
  LinkedListDirection["Forward"] = "HEAD_TO_TAIL";
  LinkedListDirection["Backward"] = "TAIL_TO_HEAD";
})(LinkedListDirection || (exports.LinkedListDirection = LinkedListDirection = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9MaW5rZWRMaXN0L3R5cGVzLnRzIl0sIm5hbWVzIjpbIkxpbmtlZExpc3REaXJlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0lBT1lBLG1COzs7V0FBQUEsbUI7QUFBQUEsRUFBQUEsbUI7QUFBQUEsRUFBQUEsbUI7R0FBQUEsbUIsbUNBQUFBLG1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIGdob3N0IG1vZHVsZSBpcyB1c2VkIHRvIGF2b2lkIHRyaWdnZXJpbmcgY3ljbGljLWRlcGVuZGVuY2llcyBpblxuICogdGhlIExMIGludGVybmFscywgd2hpbGUgYWxzbyBhZGhlcmluZyB0byBzaW5nbGUtY2xhc3MgcGVyIGZpbGUgYmVzdFxuICogcHJhY3RpY2VzLiBTdGF0aWMgdHlwZXMgbm90IG5lY2Vzc2FyeSwgc28gd2UncmUgYWxsb3dpbmcgdGhlbSB0byBiZVxuICogY29kZXRlcm1pbmF0aXZlIHdpdGggdGhlIGVweG9ydGVkIGNsYXNzIGRlZmluaXRpb25zLlxuICovXG5cbmV4cG9ydCBlbnVtIExpbmtlZExpc3REaXJlY3Rpb24ge1xuICBGb3J3YXJkID0gJ0hFQURfVE9fVEFJTCcsXG4gIEJhY2t3YXJkID0gJ1RBSUxfVE9fSEVBRCcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua2VkTGlzdE5vZGVJbnRlcmZhY2U8VD4ge1xuICBkYXRhPzogVDtcbiAgcHJldj86IExpbmtlZExpc3ROb2RlSW50ZXJmYWNlPFQ+O1xuICBuZXh0PzogTGlua2VkTGlzdE5vZGVJbnRlcmZhY2U8VD47XG4gIGxpc3Q/OiBMaW5rZWRMaXN0SW50ZXJmYWNlPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpbmtlZExpc3RJdGVyYXRvckludGVyZmFjZTxUPiB7XG4gIGxpc3Q6IExpbmtlZExpc3RJbnRlcmZhY2U8VD47XG4gIGN1cnI/OiBMaW5rZWRMaXN0Tm9kZUludGVyZmFjZTxUPjtcbiAgZGlyZWN0aW9uOiBMaW5rZWRMaXN0RGlyZWN0aW9uO1xuXG4gIC8vIEdldHRlcnMvc2V0dGVycy5cbiAgcmV2ZXJzZWQ6IExpbmtlZExpc3RJdGVyYXRvckludGVyZmFjZTxUPjtcblxuICAvLyBDaGFpbmFibGUgaW50ZXJmYWNlLlxuICByZXNldCgpOiBMaW5rZWRMaXN0SXRlcmF0b3JJbnRlcmZhY2U8VD47XG4gIGJhY2t3YXJkKCk6IExpbmtlZExpc3RJdGVyYXRvckludGVyZmFjZTxUPjtcbiAgZm9yd2FyZCgpOiBMaW5rZWRMaXN0SXRlcmF0b3JJbnRlcmZhY2U8VD47XG4gIHJldmVyc2UoKTogTGlua2VkTGlzdEl0ZXJhdG9ySW50ZXJmYWNlPFQ+O1xuICBzdGVwKCk6IExpbmtlZExpc3RJdGVyYXRvckludGVyZmFjZTxUPjtcblxuICAvLyBXYWxrZXJzLlxuICBmb3IoY2I6IChuOiBMaW5rZWRMaXN0Tm9kZUludGVyZmFjZTxUPiwgZG9uZTogKCkgPT4gYW55KSA9PiB2b2lkKTogdm9pZDtcbiAgZmluZChjYjogKGRhdGE/OiBUKSA9PiBhbnkpOiBMaW5rZWRMaXN0Tm9kZUludGVyZmFjZTxUPiB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMaW5rZWRMaXN0SW50ZXJmYWNlPFQ+IHtcbiAgaGVhZD86IExpbmtlZExpc3ROb2RlSW50ZXJmYWNlPFQ+O1xuICB0YWlsPzogTGlua2VkTGlzdE5vZGVJbnRlcmZhY2U8VD47XG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIC8vIEdldHRlcnMvc2V0dGVycy5cbiAgaXRlcmF0b3I6IExpbmtlZExpc3RJdGVyYXRvckludGVyZmFjZTxUPjtcblxuICAvLyBOb2RlIGludGVyZmFjZS5cbiAgcHVzaE5vZGUobm9kZTogTGlua2VkTGlzdE5vZGVJbnRlcmZhY2U8VD4pOiB2b2lkO1xuICB1bnNoaWZ0Tm9kZShub2RlOiBMaW5rZWRMaXN0Tm9kZUludGVyZmFjZTxUPik6IHZvaWQ7XG4gIHJlbW92ZU5vZGUobm9kZTogTGlua2VkTGlzdE5vZGVJbnRlcmZhY2U8VD4pOiB2b2lkO1xuXG4gIC8vIERhdGEgaW50ZXJmYWNlLlxuICBwdXNoKGRhdGE6IFQgfCBJdGVyYWJsZTxUPik6IHZvaWQ7XG4gIHVuc2hpZnQoZGF0YTogVCB8IEl0ZXJhYmxlPFQ+KTogdm9pZDtcbiAgcG9wKCk6IFQgfCB1bmRlZmluZWQ7XG4gIHNoaWZ0KCk6IFQgfCB1bmRlZmluZWQ7XG59XG4iXX0=