# `<Cache />`

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
