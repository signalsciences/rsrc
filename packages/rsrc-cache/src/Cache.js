/* @flow */

import * as React from 'react'

import type { CacheProps, CacheState } from './types'

const CacheContext = React.createContext<*>(undefined)

class Cache extends React.Component<CacheProps, CacheState> {
  static defaultProps = {
    cache: new Map<*, *>(),
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
    const { cache } = this.props
    return cache.get(key)
  }

  has (key: string): boolean {
    const { cache } = this.props
    return cache.has(key)
  }

  entries (): Iterator<*> {
    const { cache } = this.props
    return cache.entries()
  }

  values (): Iterator<*> {
    const { cache } = this.props
    return cache.values()
  }

  keys (): Iterator<*> {
    const { cache } = this.props
    return cache.keys()
  }

  forEach (callbackFn: () => void, thisArg: any): void {
    const { cache } = this.props
    return cache.forEach(callbackFn, thisArg)
  }

  // ---------
  // Actions that potentially mutate keys or values need to trigger a state
  // change in order for context "prop"-agation to occur down the chain.

  /**
   * Set an item in the cache.
   *
   * @param {String} key - the key to remove.
   * @param {*} value - the value to cache for the key.
   * @return {Map} cache - the updated cache.
   * @api public
   */
  set (key: *, value: *): Map<*, *> {
    const { cache } = this.props
    const result = cache.set(key, value)
    this.touchState()
    return result
  }

  /**
   * Delete an item from the cache.
   *
   * @param {String} key - the key to remove.
   * @return {boolean}
   * @api public
   */
  delete (key: *): boolean {
    const { cache } = this.props
    const result = cache.delete(key)
    // Only update state if the key being removed exists
    if (result) {
      this.touchState()
    }
    return result
  }

  /**
   * Clear all items from the cache.
   *
   * @api public
   */
  clear (): void {
    const { cache } = this.props
    cache.clear()
    this.touchState()
  }

  /**
   * Reach out and...
   * Touch state to trigger context update.
   *
   * @api private
   * @returns personal jesus
   */
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
