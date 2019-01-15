import * as React from 'react'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import { Cache } from 'rsrc'

const Preview = ({ cache, children }) => {
  function addEntry () {
    const key = `Key: ${+(new Date())}`
    const value = `Value: ${Math.floor(Math.random() * 1e8)}`
    cache.set(key, value)
  }
  function clearAll () {
    cache.clear()
  }
  return (
    <>
      <div style={ { padding: '1rem 0.5rem 0' } }>
        <button onClick={ addEntry }>add entry</button>
        <button onClick={ clearAll }>clear all</button>
      </div>
      <div style={ { padding: '0 1rem' } }>
        { children }
      </div>
    </>
  )
}

export default () => (
  <Cache cache={ new Map() }>
    <section>
      <header>
        <h1>
          Cache
        </h1>
        <small>
          Modify the code below to try it out
        </small>
      </header>
      <LiveProvider
        mountStylesheet={ false }
        scope={ {
          Cache,
          Preview,
        } }
        code={ `<Cache.Consumer>
  {
    cache => {
      const items = []
      cache.forEach((v, k) => items.push([k, v]))

      return (
        <Preview cache={ cache }>
          <pre>
            { JSON.stringify(items, null, 2) }
          </pre>
        </Preview>
      )
    }
  }
</Cache.Consumer>
` }
      >
        <LiveEditor onChange={ code => console.log(code) } />
        <LiveError />
        <section style={ { margin: '2rem 0', border: '1px solid #ddd' } }>
          <LivePreview />
        </section>
      </LiveProvider>
    </section>
  </Cache>
)
