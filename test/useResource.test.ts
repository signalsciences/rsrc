import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import React from "react";
import { useResource } from "../src/useResource";
import { CacheProvider } from "../src/context";
import { createCache } from "../src/cache";
import type { Cache } from "../src/types";

let cache: Cache;

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(CacheProvider, { cache, children });
}

beforeEach(() => {
  cache = createCache();
});

describe("useResource", () => {
  it("fetches on mount and transitions to fulfilled", async () => {
    const get = vi.fn(() => Promise.resolve({ name: "test" }));

    const { result } = renderHook(
      () => useResource({ key: "/test", get }),
      { wrapper },
    );

    expect(result.current.state.pending).toBe(true);

    await waitFor(() => {
      expect(result.current.state.fulfilled).toBe(true);
    });

    expect(result.current.state.value).toEqual({ name: "test" });
    expect(result.current.state.pending).toBe(false);
    expect(result.current.state.rejected).toBe(false);
  });

  it("transitions to rejected on fetch error", async () => {
    const error = new Error("boom");
    const get = vi.fn(() => Promise.reject(error));

    const { result } = renderHook(
      () => useResource({ key: "/fail", get }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.state.rejected).toBe(true);
    });

    expect(result.current.state.reason).toBe(error);
    expect(result.current.state.fulfilled).toBe(false);
  });

  it("uses cache on second mount with same key", async () => {
    const get = vi.fn(() => Promise.resolve("data"));

    const { result, unmount } = renderHook(
      () => useResource({ key: "/cached", get }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));
    unmount();

    const { result: result2 } = renderHook(
      () => useResource({ key: "/cached", get }),
      { wrapper },
    );

    await waitFor(() => expect(result2.current.state.fulfilled).toBe(true));
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("refresh invalidates cache and re-fetches", async () => {
    let callCount = 0;
    const get = vi.fn(() => Promise.resolve(`data-${++callCount}`));

    const { result } = renderHook(
      () => useResource({ key: "/refresh", get }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));
    expect(result.current.state.value).toBe("data-1");

    act(() => {
      result.current.refresh();
    });

    await waitFor(() => {
      expect(result.current.state.value).toBe("data-2");
    });

    expect(get).toHaveBeenCalledTimes(2);
  });

  it("invalidate clears cache without re-fetching", async () => {
    const get = vi.fn(() => Promise.resolve("data"));

    const { result } = renderHook(
      () => useResource({ key: "/inv", get }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));

    act(() => {
      result.current.invalidate();
    });

    expect(cache.has("/inv")).toBe(false);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("respects maxAge — refetches when stale", async () => {
    let callCount = 0;
    const get = vi.fn(() => Promise.resolve(`data-${++callCount}`));

    const { result, unmount } = renderHook(
      () => useResource({ key: "/stale", get, maxAge: 0 }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));
    unmount();

    const { result: result2 } = renderHook(
      () => useResource({ key: "/stale", get, maxAge: 0 }),
      { wrapper },
    );

    await waitFor(() => expect(result2.current.state.value).toBe("data-2"));
    expect(get).toHaveBeenCalledTimes(2);
  });

  it("handles actions and calls meta channel on success", async () => {
    const onActionSuccess = vi.fn();
    const get = vi.fn(() => Promise.resolve({ id: 1, name: "old" }));
    const updateFn = vi.fn(() => Promise.resolve({ id: 1, name: "new" }));

    function actionWrapper({ children }: { children: React.ReactNode }) {
      return React.createElement(CacheProvider, { cache, onActionSuccess, children });
    }

    const { result } = renderHook(
      () =>
        useResource({
          key: "/item",
          get,
          actions: {
            update: {
              fn: (_params: void, body: { name: string }) => updateFn(body),
              meta: { toast: { success: "Updated!" } },
            },
          },
        }),
      { wrapper: actionWrapper },
    );

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));

    await act(async () => {
      await result.current.actions.update({ name: "new" });
    });

    expect(updateFn).toHaveBeenCalledWith({ name: "new" });
    expect(onActionSuccess).toHaveBeenCalledWith(
      { toast: { success: "Updated!" } },
      { id: 1, name: "new" },
    );
  });

  it("calls meta channel on action error", async () => {
    const onActionError = vi.fn();
    const error = new Error("fail");
    const get = vi.fn(() => Promise.resolve("data"));
    const deleteFn = vi.fn(() => Promise.reject(error));

    function actionWrapper({ children }: { children: React.ReactNode }) {
      return React.createElement(CacheProvider, { cache, onActionError, children });
    }

    const { result } = renderHook(
      () =>
        useResource({
          key: "/item2",
          get,
          actions: {
            remove: {
              fn: () => deleteFn(),
              meta: { toast: { error: "Failed!" } },
            },
          },
        }),
      { wrapper: actionWrapper },
    );

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));

    await expect(
      act(async () => {
        await result.current.actions.remove(undefined as never);
      }),
    ).rejects.toThrow("fail");

    expect(onActionError).toHaveBeenCalledWith(
      { toast: { error: "Failed!" } },
      error,
    );
  });

  it("auto-refetches own GET after successful action", async () => {
    let callCount = 0;
    const get = vi.fn(() => Promise.resolve(`data-${++callCount}`));
    const updateFn = vi.fn(() => Promise.resolve("ok"));

    const { result } = renderHook(
      () =>
        useResource({
          key: "/refetch",
          get,
          actions: {
            update: { fn: () => updateFn() },
          },
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.state.value).toBe("data-1"));

    await act(async () => {
      await result.current.actions.update(undefined as never);
    });

    await waitFor(() => {
      expect(result.current.state.value).toBe("data-2");
    });

    expect(get).toHaveBeenCalledTimes(2);
  });

  it("falls back to ephemeral cache when no provider", async () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const get = vi.fn(() => Promise.resolve("data"));

    const { result } = renderHook(() =>
      useResource({ key: "/no-provider", get }),
    );

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("rsrc"),
    );
    consoleSpy.mockRestore();
  });
});
