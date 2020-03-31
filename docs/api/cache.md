# Cache

Cache is a context provider with a map-like interface. It can store any
arbitrary key-value pairs. The `Fetch` component uses `Cache` to store promises
returned from `GET` requests keyed by the URL. The timestamp information is
also included to assist with time-based invalidation strategies (via the
`maxAge` prop).

```jsx
React.Component<CacheProps, CacheState>
```

## Props

```jsx
type CacheProps = {
  map: Map<*, *>,
  children?: React.Node,
};
```

> The `map` prop accepts any map-like interface. At a minimum, it should be
> iterable and provide methods for `get()`, `set()`, and `delete()`.

## State

```jsx
type CacheState = {
  get: (key: *) => *,
  set: (key: *, value: *) => Map<*, *>,
  delete: (key: *) => boolean,
  entries: () => Iterator<*>,
  values: () => Iterator<*>,
  keys: () => Iterator<*>,
};
```

This state is passed to the context provider which is then used internally by
`Resource`.

## Example

> The cache consumer shown below is for illustration purposes only. It is used
> internally by `Resource` and is not meant to be used directly.

```jsx
import React from "react";
import { Cache } from "rsrc";

export default () => (
  <Cache>
    <Cache.Consumer>
      {(cache) => {
        const addRandomEntry = () => {
          cache.set(+new Date(), Math.random());
        };
        const removeEntry = (key) => {
          cache.delete(key);
        };
        return (
          <>
            <button onClick={addRandomEntry}>Add entry</button>
            <ul>
              {[...cache.entries()].map(([key, value]) => (
                <li key={key}>
                  <button onClick={() => removeEntry(key)}>×</button>
                  {`${key}: ${value}`}
                </li>
              ))}
            </ul>
          </>
        );
      }}
    </Cache.Consumer>
  </Cache>
);
```
