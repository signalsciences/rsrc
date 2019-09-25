/* @flow */

/* eslint-disable compat/compat */

import { cleanup, wait } from '@testing-library/react'
import parseBody from '../src/parseBody'

afterEach(cleanup)

test('#parseBody 204 empty', async () => {
  const body = 'Yeehaw'
  const init = {
    status: 204
  }
  const res = new Response(body, init)
  await wait(() => expect(parseBody(res)).resolves.toBe(null))
})

test('#parseBody no content-type', async () => {
  const body = 'Yeehaw'
  const init = {}
  const res = new Response(body, init)
  await wait(() => expect(parseBody(res)).resolves.toBe(null))
})

test('#parseBody text', async () => {
  const body = 'yeehaw'
  const init = {
    headers: {
      'Content-Type': 'text/plain'
    }
  }
  const res = new Response(body, init)
  await wait(() => expect(parseBody(res)).resolves.toEqual(body))
})

test('#parseBody json', async () => {
  const body = '{ "foo": "giddyup" }'
  const init = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = new Response(body, init)
  await wait(() => expect(parseBody(res)).resolves.toEqual(JSON.parse(body)))
})

test('#parseBody other -> arraybuffer', async () => {
  const body = null
  const init = {
    headers: {
      'Content-Type': 'something/else'
    }
  }
  const res = new Response(body, init)
  await wait(() => expect(parseBody(res)).resolves.toBeInstanceOf(ArrayBuffer))
})
