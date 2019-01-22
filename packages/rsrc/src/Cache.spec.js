/* @flow */

import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { Cache } from '.'

afterEach(cleanup)

function setup (increment) {
  const props = {}
  const children = (arg) => {
    Object.assign(props, arg)
    increment()
    return null
  }
  render(
    <Cache>
      <Cache.Consumer>
        { children }
      </Cache.Consumer>
    </Cache>
  )
  return {
    props,
  }
}


test('cache provider only updates on mutations', async () => {
  let counter = 0
  const mockCallback = jest.fn()

  const increment = () => {
    counter += 1
  }
  const { props } = setup(increment)

  expect([...props.entries()]).toEqual([])
  expect(counter).toBe(1)

  expect(props.set('foo', 'bar')).toEqual(new Map([['foo', 'bar']]))
  expect(counter).toBe(2)

  expect(props.get('foo')).toEqual('bar')
  expect(counter).toBe(2)

  expect(props.has('foo')).toEqual(true)
  expect(counter).toBe(2)

  expect([...props.entries()]).toEqual([['foo', 'bar']])
  expect(counter).toBe(2)

  expect([...props.values()]).toEqual(['bar'])
  expect(counter).toBe(2)

  expect([...props.keys()]).toEqual(['foo'])
  expect(counter).toBe(2)

  props.forEach(mockCallback)
  expect(mockCallback.mock.calls.length).toBe(1)
  expect(counter).toBe(2)

  expect(props.set('baz', 'qux')).toEqual(new Map([['foo', 'bar'], ['baz', 'qux']]))
  expect(counter).toEqual(3)

  expect(props.delete('foo')).toBe(true)
  expect(counter).toEqual(4)

  expect(props.delete('foo')).toBe(false)
  expect(counter).toEqual(4)

  props.clear()
  expect([...props.entries()]).toEqual([])
  expect(counter).toEqual(5)
})
