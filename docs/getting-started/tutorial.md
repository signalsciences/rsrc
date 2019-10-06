# Tutorial

```bash
yarn add rsrc
```

> Requires `react@>=16.8`.
> The [fetch
> API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
> will also need to be natively supported or polyfilled for your target
> environments.

## Configure a cache provider

The cache provider accepts a single, optional prop called `map`, which
defaults to `new Map()`. The value is expected to expose a
[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) or map-like
interface. For larger applications, you might want to consider a
[least recently used
(LRU)](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>)
implementation like [quick-lru](https://www.npmjs.com/package/quick-lru) which
will help limit memory usage.

```jsx
// src/App.js

import * as React from "react";
import { Cache } from "rsrc";
import lru from "quick-lru";

const App = () => {
  return <Cache map={lru(50)}>{/* additional providers, router, etc */}</Cache>;
};

export default App;
```

## Define a resource

A resource can be thought of as a component-level description of an API endpoint
and its available methods. In most cases this will mirror the interface provided
by the endpoint itself along with any related operations that may be useful when
dealing with the resource.

In the example below, we have an endpoint at `/todos`. While a `GET` request to
this endpoint might return a collection of todos, it's likely designed to
accomodate additional operations (`POST`, `PATCH`, etc). We can define and
expose these methods as seen in the `actions` prop below.

```jsx
// resources/Todos/Resource.js

import * as React from "react";
import { Resource } from "rsrc";

const Todos = props => {
  const url = `https://api.example.com/todos`;

  return (
    <Resource
      url={url}
      actions={{
        create: data => ({
          options: {
            method: "POST",
            body: JSON.stringify(data)
          },
          invalidates: [url]
        }),
        markComplete: id => ({
          url: `${url}/{id}`,
          options: {
            method: "PATCH",
            body: JSON.stringify({ completed: true })
          }
        })
      }}
      {...props}
    />
  );
};

export default Todos;
```

## Build out your views

A resource view is a component that has been tailored to consume a particular
resource.

```jsx
// resources/Todos/List.js

import * as React from "react";

const TodosList = props => {
  const { resource } = props;

  if (resource.state.pending) {
    return "Loading...";
  }

  if (resource.state.rejected) {
    return `Error: ${resource.state.reason.message}`;
  }

  const todos = resource.state.value.filter(todo => !todo.completed);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <button
            onClick={() => {
              resource.actions
                .markComplete(todo.id)
                .then(() => {
                  resource.state.refresh();
                })
                .catch(error => {
                  console.log(error);
                });
            }}
          >
            ✔
          </button>
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodosList;
```

```jsx
// resources/Todos/Create.js

import * as React from "react";
import Form from "./Form";

const TodosCreate = props => {
  const { onSuccess, onFail, resource } = props;

  return (
    <Form
      initialValues={{ title: "" }}
      onSubmit={formValues => {
        resource.actions
          .create(formValues)
          .then(fetchState => {
            onSuccess(fetchState);
          })
          .catch(error => {
            onFail(error);
          });
      }}
    />
  );
};

export default TodosCreate;
```

## Use it on a page

```jsx
// pages/Todos.js

import * as React from "react";
import { Todos, TodosList, TodosCreate } from "../resources/Todos";

const TodosPage = props => {
  return (
    <Todos>
      {resource => (
        <div>
          <TodosCreate
            onSuccess={handleSuccess}
            onFail={handleFail}
            resource={resource}
          />
          <hr />
          <TodosList resource={resource} />
        </div>
      )}
    </Todos>
  );
};

export default TodosPage;
```
