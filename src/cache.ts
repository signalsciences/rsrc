import type { Cache, CacheEntry, CacheStore, CreateCacheOptions } from "./types";

export function createCache(options?: CreateCacheOptions): Cache {
  const store: CacheStore = (options?.store as CacheStore) ?? new Map<string, CacheEntry>();
  const listeners = new Set<() => void>();

  function notify() {
    listeners.forEach((fn) => fn());
  }

  function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function invalidateByKeyBase(keyBase: string): void {
    const toDelete: string[] = [];
    for (const key of store.keys()) {
      if (key === keyBase || key.startsWith(keyBase + "::")) {
        toDelete.push(key);
      }
    }
    if (toDelete.length === 0) return;
    toDelete.forEach((key) => store.delete(key));
    notify();
  }

  return {
    get: (key) => store.get(key),
    set: (key, entry) => {
      store.set(key, entry);
      notify();
    },
    delete: (key) => {
      store.delete(key);
      notify();
    },
    keys: () => store.keys(),
    has: (key) => store.has(key),
    subscribe,
    notify,
    invalidateByKeyBase,
  };
}
