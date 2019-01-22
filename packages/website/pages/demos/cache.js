import * as React from 'react'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import { Cache } from 'rsrc'

export default () => (
  <Cache map={ new Map() }>
    <header>
      <h2>
        Cache
      </h2>
      <small>
        Modify the code below to try it out
      </small>
    </header>
    <div>
      <LiveProvider
        mountStylesheet={ false }
        scope={ { Cache } }
        code={ `<Cache.Consumer>
  {
    cache => {
      const items = []
      cache.forEach((v, k) => items.push([k, v]))

      function addEntry () {
        const key = \`Key: \${+(new Date())}\`
        const value = \`Value: \${Math.floor(Math.random() * 1e8)}\`
        cache.set(key, value)
      }

      function clearAll () {
        cache.clear()
      }

      return (
        <>
          <button onClick={ addEntry }>add entry</button>
          <button onClick={ clearAll }>clear all</button>
          <pre>
            { JSON.stringify(items, null, 2) }
          </pre>
        </>
      )
    }
  }
  </Cache.Consumer>
  ` }
      >
        <LiveEditor />
        <LiveError />
        <div style={ { margin: '2rem 0', padding: '1rem', border: '1px solid #ddd' } }>
          <LivePreview />
        </div>
      </LiveProvider>
    </div>
  </Cache>
)
