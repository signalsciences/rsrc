/* @flow */

import * as React from "react";
import createFetcher from "./createFetcher";
import type { FetchProps, FetchState } from "./types";

const defaultState = {
  pending: false,
  rejected: false,
  fulfilled: false,
  value: null,
  reason: null
};

class Fetch extends React.Component<FetchProps, FetchState> {
  promise: ?Promise<*>;

  static displayName = "Fetch";

  static defaultProps = {
    url: "",
    options: {},
    maxAge: 60, // 1 minute
    cache: new Map<*, *>(),
    fetcher: createFetcher()
  };

  constructor(props: FetchProps) {
    super(props);
    this.state = {
      // promiseState
      ...defaultState,
      pending: true,
      // actions
      read: this.read.bind(this),
      refresh: this.refresh.bind(this),
      invalidate: this.invalidate.bind(this)
    };
    this.promise = undefined;
  }

  componentDidMount() {
    this.read();
  }

  componentDidUpdate(prevProps: FetchProps) {
    const { url, options, maxAge, cache } = this.props;

    if (
      !cache.get(url) ||
      url !== prevProps.url ||
      options !== prevProps.options ||
      maxAge !== prevProps.maxAge
    ) {
      this.read();
    }
  }

  componentWillUnmount() {
    // We clear the promise to prevent setState() from being called by
    // lingering promises after the component has unmounted
    this.promise = undefined;
  }

  onFulfill(value: *, promise: ?Promise<*>) {
    // Highlander rule applies: there can be only one promise that sets state
    // Only set state if still mounted and this.promise is known.
    // The reference is removed in componentWillUnmount so it won't attempt to setState.
    if (promise === this.promise) {
      this.setState(() => ({
        // promiseState
        ...defaultState,
        fulfilled: true,
        value
      }));
    }
  }

  onReject(reason: Error, promise: ?Promise<*>) {
    if (promise === this.promise) {
      this.setState(() => ({
        // promiseState
        ...defaultState,
        rejected: true,
        reason
      }));
    }
  }

  read() {
    this.setState(prevState => ({
      ...prevState,
      pending: true
    }));

    const { url, options, maxAge, fetcher, cache } = this.props;

    const isCacheable =
      !options.method || options.method.toLowerCase() === "get";

    let isStale = false;
    let cached;

    if (isCacheable) {
      cached = cache.get(url);
    }

    /* Discard result if stale */
    if (cached) {
      isStale =
        cached.lastResolved &&
        maxAge &&
        cached.lastResolved + maxAge * 1000 < +new Date();
      if (isStale) {
        cached = undefined;
      }
    }

    let promise;

    if (cached) {
      /* CACHE HIT */
      promise = cached.value;
    } else {
      /* CACHE MISS */
      promise = fetcher(url, options);

      cache.set(url, {
        value: promise
      });
      promise.then(
        () => {
          const r = cache.get(url);
          if (r && r.value === promise) {
            cache.set(url, {
              ...r,
              lastResolved: +new Date()
            });
          }
        },
        () => {
          const r = cache.get(url);
          if (r && r.value === promise) {
            cache.set(url, {
              ...r,
              lastResolved: +new Date()
            });
          }
        }
      );
    }

    this.promise = promise;

    promise
      .then(value => {
        this.onFulfill(value, promise);
      })
      .catch(error => {
        this.onReject(error, promise);
      });
  }

  invalidate() {
    const { cache, url } = this.props;
    cache.delete(url);
  }

  refresh() {
    this.invalidate();
    this.read();
  }

  render() {
    const { children } = this.props;

    return (
      <>{typeof children === "function" ? children(this.state) : children}</>
    );
  }
}

export default Fetch;
