/* eslint-disable import/no-extraneous-dependencies, no-console */

const { NewCache, DefaultAdapter } = require('ts-cache');

const cache1 = NewCache();
console.log(`
DEFAULT SETTINGS (JS) ->
    SET(one,1): ${cache1.set('one', 1)}
    GET(one):   ${cache1.get('one')}
    HAS(one):   ${cache1.has('one')}
    SET(two,1): ${cache1.set('two', 1)}
    SET(two,2): ${cache1.set('two', 2)}
    GET(two):   ${cache1.get('two')}
    SET(tre,3): ${cache1.set('tre', 3)}
    DEL(tre):   ${cache1.del('tre')}
    GET(tre):   ${cache1.get('tre')}
    HAS(tre):   ${cache1.has('tre')}
    DEL(qua):   ${cache1.del('qua')}
`);

const cache2 = NewCache({}, DefaultAdapter);
console.log(`
EXPLICIT DEFAULT ADAPTER (JS) ->
    SET(one,1): ${cache2.set('one', 1)}
    GET(one):   ${cache2.get('one')}
    HAS(one):   ${cache2.has('one')}
    SET(two,1): ${cache2.set('two', 1)}
    SET(two,2): ${cache2.set('two', 2)}
    GET(two):   ${cache2.get('two')}
    SET(tre,3): ${cache2.set('tre', 3)}
    DEL(tre):   ${cache2.del('tre')}
    GET(tre):   ${cache2.get('tre')}
    HAS(tre):   ${cache2.has('tre')}
    DEL(qua):   ${cache2.del('qua')}
`);
