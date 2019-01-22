/* @flow */

import * as React from 'react'

/*
 * Cache
 */

export type CacheState = {
  get: (key: *) => *,
  has: (key: *) => boolean,
  entries: () => Iterator<*>,
  values: () => Iterator<*>,
  keys: () => Iterator<*>,
  forEach: (Function, any) => void,
  set: (key: *, value: *) => Map<*, *>,
  delete: (key: *) => boolean,
  clear: () => void,
}

export type CacheProps = {
  map: Map<*, *> | {
    get: (key: *) => *,
    has: (key: *) => boolean,
    entries: () => Iterator<*>,
    values: () => Iterator<*>,
    keys: () => Iterator<*>,
    forEach: (Function, any) => void,
    set: (key: *, value: *) => Map<*, *>,
    delete: (key: *) => boolean,
    clear: () => void,
  },
  children: React.Node,
}


/*
 * Fetcher
 */

export type FetcherState = {
  pending: boolean,
  rejected: boolean,
  fulfilled: boolean,
  request: ?Request,
  response: ?Response,
  value: ?any,
  reason: ?Error,
}

export type FetcherConfig = {
  fetch?: typeof fetch,
  checkStatus?: (response: Response) => Promise<Response>,
  parseBody?: (response: Response) => any,
  parseError?: (response: Response, value: any) => Error,
}

export type Fetcher = (url: string | Request, options?: RequestOptions) => Promise<FetcherState>


/*
 * Fetch
 */

export type FetchState = FetcherState & {
  read: () => void,
  invalidate: () => void,
  refresh: () => void,

  // TODO: remove this
  // convenience helper for Resource
  fetch: Fetcher,
}

export type FetchProps = {
  url: string | Request,
  options?: RequestOptions,
  maxAge: number,

  autoFetch: boolean,

  children: (FetchState) => React.Node,

  /* Optional configuration overrides */
  cache: Map<*, *> | CacheState,
  fetcher: Fetcher,
}


/*
 * Resource
 */

type ResourceDefinition = {
  path?: string,
  params?: { [key: string]: string },
  query?: { [key: string]: string },
  options?: RequestOptions,
  maxAge?: number,
}

export type ResourceState = {
  state: FetchState,
  actions: {
    [key: string]: (*) => Promise<FetcherState>,
  },
  meta: ResourceDefinition,
}

export type ResourceProps = ResourceDefinition & {
  actions: {
    [key: string]: (*) => ResourceDefinition & { invalidates?: string | string[] }
  },

  children: (ResourceState) => React.Node,

  /* Optional configuration overrides */
  cache: Map<*, *> | CacheState,
  fetcher: Fetcher,
}
