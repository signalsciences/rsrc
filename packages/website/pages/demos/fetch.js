import * as React from 'react'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import { Fetch } from 'rsrc'

const Preview = ({ fetchState, children }) => {
  const { read, invalidate, refresh } = fetchState
  return (
    <section style={ { margin: '2rem 0', border: '1px solid #ddd' } }>
      <div style={ { padding: '1rem 0.5rem 0' } }>
        <button onClick={ read }>Read</button>
        <button onClick={ invalidate }>Invalidate</button>
        <button onClick={ refresh }>Refresh</button>
      </div>
      <div style={ { padding: '0 1rem' } }>
        { children }
      </div>
    </section>
  )
}

export default () => (
  <>
    <h1>
      Fetch
    </h1>
    <small>
      Modify the code below to try it out
    </small>
    <LiveProvider
      // noInline
      mountStylesheet={ false }
      scope={ {
        Fetch,
        Preview,
      } }
      code={ `<Fetch
  url='https://httpstat.us/200?sleep=1000'
  maxAge={ 60 }
>
  {
    fetchState => (
      <Preview fetchState={ fetchState }>
        <pre>
          { JSON.stringify(fetchState, null, 2) }
        </pre>
      </Preview>
    )
  }
</Fetch>` }
    >
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </>
)
