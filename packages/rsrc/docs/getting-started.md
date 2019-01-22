# Getting started

Requires __React 16.3 or later__.


```bash
yarn add rsrc
```

__Fetch__ will also need to be natively supported or polyfilled for your target
environments. You could try [unfetch](https://www.npmjs.com/package/unfetch)
or take a look at [npm](https://www.npmjs.com/search?q=fetch) for more options.


## Configure a cache provider

In order to persist and share state outside the lifecycle of an individual
component, we are relying on the magic of [react
context](https://reactjs.org/docs/context.html) to help us out. The cache
provider should live near the top of your App code to ensure it isn't
unnecessarily mounted and unmounted.

The provider accepts a single prop (`map`) which should expose a [map-like
interface](ttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
You will probably want to pass something a bit more optimized for your use case
than the default, `new Map()`. For anything outside a proof of concept, we
strongly recommend using a [Least Recently
Used](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU))
caching strategy or something similar (see [LRU
cache](https://www.npmjs.com/search?q=lru%20cache) for some options).  This will
help ensure your cache doesn't grow arbitrarily large over time.


```jsx
// src/App.js

import * as React from 'react'
import { Cache } from 'rsrc'

import LRUCache from './lru-cache'
import Root from './Root'

export default (props) => {
  return {
    <Cache map={ new LRUCache(50) }>
      <Root />
    </Cache>
  }
)
```

## Define a resource

A resource can be thought of as a front-end interface for a back-end endpoint.
That is, it should mirror the interface provided the endpoint itself.

In the example below, we have an endpoint at `/users/{userId}/todos`. While a
`GET` request to this endpoint might return a collection of todos for a given
user, it's likely designed to accomodate additional operations (`POST`, `PATCH`,
etc). Similarly, we can define and expose these available methods as seen in the
`actions` prop below.


```jsx
// resources/Todos/index.js

import * as React from 'react'
import { Resource } from 'rsrc'

const path = 'https://example.com/api/v1/users/{userId}/todos'

const Todos = ({ params, ...rest }) => (
  <Resource
    path={ path }
    params={ params }
    actions={ {
      create: data => ({
        options: {
          method: 'POST',
          body: JSON.stringify(data)
        }
      }),
      completeById: todoId => (
        path: `${path}/${todoId}`,
        params: { 
          ...params,
          todoId
        },
        options: {
          method: 'PUT',
          body: JSON.stringify({ completed: true })
        }
      })
    } }
    { ...rest }
  />
)

// You can optionally expose "companion" components.
// This can help clarify intent & available use cases for the resource.
Todos.List = List

export default Todos
```

## Create a view

A resource view is a component that has been custom-tailored to handle the
specific shape of data returned from a particular resource.

The parent component is expected to pass the resource's current `state` as well
as any additional `actions` described by the resource.


```jsx
// resources/Todos/List.js

import * as React from 'react'

export default ({ onUpdateSuccess, onUpdateFail, resource }) => {
  const { state, actions } = resource
  return (
    <ul>
      {
        state.value && state.value.map(todo => (
          <li key={ todo.id }>
            { todo.title }
            <button
              onClick={
                () => {
                  actions.completeById(todo.id)
                    .then(promiseState => { onUpdateSuccess(promiseState) })
                    .catch(error => { onUpdateFail(error) })
                }
              }
            >
              Mark complete
            </button>
          </li>
        ))
      }
    </ul>
  )
}
```

## Use it on a page

Using react-router or similar, we could define a UI route at
`/users/{userId}/todos`. Since this maps so nicely to our underlying endpoint
(and resource definition), all we need to do now is simply pass the `params`
along:


```jsx
// pages/TodoList.js

import * as React from 'react'
import Todos from '../resources/Todos'

export default ({ params }) => (
  <Todos params={ params }>
    {
      resource => (
        <Todos.List
          onUpdateSuccess={ fetchState => console.log('Woot!', fetchState) }
          onUpdateFail={ error => console.log('Whoops!', error) }
          resource={ resource }
        />
      )
    }
  </Todos>
)
```
