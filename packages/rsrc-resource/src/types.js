/* @flow */
import type { FetchConfig, FetchState } from 'rsrc-fetch'

type ResourceParams = {
  [key: string]: string,
}

type ResourceQuery = {
  [key: string]: string,
}

type ResourceAction = (any) => {
  path?: string,
  params?: ResourceParams,
  query?: ResourceQuery,
  options?: RequestOptions,
  invalidates?: string | string[],
}

type ResourceMappedActions = {
  [action: string]: (any) => Promise<FetchState>,
}

type ResourceMeta = {
  path: string,
  params: ResourceParams,
  query: ResourceQuery,
  options: RequestOptions,
  maxAge: number,
}

type ResourceState = {
  meta: ResourceMeta,
  state: FetchState,
  actions: ResourceMappedActions,
}

export type ResourceProps = ResourceMeta & {
  actions: {
    [key: string]: ResourceAction,
  },
  config?: FetchConfig,
  children: (ResourceState) => React.Node,
}
