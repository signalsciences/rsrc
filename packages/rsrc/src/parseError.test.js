/* @flow */

import { cleanup } from 'react-testing-library'
import parseError from './parseError'

afterEach(cleanup)

test('#parseError', () => {
  const body = JSON.stringify({ message: 'Whoops' })
  const init = { status: 404 }
  const response = new Response(body, init)
  const error = parseError(response, body)
  expect(error.statusText).toBe('Not Found')
  expect(error.status).toBe(404)
  expect(error.body).toEqual(body)
  expect(error.stack).toBeDefined()
})
