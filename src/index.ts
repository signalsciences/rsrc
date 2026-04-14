// rsrc v2 — public API
export { createCache } from "./cache";
export { CacheProvider } from "./context";
export { useResource } from "./useResource";
export type {
  CacheEntry,
  CacheStore,
  Cache,
  CreateCacheOptions,
  CacheHandle,
  ResourceDefinition,
  InvalidateTarget,
  ActionConfig,
  ActionsConfig,
  ResourceConfig,
  InlineResourceConfig,
  ResourceState,
  MappedActions,
  UseResourceReturn,
  CacheProviderProps,
} from "./types";
