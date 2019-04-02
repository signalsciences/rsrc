/* @flow */

import * as React from 'react'

import type { CacheProps, CacheState } from './types'

const CacheContext = React.createContext<*>(undefined)

class Cache extends React.Component<CacheProps, CacheState> {
  static defaultProps = {
    map: new Map<*, *>(),
  }

  static Consumer = CacheContext.Consumer

  static displayName = 'Cache'

  /* eslint-disable react/no-unused-state */
  state = {
    get: this.get.bind(this),
    has: this.has.bind(this),
    entries: this.entries.bind(this),
    values: this.values.bind(this),
    keys: this.keys.bind(this),
    forEach: this.forEach.bind(this),
    // NOTE: these methods will trigger setState
    set: this.set.bind(this),
    delete: this.delete.bind(this),
    clear: this.clear.bind(this),
  }
  /* eslint-enable react/no-unused-state */

  get (key: string): * {
    const { map } = this.props
    return map.get(key)
  }

  has (key: string): boolean {
    const { map } = this.props
    return map.has(key)
  }

  entries (): Array<*> {
    const { map } = this.props
    return [...map.entries()]
  }

  values (): Array<*> {
    const { map } = this.props
    return [...map.values()]
  }

  keys (): Array<*> {
    const { map } = this.props
    return [...map.keys()]
  }

  forEach (callbackFn: () => void, thisArg: any): void {
    const { map } = this.props
    return map.forEach(callbackFn, thisArg)
  }

  // ---------
  // Actions that modify entries also trigger setState
  // in order to communicate context updates to consumers.

  set (key: *, value: *): Map<*, *> {
    const { map } = this.props
    const result = map.set(key, value)
    this.touchState()
    return result
  }

  delete (key: *): boolean {
    const { map } = this.props
    const result = map.delete(key)
    // Only update state if the key being removed exists
    if (result) {
      this.touchState()
    }
    return result
  }

  clear (): void {
    const { map } = this.props
    map.clear()
    this.touchState()
  }

  touchState (): void {
    this.setState(prevState => prevState)
  }

  render () {
    const { children } = this.props

    return (
      <CacheContext.Provider value={ this.state }>
        { children }
      </CacheContext.Provider>
    )
  }
}

export default Cache
