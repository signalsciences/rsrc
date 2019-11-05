/* @flow */

/* eslint-disable no-use-before-define */

import * as React from "react";

/*
 * Cache
 */

export type CacheState = {
  get: (key: *) => *,
  has: (key: *) => boolean,
  entries: () => Array<*>,
  values: () => Array<*>,
  keys: () => Array<*>,
  set: (key: *, value: *) => Map<*, *>,
  delete: (key: *) => any,
  clear: () => void
};

export type CacheProps = {
  map:
    | Map<*, *>
    | {
        get: (key: *) => *,
        has: (key: *) => boolean,
        entries: () => Iterator<*> | Array<*>,
        values: () => Iterator<*> | Array<*>,
        keys: () => Iterator<*> | Array<*>,
        forEach: (Function, any) => void,
        set: (key: *, value: *) => any,
        delete: (key: *) => any,
        clear: () => void
      },
  children: React.Node
};

/*
 * Fetcher
 */

export type FetcherState = {
  pending: boolean,
  rejected: boolean,
  fulfilled: boolean,
  value: ?any,
  reason: ?Error
};

export type FetcherConfig = {
  fetchFunction?: typeof fetch,
  checkStatus?: (response: Response) => Promise<Response>,
  parseBody?: (response: Response) => Promise<any>,
  parseError?: (response: Response, value: any) => Promise<Error>
};

export type Fetcher = (
  url: string | Request,
  options?: RequestOptions
) => Promise<FetcherState>;

/*
 * Fetch
 */

export type FetchState = FetcherState & {
  invalidate: () => void,
  read: () => void,
  refresh: () => void
};

export type FetchProps = {
  url: string,
  options: RequestOptions,
  maxAge: number,

  children: FetchState => React.Node,

  /* Optional configuration overrides */
  cache: Map<*, *> | CacheState,
  fetcher: Fetcher
};

/*
 * Resource
 */

export type ResourceState = {
  state: FetchState,
  actions: {
    [key: string]: (*) => Promise<*>
  },
  meta: ResourceProps
};

export type ResourceProps = {
  url: string,
  options: RequestOptions,
  maxAge: number,
  actions: {
    [key: string]: (
      *
    ) => {
      url?: string,
      options?: RequestOptions,
      maxAge?: number,
      invalidates?: Array<string | RegExp>
    }
  },

  children: ResourceState => React.Node,
  fetcher: Fetcher
};
