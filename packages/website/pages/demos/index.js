import * as React from 'react'
import CacheDemo from './cache'
import FetchDemo from './fetch'
import ResourceDemo from './resource'

export default () => (
  <>
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
