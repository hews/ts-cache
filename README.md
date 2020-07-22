# TypeScript Cache

## 👷‍♀️ Work in progress

A type-consistent, in-memory cache for TypeScript/JavaScript. The API
should stay consistent across multiple "storage adapter" implementations
(even if you aren't using types).

The impetus for this project came from a few shortcomings of the
fantastic [`node-lru-cache`](https://github.com/isaacs/node-lru-cache)
package. I wanted to use it, but:

1.  it does not include good, out-of-the-box type safety for TypeScript;
2.  it does not easily transition to a more optimized or persistent
    storage format as the including project warranted.

All the ideas here are taken from:

- https://github.com/isaacs/node-lru-cache
- https://github.com/adzerk/node-lru-native
- https://github.com/NodeRedis/node-redis

## Development

Easy as pie.

```
$ git clone git@github.com:hews/ts-cache.git
$ cd ts-cache && yarn
```

## Run tests

```
$ yarn test
```

## Run examples

Build and link the package locally, then run the examples.

```
$ yarn build
$ yarn link
$ yarn link ts-cache
$ yarn examples
```

## Use

See [`./examples`](examples) (for now).

---

Copyright © 2020 Philip Hughes &gt;p@hews.co&lt;
