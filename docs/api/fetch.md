# Fetch

Fetch is a component that exposes a declarative interface for the `fetch` API.
Its main job is to translate the promise state of a fetch operation into
consumable props. It also provides methods to read, invalidate, and refresh
fetch states.

```jsx
React.Component<FetchProps, FetchState>
```

> The Fetch component is designed to work with `GET` requests. This is for 2 reasons:
>
> 1. `GET` requests are typically
>    [safe](https://developer.mozilla.org/en-US/docs/Glossary/safe), and
>    [cacheable](https://developer.mozilla.org/en-US/docs/Glossary/cacheable).
> 2. `POST`, `PUT`, `PATCH`, and `DELETE` methods are typically reserved for
>    operations that modify state on the server. In UI terms, these actions
>    usually require user interaction, e.g. `onClick`, `onSubmit`. More on
>    HTTP methods
>    [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).
>
> To make additional operations for a particular endpoint available to
> children, consider using a Resource component.

## Props

```jsx
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

```jsx
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

export default () => {
  const url = `https://api.example.com/users`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  };
  const maxAge = 60 * 60; // 1 hour

  return (
    <Fetch url={url} options={options} maxAge={maxAge}>
      {fetchState => {
        if (fetchState.pending) return "Loading...";

        if (fetchState.rejected) return "Error";

        const users = fetchState.value.data;

        return (
          <>
            <button onClick={fetchState.read}>Read</button>
            <button onClick={fetchState.invalidate}>Invalidate</button>
            <button onClick={fetchState.refresh}>Refresh</button>
            <ul>
              {users.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </>
        );
      }}
    </Fetch>
  );
};
```
