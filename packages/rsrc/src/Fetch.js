/* @flow */

import * as React from 'react'
import createFetcher from './createFetcher'
import type { FetchProps, FetchState, FetcherState } from './types'

class Fetch extends React.Component<FetchProps, FetchState> {
  static defaultProps = {
    url: '',
    options: {},
    maxAge: 60, // 1 minute
    cache: new Map<*, *>(),
    fetcher: createFetcher()
  }

  static displayName = 'Fetch'

  promise: ?Promise<FetcherState>

  constructor(props: FetchProps) {
    super(props)
    this.state = {
      // promiseState
      pending: false,
      rejected: false,
      fulfilled: false,
      request: null,
      response: null,
      value: null,
      reason: null,
      // actions
      read: this.read.bind(this),
      refresh: this.refresh.bind(this),
      invalidate: this.invalidate.bind(this)
    }
    this.promise = undefined
  }

  componentDidMount() {
    this.read()
  }

  componentDidUpdate(prevProps: FetchProps) {
    const {
      url,
      options,
      maxAge
      // cache,
    } = this.props

    if (
      url !== prevProps.url ||
      options !== prevProps.options ||
      maxAge !== prevProps.maxAge
      // does this effectively turn invalidate into refresh?
      // || !cache.get(url)
    ) {
      this.read()
    }
  }

  componentWillUnmount() {
    // We clear the promise to prevent setState() from being called by
    // lingering promises after the component has unmounted
    this.promise = undefined
  }

  onResolved(fetcherState: ?FetcherState, promise: ?Promise<FetcherState>) {
    // Highlander rule applies: there can be only one promise that sets state
    // Only set state if still mounted and this.promise is known.
    // The reference is removed in componentWillUnmount so it won't attempt to setState.
    if (promise === this.promise) {
      this.setState(prevState => ({ ...prevState, ...fetcherState }))
    }
  }

  read() {
    this.setState(prevState => ({
      ...prevState,
      pending: true
    }))

    const { url, options, maxAge, fetcher, cache } = this.props

    const isCacheable =
      !options.method || options.method.toLowerCase() === 'get'

    let isStale = false
    let cached

    if (isCacheable) {
      cached = cache.get(url)
    }

    /* Discard result if stale */
    if (cached) {
      isStale =
        cached.lastResolved &&
        maxAge &&
        cached.lastResolved + maxAge * 1000 < +new Date()
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
      promise = fetcher(url, options)

      cache.set(url, {
        value: promise
      })
      promise.then(
        () => {
          const r = cache.get(url)
          if (r && r.value === promise) {
            cache.set(url, {
              ...r,
              lastResolved: +new Date()
            })
          }
        },
        error => {
          const r = cache.get(url)
          if (r && r.value === promise) {
            cache.set(url, {
              ...r,
              lastResolved: +new Date()
            })
          }
          throw error
        }
      )
    }

    this.promise = promise

    promise.then(
      fetcherState => {
        this.onResolved(fetcherState, promise)
      },
      fetcherState => {
        this.onResolved(fetcherState, promise)
      }
    )
  }

  invalidate() {
    const { cache, url } = this.props
    cache.delete(url)
  }

  refresh() {
    this.invalidate()
    this.read()
  }

  render() {
    const { children } = this.props

    return (
      <>{typeof children === 'function' ? children(this.state) : children}</>
    )
  }
}

export default Fetch
