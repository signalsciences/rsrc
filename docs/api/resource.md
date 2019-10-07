# Resource

Resource glues together the functionality of Cache and Fetch with a more
expressive interface. If Fetch represents an individual request state, a
Resource can be thought of as a more generic description that defines
additional actions for a given endpoint.

```js
React.Component<ResourceProps, ResourceState>
```

## Props

```js
type ResourceProps = {
  url: string,
  options: RequestOptions,
  maxAge: number,
  actions: { [key: string]: Action },
  children?: ResourceState => React.Node,

  /* advanced options */
  fetcher: Fetcher
};

type Action = any => {
  url?: string,
  options?: RequestOptions,
  maxAge?: number,
  invalidates?: Array<string>
};
```

## ResourceState

```js
type PromiseState = {
  pending: boolean,
  rejected: boolean,
  fulfilled: boolean,
  value: ?any,
  reason: ?Error
};

type FetchState = PromiseState & {
  invalidate: () => void,
  read: () => void,
  refresh: () => void
};

type ResourceState = {
  state: FetchState,
  actions: {
    [key: string]: (*) => Promise<PromiseState>
  },
  meta: ResourceProps
};
```

## Example

```jsx
// src/resources/todos/Todos.js

import React from "react";

const url = "https://jsonplaceholder.typicode.com/todos";

const Todos = ({ children }) => (
  <Resource
    url={url}
    actions={{
      markComplete: id => ({
        url: `${url}/${id}`,
        invalidates: [url],
        options: {
          method: "PUT",
          body: JSON.stringify({ completed: true })
        }
      })
    }}
  >
    {children}
  </Resource>
);
```

```jsx
// src/resources/todos/List.js

import React from "react";

const TodoList = ({ todos, onClick }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <button onClick={() => onClick(todo.id)}>×</button>
        {todo.title}
      </li>
    ))}
  </ul>
);
```

```jsx
// src/App.js
import React from "react";

const App = () => (
  <Todos>
    {({ state, action }) => {
      if (state.rejected) return <Error error={state.reason} />;

      if (state.pending) return <Loading />;

      const handleClick = id => {
        actions
          .markComplete(id)
          .then(fetchState => {
            console.log("woot");
          })
          .catch(error => {
            console.warn("boo");
          });
      };

      return <TodosList todos={state.value} onClick={handleClick} />;
    }}
  </Todos>
);
```
