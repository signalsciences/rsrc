import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import React from "react";
import { CacheProvider, useCacheContext } from "../src/context";
import { createCache } from "../src/cache";

function wrapper(cache: ReturnType<typeof createCache>, props?: Partial<React.ComponentProps<typeof CacheProvider>>) {
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(CacheProvider, { cache, ...props, children });
}

describe("CacheProvider", () => {
  it("provides cache via context", () => {
    const cache = createCache();
    const { result } = renderHook(() => useCacheContext(), {
      wrapper: wrapper(cache),
    });
    expect(result.current.cache).toBe(cache);
  });

  it("provides onActionSuccess callback", () => {
    const cache = createCache();
    const onActionSuccess = vi.fn();
    const { result } = renderHook(() => useCacheContext(), {
      wrapper: wrapper(cache, { onActionSuccess }),
    });
    expect(result.current.onActionSuccess).toBe(onActionSuccess);
  });

  it("provides onActionError callback", () => {
    const cache = createCache();
    const onActionError = vi.fn();
    const { result } = renderHook(() => useCacheContext(), {
      wrapper: wrapper(cache, { onActionError }),
    });
    expect(result.current.onActionError).toBe(onActionError);
  });

  it("returns null context when no provider is present", () => {
    const { result } = renderHook(() => useCacheContext());
    expect(result.current).toBeNull();
  });
});
