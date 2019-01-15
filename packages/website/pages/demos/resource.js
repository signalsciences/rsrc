import * as React from 'react'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import { Cache, Resource } from 'rsrc'

export default () => (
  <Cache cache={ new Map() }>
    <h1>
      Resource
    </h1>
    <small>
      Modify the code below to try it out
    </small>
    <LiveProvider
      noInline
      mountStylesheet={ false }
      scope={ {
        Resource,
      } }
      code={ `const path = 'https://jsonplaceholder.typicode.com/todos/{id}'

const Todos = ({ params, query, ...rest }) => (
  <Resource
    path={ path }
    params={ params }
    query={ query }
    maxAge={ 60 }
    actions={ {
      markCompleted: (id, completed) => ({
        params: { id },
        invalidates: path,
        options: {
          method: 'PUT',
          body: JSON.stringify({ completed })
        }
      })
    } }
    { ...rest }
  />
)

const TodoList = ({ resource }) => {
  const { state, actions } = resource

  let todos = state.value || []

  return (
    <>
      {
        todos.slice(0, 10).map(todo => {
          return (
            <p key={ todo.id }>
              { \`#\${todo.id} - \${todo.title}\` }
              <button
                onClick={
                  () => {
                    actions.markCompleted(todo.id)
                      .then((fetchState) => {
                        alert(\`Todo #\${fetchState.value.id} - update succesful\`)
                      })
                      .catch((error) => {
                        alert('Oops, something went wrong')
                      })
                  }
                }
              >
               Mark Complete
              </button>
            </p>
          )
        })
      }
    </>
  )
}

render(
  <Todos>
    { resource => <TodoList resource={ resource } /> }
  </Todos>
)` }
    >
      <LiveEditor />
      <LiveError />
      <section style={ { margin: '2rem 0', padding: '2rem', border: '1px solid #ddd' } }>
        <LivePreview />
      </section>
    </LiveProvider>
  </Cache>
)
