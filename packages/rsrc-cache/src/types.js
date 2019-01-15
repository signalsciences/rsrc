/* @flow */

export type CacheProps = {
  cache: Map<*, *>,
  children: React.Node,
}

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
