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
    <header>
      <h2>
        Resource
      </h2>
      <small>
        Modify the code below to try it out
      </small>
    </header>
    <div>
      <LiveProvider
        noInline
        mountStylesheet={ false }
        scope={ { Resource } }
        code={ `const path = 'https://jsonplaceholder.typicode.com/todos/{id}'

const Todos = ({ params, query, ...rest }) => (
  <Resource
    path={ path }
    params={ params }
    query={ query }
    maxAge={ 60 }
    actions={ {
      markCompleted: id => ({
        params: { id },
        invalidates: path,
        options: {
          method: 'PUT',
          body: JSON.stringify({ completed: true })
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
    <div>
      {
        todos.slice(0, 3).map(todo => {
          return (
            <p key={ todo.id }>
              <button
                onClick={
                  () => {
                    actions.markCompleted(todo.id)
                      .then((fetchState) => {
                        alert(\`Todo #\${fetchState.value.id} - update succesful\`)
                      })
                  }
                }
              >
               Done
              </button>
              { \`#\${todo.id} - \${todo.title}\` }
            </p>
          )
        })
      }
    </div>
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
        <section style={ { margin: '2rem 0', padding: '0 1rem 1rem', border: '1px solid #ddd' } }>
          <LivePreview />
        </section>
      </LiveProvider>
    </div>
  </Cache>
)
