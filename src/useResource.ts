import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useCacheContext } from "./context";
import { createCache } from "./cache";
import { isStale } from "./utils";
import type {
  Cache,
  ResourceState,
  ActionsConfig,
  MappedActions,
  UseResourceReturn,
  InlineResourceConfig,
  CacheHandle,
  ResourceDefinition,
} from "./types";

// ---- Shared ephemeral cache for when no provider exists ----

let ephemeralCache: Cache | null = null;
let warnedOnce = false;

function getEphemeralCache(): Cache {
  if (!ephemeralCache) {
    ephemeralCache = createCache();
  }
  if (!warnedOnce) {
    console.warn(
      "rsrc: No CacheProvider found. Using an ephemeral cache. Wrap your app in <CacheProvider> for shared caching.",
    );
    warnedOnce = true;
  }
  return ephemeralCache;
}

// Reset for testing
export function _resetEphemeralState(): void {
  ephemeralCache = null;
  warnedOnce = false;
}

// ---- Internal hook (shared by useResource and defineResource) ----

export interface UseResourceInternalOptions<TData, TActions extends ActionsConfig<any>> {
  key: string;
  get: () => Promise<TData>;
  maxAge?: number;
  actions?: TActions;
  actionParams?: unknown;
}

function fetchAndStore<TData>(cache: Cache, key: string, get: () => Promise<TData>): Promise<TData> {
  const promise = get();
  cache.set(key, { value: promise as Promise<unknown> });

  // Update lastResolved timestamp once the promise resolves successfully
  promise.then(
    () => {
      const entry = cache.get(key);
      if (entry && entry.value === (promise as Promise<unknown>)) {
        cache.set(key, { value: promise as Promise<unknown>, lastResolved: Date.now() });
      }
    },
    () => {
      // Don't delete from cache on rejection — that causes infinite loops via subscription.
      // The hook's resolvePromise handler already transitions state to rejected.
    },
  );

  return promise;
}

