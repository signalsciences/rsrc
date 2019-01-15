/* @flow */

import type { CacheState } from 'rsrc-cache'

export type PromiseState = {
  pending: boolean,
  rejected: boolean,
  fulfilled: boolean,
  request: ?Request,
  response: ?Response,
  value: ?any,
  reason: ?Error,
}

export type FetchConfig = {
  fetchFunction?: typeof fetch,
  checkStatus?: (response: Response) => Promise<Response>,
  parseBody?: (response: Response) => any,
  parseError?: (response: Response, value: any) => Error,
}

export type Fetcher = (init: string | Request, options?: RequestOptions) => Promise<PromiseState>

export type FetchActions = {
  fetch: Fetcher,
  read: () => Promise<PromiseState>,
  refresh: () => Promise<PromiseState>,
  invalidate: () => void,
}

export type FetchState = FetchActions & PromiseState

export type FetchProps = {
  url: string,
  options: RequestOptions,
  children: (FetchState) => React.Node,
  cache: Map<*, *> | CacheState,
  maxAge: number,
  autoFetch?: boolean,
  config?: FetchConfig,
}
