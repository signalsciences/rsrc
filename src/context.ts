import { createContext, useContext, createElement } from "react";
import type { Cache, CacheProviderProps } from "./types";

export interface CacheContextValue {
  cache: Cache;
  onActionSuccess?: (meta: unknown, result: unknown) => void;
  onActionError?: (meta: unknown, error: Error) => void;
}

const CacheContext = createContext<CacheContextValue | null>(null);

export function useCacheContext(): CacheContextValue | null {
  return useContext(CacheContext);
}

export function CacheProvider({ cache, onActionSuccess, onActionError, children }: CacheProviderProps) {
  return createElement(
    CacheContext.Provider,
    { value: { cache, onActionSuccess, onActionError } },
    children,
  );
}
