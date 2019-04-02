/* @flow */

import React from 'react'
import {
  render,
  wait,
} from 'react-testing-library'

import { Cache, Resource } from '.'

// afterEach(cleanup)

const path = 'https://foo.bar.com/{param}'
const props = {
  path,
  params: { param: 'quux' },
  query: { search: 'asdf' },
  options: {},
  actions: {
    create: (data) => {
      const body = JSON.stringify(data)
      return {
        options: {
          body,
          method: 'POST',
        },
        invalidates: path,
      }
    },
  },
}

test('<Resource />', async () => {
  fetch.mockResponses(
    [
      JSON.stringify({ data: 'ok' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ]
  )
  let renderProps = {}
  const children = (arg) => {
    renderProps = { ...renderProps, ...arg }
    return null
  }
  render(
    <Cache>
      <Resource { ...props }>
        { children }
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
