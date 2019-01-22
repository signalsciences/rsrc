# API Reference

[TODO]

## Cache 

`React.Component<CacheProps, CacheState>`

```js
type CacheProps = {
  map: Map<*, *>,
  children: React.Node
}
```

```js
type CacheState = {
  get: (key: *) => *,
  has: (key: *) => boolean,
  entries: () => Iterator<*>,
  values: () => Iterator<*>,
  keys: () => Iterator<*>,
  forEach: (Function, any) => void,
  set: (key: *, value: *) => Map<*, *>,
  delete: (key: *) => boolean,
  clear: () => void,
}
```



## `<Fetch />`

### Props

#### `maxAge`

The maximum __number of seconds__ since last resolved for a cached result to be
considered acceptable. The fetcher will always look in the cache first. If the
result is not found, or the last resolved timestamp is outside the maximum
allowed, the fetcher will refresh the result.


## `<Resource />`

### Props


