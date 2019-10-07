# Cache

Cache is a context provider with a map-like interface. It can store any
arbitrary key-value pairs. The `Fetch` component uses `Cache` to store promises
returned from `GET` requests keyed by the url. The timestamp information is also
included to assist with time-based invalidation strategies.

```js
React.Component<CacheProps, CacheState>
```

## Props

```js
type CacheProps = {
  cache: Map<*, *>,
  children?: React.Node
};
```

> The `cache` prop can be any map-like interface which gets wrapped to allow for state
> updates on change.

## State

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
  clear: () => void
};
```

## Example

```jsx
import React from 'react'
import { Cache } from 'rsrc'

export default () => (
  <Cache>
    <Cache.Consumer>
      {
        cache => {
          const items = []
          cache.forEach((v, k) => items.push([k, v]))
          function addEntry () {
            const key = \`Key: \${+(new Date())}\`
            const value = \`Value: \${Math.floor(Math.random() * 1e8)}\`
            cache.set(key, value)
          }
          function clearAll () {
            cache.clear()
          }
          return (
            <>
              <button onClick={ addEntry }>add entry</button>
              <button onClick={ clearAll }>clear all</button>
              <pre>
                { JSON.stringify(items, null, 2) }
              </pre>
            </>
          )
        }
      }
    </Cache.Consumer>
  </Cache>
)
```
