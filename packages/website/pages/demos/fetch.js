import * as React from 'react'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import { Fetch } from 'rsrc'

export default () => (
  <>
    <header>
      <h2>
        Fetch
      </h2>
      <small>
        Modify the code below to try it out
      </small>
    </header>
    <div>
      <LiveProvider
        mountStylesheet={ false }
        scope={ { Fetch } }
        code={ `<Fetch
    url='https://httpstat.us/200?sleep=1000'
    maxAge={ 60 }
  >
    {
      fetchState => (
        <div>
          <button onClick={ fetchState.read }>Read</button>
          <button onClick={ fetchState.invalidate }>Invalidate</button>
          <button onClick={ fetchState.refresh }>Refresh</button>
          <pre>
            { JSON.stringify(fetchState, null, 2) }
          </pre>
        </div>
      )
    }
  </Fetch>` }
      >
        <LiveEditor />
        <LiveError />
        <section style={ { margin: '2rem 0', padding: '1rem', border: '1px solid #ddd' } }>
          <LivePreview />
        </section>
      </LiveProvider>
    </div>
  </>
)