export function useResourceInternal<TData, TActions extends ActionsConfig<any>>(
  options: UseResourceInternalOptions<TData, TActions>,
): UseResourceReturn<TData, TActions> {
  const { key, get, maxAge, actions: actionConfigs, actionParams } = options;

  const ctx = useCacheContext();
  const cache: Cache = ctx?.cache ?? getEphemeralCache();
  const onActionSuccess = ctx?.onActionSuccess;
  const onActionError = ctx?.onActionError;

  const [state, setState] = useState<ResourceState<TData>>({
    pending: true,
    fulfilled: false,
    rejected: false,
    value: null,
    reason: null,
  });

  const activePromiseRef = useRef<Promise<TData> | null>(null);
  const mountedRef = useRef(true);
  const getRef = useRef(get);
  getRef.current = get;
  const keyRef = useRef(key);
  keyRef.current = key;
  const actionParamsRef = useRef(actionParams);
  actionParamsRef.current = actionParams;

  // Used to suppress subscription-triggered refetch (for invalidate)
  const suppressRefetchRef = useRef(false);

  // Track whether we initiated a delete ourselves (to differentiate from external invalidation)
  const selfDeleteRef = useRef(false);

  const resolvePromise = useCallback((promise: Promise<TData>) => {
    activePromiseRef.current = promise;
    promise.then(
      (value) => {
        if (mountedRef.current && activePromiseRef.current === promise) {
          setState({
            pending: false,
            fulfilled: true,
            rejected: false,
            value,
            reason: null,
          });
        }
      },
      (err) => {
        if (mountedRef.current && activePromiseRef.current === promise) {
          setState({
            pending: false,
            fulfilled: false,
            rejected: true,
            value: null,
            reason: err instanceof Error ? err : new Error(String(err)),
          });
        }
      },
    );
  }, []);

  const doFetch = useCallback(() => {
    setState((prev) => (prev.pending ? prev : { ...prev, pending: true }));
    const promise = fetchAndStore(cache, keyRef.current, getRef.current);
    resolvePromise(promise);
  }, [cache, resolvePromise]);

  // Initial fetch or cache resolution
  useEffect(() => {
    mountedRef.current = true;

    const existing = cache.get(key);
    if (existing && !isStale(existing.lastResolved, maxAge)) {
      resolvePromise(existing.value as Promise<TData>);
    } else {
      const promise = fetchAndStore(cache, key, get);
      resolvePromise(promise);
    }

    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Subscribe to cache changes for cross-resource invalidation
  // Only trigger refetch when an external source deletes our key
  useEffect(() => {
    const unsub = cache.subscribe(() => {
      if (!mountedRef.current) return;
      if (suppressRefetchRef.current) return;
      // If key is gone and we didn't delete it ourselves, refetch
      if (!selfDeleteRef.current && !cache.has(keyRef.current)) {
        doFetch();
      }
    });
    return unsub;
  }, [cache, doFetch]);

  const refresh = useCallback(() => {
    selfDeleteRef.current = true;
    cache.delete(keyRef.current);
    selfDeleteRef.current = false;
    doFetch();
  }, [cache, doFetch]);

  const invalidate = useCallback(() => {
    suppressRefetchRef.current = true;
    selfDeleteRef.current = true;
    cache.delete(keyRef.current);
    selfDeleteRef.current = false;
    // Reset suppress flag after microtask so future external invalidation works
    Promise.resolve().then(() => {
      suppressRefetchRef.current = false;
    });
  }, [cache]);

  // Map action configs to callable functions
  const actions = useMemo(() => {
    if (!actionConfigs) return {} as MappedActions<TActions>;

    const mapped: Record<string, (body: unknown) => Promise<unknown>> = {};

    for (const [name, config] of Object.entries(actionConfigs)) {
      mapped[name] = async (body: unknown) => {
        try {
          const result = await config.fn(actionParamsRef.current, body);

          // Call meta channel on success
          if (config.meta && onActionSuccess) {
            onActionSuccess(config.meta, result);
          }

          // Run invalidation targets
          if (config.invalidates) {
            const cacheHandle: CacheHandle = {
              invalidate: (resource: ResourceDefinition<any, any>, params?: unknown) => {
                if (params !== undefined) {
                  const targetKey = resource.key(params);
                  cache.invalidateByKeyBase(targetKey);
                } else {
                  // No params: invalidate ALL known key bases for this resource
                  const keyBases = (resource as any).__keyBases as Set<string> | undefined;
                  if (keyBases) {
                    for (const keyBase of keyBases) {
                      cache.invalidateByKeyBase(keyBase);
                    }
                  }
                }
              },
            };

            for (const target of config.invalidates) {
              // Check if target is a ResourceDefinition (has __brand) vs a custom function
              if (typeof target === "function" && (target as any).__brand === "rsrc_resource") {
                // Direct resource reference — targeted invalidation using current params
                const targetKey = (target as unknown as ResourceDefinition<any, any>).key(actionParamsRef.current);
                cache.invalidateByKeyBase(targetKey);
              } else if (typeof target === "function") {
                // Custom invalidation function
                (target as (params: any, cache: CacheHandle) => void)(actionParamsRef.current, cacheHandle);
              } else {
                // Plain resource definition object (non-function)
                const targetKey = (target as ResourceDefinition<any, any>).key(actionParamsRef.current);
                cache.invalidateByKeyBase(targetKey);
              }
            }
          }

          // Auto-refetch own GET after successful action
          refresh();

          return result;
        } catch (err) {
          if (config.meta && onActionError) {
            onActionError(config.meta, err instanceof Error ? err : new Error(String(err)));
          }
          throw err;
        }
      };
    }

    return mapped as MappedActions<TActions>;
  }, [actionConfigs, onActionSuccess, onActionError, cache, refresh]);

  return {
    state,
    actions,
    refresh,
    invalidate,
  };
}

// ---- Public useResource hook (inline usage) ----

export function useResource<TData, TActions extends ActionsConfig<void> = ActionsConfig<void>>(
  config: InlineResourceConfig<TData, TActions>,
): UseResourceReturn<TData, TActions> {
  return useResourceInternal<TData, TActions>({
    key: config.key,
    get: config.get,
    maxAge: config.maxAge,
    actions: config.actions,
  });
}
