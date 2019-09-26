/* @flow */

import React from 'react'
import { render, wait } from '@testing-library/react'
import fetch from 'jest-fetch-mock'
import { Cache, Resource } from '../src'

// afterEach(cleanup)

test('<Resource />', async () => {
  fetch.mockResponses([
    JSON.stringify({ data: 'ok' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ])
  let renderProps = {}
  const children = arg => {
    renderProps = { ...renderProps, ...arg }
    return null
  }

  const url = 'https://foo.bar.com/baz/quux'

  render(
    <Cache>
      <Resource
        url={url}
        options={{}}
        actions={{
          create: data => ({
            options: {
              body: JSON.stringify(data),
              method: 'POST'
            },
            invalidates: [url]
          })
        }}
      >
        {children}
      </Resource>
    </Cache>
  )

  expect(fetch).toHaveBeenCalledTimes(1)

  renderProps.state.read()
  expect(fetch).toHaveBeenCalledTimes(1)

  renderProps.state.invalidate()
  renderProps.state.read()
  expect(fetch).toHaveBeenCalledTimes(2)

  renderProps.state.refresh()
  expect(fetch).toHaveBeenCalledTimes(3)

  renderProps.actions.create({ foo: 'bar' })

  await wait(expect(fetch).toHaveBeenCalledTimes(4))

  renderProps.state.read()
  expect(fetch).toHaveBeenCalledTimes(5)
})
