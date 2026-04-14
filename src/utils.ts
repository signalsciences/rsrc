import type { CacheEntry } from "./types";

export function buildCacheKey(key: string, queries?: Record<string, unknown>): string {
  if (!queries || Object.keys(queries).length === 0) return key;
  return `${key}::${JSON.stringify(queries)}`;
}

export function isStale(lastResolved: number | undefined, maxAge: number | undefined): boolean {
  if (maxAge === undefined || lastResolved === undefined) return false;
  return Date.now() - lastResolved > maxAge * 1000;
}
