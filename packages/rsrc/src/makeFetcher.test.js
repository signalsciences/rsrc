/* @flow */

import {
  cleanup,
} from 'react-testing-library'
import makeFetcher from './makeFetcher'

afterEach(cleanup)

test('#makeFetcher returns a fetcher that updates state on successful fetches', async () => {
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
  const fetchState = await makeFetcher()('/foo')
  expect(fetchState.pending).toBe(false)
  expect(fetchState.fulfilled).toBe(true)
  expect(fetchState.value).toEqual({ data: 'ok' })
})

test('#makeFetcher returns a fetcher that updates state on unsuccessful fetches', async () => {
  fetch.mockResponses(
    [
      JSON.stringify({ message: 'Whoops' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      },
    ]
  )
  const fetchState = await makeFetcher()('/foo')
  expect(fetchState.pending).toBe(false)
  expect(fetchState.rejected).toBe(true)
})
