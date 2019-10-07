# Fetch

Fetch is a component that exposes a declarative interface for the fetch api. Its
main job is to translate promise state into consumable props. It also provides
methods to read, invalidate, and refresh fetch states.

```js
React.Component<FetchProps, FetchState>
```

## Props

```js
type FetchProps = {
  url: string,
  options: RequestOptions,
  maxAge: number,
  children?: FetchState => React.Node,

  /* advanced options */
  cache: CacheState,
  fetcher: Fetcher
};
```

> `maxAge` is the maximum **number of seconds** since last resolved that a cached
> result will be considered acceptable. The fetcher will always look in the cache
> first. If the result is not found, or the last resolved timestamp is outside the
> maximum allowed, the fetcher will automatically refresh the result.

## FetchState

```js
type PromiseState = {
  pending: boolean,
  rejected: boolean,
  fulfilled: boolean,
  value: ?any,
  reason: ?Error
};
```

```js
type FetchState = {
  pending: boolean,
  rejected: boolean,
  fulfilled: boolean,
  value: ?any,
  reason: ?Error
  invalidate: () => void,
  read: () => void,
  refresh: () => void
};
```

## Example

```jsx
import React from "react";

export default () => (
  <Fetch
    url="https://httpstat.us/200?sleep=1000"
    maxAge={60}
    options={{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      }
    }}
  >
    {fetchState => (
      <div>
        <button onClick={fetchState.read}>Read</button>
        <button onClick={fetchState.invalidate}>Invalidate</button>
        <button onClick={fetchState.refresh}>Refresh</button>
        <pre>{JSON.stringify(fetchState, null, 2)}</pre>
      </div>
    )}
  </Fetch>
);
```
