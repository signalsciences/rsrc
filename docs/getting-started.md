# Getting started

Requires __React 16.3 or later__.

```bash
yarn add rsrc
```

## Configure your cache provider

```jsx
// src/App.js

import * as React from 'react'
import { Cache } from 'rsrc'

import LRUCache from './lru-cache'
import Root from './Root'

export default (props) => {
  return {
    <Cache map={ new LRUCache(10) }>
      <Root />
    </Cache>
  }
)
```

## Define a resource

```jsx
// resources/Todos/Resource.js

import * as React from 'react'
import { Resource } from 'rsrc'

import List from './List'

const path = 'https://jsonplaceholder.typicode.com/todos'
const options = {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  }
}
const maxAge = 3600

const Todos = ({ params, query, ...rest }) => (
  <Resource
    path={ path }
    params={ params }
    options={ options }
    maxAge={ maxAge }
    actions={ {
      create: data => ({
        options: {
          ...options,
          method: 'POST',
          body: JSON.stringify(data)
        },
        invalidates: path
      }),
      markCompleted: id => {
        return {
          path: `${path}/${id}`,
          params: { id },
          options: {
            ...options,
            method: 'PUT',
            body: JSON.stringify({ completed: true })
          },
          invalidates: path
        }
      }
    } }
    { ...rest }
  />
)

// NOTE: You can optionally expose "companion" components.
// This can help clarify intent & available use cases for the resource.
Todos.List = List

export default Todos
```

## Create a resource view

```jsx
// resources/Todos/List.js

import * as React from 'react'

export default ({ resource }) => {
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
                  actions.markCompleted(todo.id)
                    .then(/* Success notification */)
                    .catch(/* Fail notification */)
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

## Putting it all together on a page

```jsx
// pages/TodoList.js

import * as React from 'react'
import Todos from '../resources/todos/Todos'

export default () => (
  <Todos>
    { resource => <Todos.List resource={ resource } /> }
  </Todos>
)
```
