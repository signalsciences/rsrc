/* @flow */

import * as React from 'react'
import makeFetcher from './makeFetcher'
import type {
  FetchProps,
  FetchState,
  FetcherState,
} from './types'

function requestToKey (request: Request) {
  return `${request.method} ${request.url}`
}

export default class Fetch extends React.Component<FetchProps, FetchState> {
  static displayName = 'Fetch'

  static defaultProps = {
    maxAge: 60, // 1 minute
    autoFetch: true,
    cache: new Map<*, *>(),
    fetcher: makeFetcher(),
  }

  state = {
    // promiseState
    pending: false,
    rejected: false,
    fulfilled: false,
    request: null,
    response: null,
    value: null,
    reason: null,
    // actions
    fetch: this.fetch.bind(this),
    read: this.read.bind(this),
    refresh: this.refresh.bind(this),
    invalidate: this.invalidate.bind(this),
  }

  promise = undefined

  componentDidMount () {
    const { autoFetch } = this.props
    if (autoFetch) { this.read() }
  }

  componentDidUpdate (prevProps: FetchProps) {
    const {
      autoFetch,
      url,
      options,
      maxAge,
    } = this.props
    if (
      url !== prevProps.url
      || options !== prevProps.options
      || maxAge !== prevProps.maxAge
    ) {
      if (autoFetch) { this.read() }
    }
  }

  componentWillUnmount () {
    // We clear the promise to prevent setState() from being called by
    // lingering promises after the component has unmounted
    this.promise = undefined
  }

  onResolved (fetcherState: ?FetcherState, promise: ?Promise<FetcherState>, error: ?Error) {
    // Highlander rule applies: there can be only one promise that sets state
    // Only set state if still mounted and this.promise is known.
    // The reference is removed in componentWillUnmount so it won't attempt to setState.
    if (promise !== this.promise) return

    if (!error) {
      this.setState(prevState => ({ ...prevState, ...fetcherState }))
    } else {
      // Rethrow error to prevent swallowing
      throw error
    }
  }

  /**
   * Fetch a resource
   *
   * @param {String} [url] - fetch url, falls back to props.url.
   * @param {Object} [options] - fetch options, falls back to props.options.
   * @return {Promise<FetcherState>} fetch - the promise returned from fetch fn.
   * @api public
   */
  fetch () {
    const { fetcher, url, options } = this.props
    return fetcher(url, options)
  }

  /**
   *
   * Read or fetch a resource
   *
   * @param {String} url - fetch url
   * @param {Object} options - fetch options
   * @param {Number} [maxAge] - number of seconds allowed since last resolve
   * @return {Promise<PromiseState>} - promise from cache or fetch
   *
   */
  read () {
    this.setState(prevState => ({
      ...prevState,
      pending: true,
    }))

    const {
      cache, url, options, maxAge,
    } = this.props

    const request = new Request(url, options)
    const key = requestToKey(request)

    const isCacheable = !request.method || request.method.toLowerCase() === 'get'
    let isStale = false
    let cached

    if (isCacheable) {
      cached = cache.get(key)
    }

    /* Discard result if stale */
    if (cached) {
      isStale = cached.lastResolved
        && maxAge
        && (cached.lastResolved + (maxAge * 1000)) < +(new Date())
      if (isStale) {
        cached = undefined
      }
    }

    let promise

    if (cached) {
      /* CACHE HIT */
      promise = cached.value
    } else {
      /* CACHE MISS */
      promise = this.fetch()
      cache.set(key, {
        value: promise,
      })
      promise.then(
        () => {
          const r = cache.get(key)
          if (r && r.value === promise) {
            cache.set(key, {
              ...r,
              lastResolved: +(new Date()),
            })
          }
        },
        (error) => {
          const r = cache.get(key)
          if (r && r.value === promise) {
            cache.set(key, {
              ...r,
              lastResolved: +(new Date()),
            })
          }
          throw error
        }
      )
    }

    promise.then(
      (fetcherState) => {
        this.onResolved(fetcherState, promise, undefined)
      },
      (error) => {
        this.onResolved(undefined, promise, error)
      }
    )

    this.promise = promise

    /*
     * Return the promise for comparison in onResolve to ensure updates are only
     * applied from the most recent read.
     */
    return promise
  }

  invalidate () {
    const { cache, url, options } = this.props
    const request = new Request(url, options)
    const key = requestToKey(request)
    this.promise = undefined
    cache.delete(key)
  }

  refresh () {
    this.invalidate()
    return this.read()
  }

  render () {
    const { children } = this.props

    return (
      <React.Fragment>
        {
          typeof children === 'function'
            ? children(this.state)
            : children
        }
      </React.Fragment>
    )
  }
}
