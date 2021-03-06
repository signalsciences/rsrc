# Resource

Resource glues together the functionality of Cache and Fetch with a more
expressive interface. Since Fetch is limited to handle only the `GET` method
for a particular endpoint, Resource expands on this to allow additional or
related operations to be declared and exposed to children via `actions`.

```jsx
React.Component<ResourceProps, ResourceState>
```

## Props

```jsx
type Action = (any) => {
  url?: string,
  options?: RequestOptions,
  maxAge?: number,
  invalidates?: string | Array<string>,
};
```

> Note: invalidation from actions is a convenience mechanism to automatically
> invalidate related cache keys any time a given action is successful. The
> `invalidates` prop is used to create matchers that get compared to cached
> keys. For RESTful endpoints, the actions defined in a `<Resource />`
> typically map to modification requests (POST, PUT, PATCH, DELETE). These
> operations result in changes to the underlying entities and collections.
> Query strings used to filter collections are usually not relevant in deciding
> whether it should be invalidated. For simplicity, we invalidate all keys
> related to the endpoint and ignore search strings. For example:
> `invalidates={ ["/foos?bar=1", "/foos/1234"] }` is converted to matchers with
> the search omitted: `["/foos", "/foos/1234"]`.

```jsx
type ResourceProps = {
  url: string,
  options: RequestOptions,
  maxAge: number,
  actions: { [key: string]: Action },
  children?: (ResourceState) => React.Node,

  /* advanced options */
  fetcher: Fetcher,
};
```

## State

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

type ResourceState = {
  state: FetchState,
  actions: {
    [key: string]: (*) => Promise<*>
  },
  meta: ResourceProps
};
```

## Example

```jsx
// resources/users/User.js

import React from "react";
import { Resource } from "rsrc";
import Form from "./Form";

export default ({ id }) => {
  const url = `https://api.example.com/users/${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  const maxAge = 60 * 60; // 1 hour

  const update = (data) => ({
    url,
    options: {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    },
    invalidates: [url],
  });

  return (
    <Resource url={url} options={options} maxAge={maxAge} actions={{ update }}>
      {(resource) => {
        const { state, actions } = resource;

        if (state.pending) return "Loading...";

        if (state.rejected) return "Error";

        const handleSubmit = (formValues) => {
          actions
            .update(formValues)
            .then((value) => console.log("Success", value))
            .catch((error) => console.log("Fail", error.message));
        };

        const { name, email } = state.value;

        return <Form initialState={{ name, email }} onSubmit={handleSubmit} />;
      }}
    </Resource>
  );
};
```
