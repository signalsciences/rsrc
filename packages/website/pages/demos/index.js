import * as React from 'react'
import CacheDemo from './cache'
import FetchDemo from './fetch'
import ResourceDemo from './resource'

export default () => (
  <>
    <h1>
      Demos &amp; Playground
    </h1>
    <p>
      Explore component functionality using the interactive demos below.
    </p>
    <section>
      <CacheDemo />
    </section>
    <section style={ { marginTop: '10rem' } } >
      <FetchDemo />
    </section>
    <section style={ { marginTop: '10rem' } } >
      <ResourceDemo />
    </section>
  </>
)
