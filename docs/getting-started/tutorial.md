# Tutorial

```
yarn add rsrc
```

> Requires `react@>=16.8`.
> The [fetch
> API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
> will also need to be natively supported or polyfilled for your target
> environments.

## Configure a cache provider

The cache provider accepts a single, optional prop called `map`, which defaults
to `new Map()`. The value is expected to expose a
[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
or map-like interface — meaning it is iterable and provides methods for
`get()`, `set()`, and `delete()`.

For larger applications, you might want to consider a [least recently used
(LRU)](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>)
implementation like [quick-lru](https://www.npmjs.com/package/quick-lru) which
can help limit memory usage.

```jsx
// index.js

import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import { Cache } from "rsrc";
import LRU from "quick-lru";
import Todos from "./pages/Todos";

const lru = new LRU({ maxSize: 100 });

const App = () => (
  <Cache map={lru}>
    <Router>
      <Todos path="/todos" />
    </Router>
  </Cache>
);

render(<App />, document.getElementById("root"));
```

## Define a resource

A resource can be thought of as a component-level description of an API endpoint
and its available methods. In most cases this will mirror the interface provided
by the endpoint itself along with any related operations that might be useful when
dealing with the resource.

In the example below, we have an endpoint at `/todos`. While a `GET` request to
this endpoint could return a collection of "todos", it's likely designed to
accommodate additional operations (`POST`, `PATCH`, etc). We can define these
methods as seen in the `actions` prop below.

For actions that modify a resource, you can provide an additional argument to
automatically invalidate related resources when the action resolves
successfully.

```jsx
// resources/todos/Resource.js

import React from "react";
import { Resource } from "rsrc";

export default ({ children }) => {
  const url = "https://api.example.com/todos";
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const actions = {
    create: (data) => ({
      options: {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
      },
      invalidates: [url],
    }),
    markComplete: (id) => ({
      url: `${url}/{id}`,
      options: {
        ...options,
        method: "PATCH",
        body: JSON.stringify({ completed: true }),
      },
      invalidates: [url, `${url}/${id}`],
    }),
  };

  return (
    <Resource url={url} options={options} actions={actions}>
      {children}
    </Resource>
  );
};
```

## Build out your views

A resource view is a component that has been tailored to consume a particular
resource value.

```jsx
// resources/todos/List.js

import React from "react";

export default (props) => {
  const { onSuccess, onFail, resource } = props;
  const { state, actions } = resource;

  if (state.pending) return "Loading...";

  if (state.rejected) return `Error: ${state.reason.message}`;

  const todos = state.value.filter((todo) => !todo.completed);

  const handleClick = (id) => {
    actions
      .markcomplete(id)
      .then((value) => {
        onSuccess(value);
      })
      .catch((error) => {
        onFail(error);
      });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <button onClick={() => handleClick(todo.id)}>✔</button>
          {todo.title}
        </li>
      ))}
    </ul>
  );
};
```

```jsx
// resources/todos/Create.js

import React from "react";
import TodosForm from "./Form";

export default (props) => {
  const { onSuccess, onFail, resource } = props;
  const { state, actions } = resource;

  const handleSubmit = (formValues) => {
    actions
      .create(formValues)
      .then((value) => {
        onSuccess(value);
      })
      .catch((error) => {
        onFail(error);
      });
  };

  return <TodosForm onSubmit={handleSubmit} />;
};
```

## Use it on a page

```jsx
// pages/Todos.js

import React from "react";
import { notify } from "../utils";
import { Todos, TodosList, TodosCreate } from "../resources/todos";

export default (props) => {
  const handleSuccess = (value) => {
    notify({ purpose: "success", message: `Success: ${value.id}` });
  };

  const handleFail = (error) => {
    notify({ purpose: "error", message: `Fail: ${error.message}` });
  };

  return (
    <Todos>
      {(resource) => (
        <>
          <TodosCreate
            resource={resource}
            onSuccess={handleSuccess}
            onFail={handleFail}
          />
          <TodosList
            resource={resource}
            onSuccess={handleSuccess}
            onFail={handleFail}
          />
        </>
      )}
    </Todos>
  );
};
```
