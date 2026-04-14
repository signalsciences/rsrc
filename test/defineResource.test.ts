import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import React from "react";
import { defineResource } from "../src/defineResource";
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

describe("defineResource", () => {
  it("returns a hook that fetches on mount", async () => {
    const useItem = defineResource({
      key: ({ id }: { id: string }) => `/items/${id}`,
      get: ({ id }: { id: string }) => Promise.resolve({ id, name: "test" }),
    });

    const { result } = renderHook(() => useItem({ id: "1" }), { wrapper });

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));
    expect(result.current.state.value).toEqual({ id: "1", name: "test" });
  });

  it("supports queries as second argument", async () => {
    const get = vi.fn(
      (_params: { workspaceId: string }, queries?: { page?: number }) =>
        Promise.resolve([{ id: queries?.page ?? 1 }]),
    );

    const useItems = defineResource({
      key: ({ workspaceId }: { workspaceId: string }) => `/ws/${workspaceId}/items`,
      get,
    });

    const { result } = renderHook(
      () => useItems({ workspaceId: "1" }, { page: 2 }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));
    expect(get).toHaveBeenCalledWith({ workspaceId: "1" }, { page: 2 });
  });

  it("caches separately for different queries", async () => {
    let callCount = 0;
    const get = vi.fn(
      (_p: { id: string }, _q?: { page?: number }) => Promise.resolve(++callCount),
    );

    const useItems = defineResource({
      key: ({ id }: { id: string }) => `/items/${id}`,
      get,
    });

    const { result: r1 } = renderHook(
      () => useItems({ id: "1" }, { page: 1 }),
      { wrapper },
    );
    const { result: r2 } = renderHook(
      () => useItems({ id: "1" }, { page: 2 }),
      { wrapper },
    );

    await waitFor(() => expect(r1.current.state.fulfilled).toBe(true));
    await waitFor(() => expect(r2.current.state.fulfilled).toBe(true));
    expect(get).toHaveBeenCalledTimes(2);
  });

  it("cross-resource invalidation: action invalidates another resource", async () => {
    const listGet = vi.fn(
      (_p: { workspaceId: string }) => Promise.resolve([{ id: "1" }]),
    );
    const itemGet = vi.fn(
      (_p: { workspaceId: string; ruleId: string }) =>
        Promise.resolve({ id: "1", name: "rule" }),
    );
    const updateFn = vi.fn(
      (_p: { workspaceId: string; ruleId: string }, _b: { name: string }) =>
        Promise.resolve({ id: "1", name: "updated" }),
    );

    const useRules = defineResource({
      key: ({ workspaceId }: { workspaceId: string }) => `/ws/${workspaceId}/rules`,
      get: listGet,
    });

    const useRule = defineResource({
      key: ({ workspaceId, ruleId }: { workspaceId: string; ruleId: string }) =>
        `/ws/${workspaceId}/rules/${ruleId}`,
      get: itemGet,
      actions: {
        update: {
          fn: updateFn,
          invalidates: [useRules],
        },
      },
    });

    // Mount list resource
    const { result: listResult } = renderHook(
      () => useRules({ workspaceId: "1" }),
      { wrapper },
    );
    await waitFor(() => expect(listResult.current.state.fulfilled).toBe(true));
    expect(listGet).toHaveBeenCalledTimes(1);

    // Mount item resource
    const { result: itemResult } = renderHook(
      () => useRule({ workspaceId: "1", ruleId: "r1" }),
      { wrapper },
    );
    await waitFor(() => expect(itemResult.current.state.fulfilled).toBe(true));

    // Trigger update — should invalidate the list
    await act(async () => {
      await itemResult.current.actions.update({ name: "new name" });
    });

    // List should have been re-fetched
    await waitFor(() => {
      expect(listGet).toHaveBeenCalledTimes(2);
    });
  });

  it("invalidation blows away all query variants", async () => {
    const listGet = vi.fn(
      (_p: { id: string }, _q?: { page?: number }) => Promise.resolve([]),
    );
    const itemGet = vi.fn(
      (_p: { id: string; itemId: string }) => Promise.resolve({ id: "1" }),
    );
    const deleteFn = vi.fn(
      (_p: { id: string; itemId: string }) => Promise.resolve(undefined),
    );

    const useList = defineResource({
      key: ({ id }: { id: string }) => `/lists/${id}`,
      get: listGet,
    });

    const useItem = defineResource({
      key: ({ id, itemId }: { id: string; itemId: string }) =>
        `/lists/${id}/items/${itemId}`,
      get: itemGet,
      actions: {
        remove: {
          fn: deleteFn,
          invalidates: [useList],
        },
      },
    });

    // Mount two pages of the list
    renderHook(() => useList({ id: "1" }, { page: 1 }), { wrapper });
    renderHook(() => useList({ id: "1" }, { page: 2 }), { wrapper });

    await waitFor(() => expect(listGet).toHaveBeenCalledTimes(2));

    // Mount item and delete it
    const { result: itemResult } = renderHook(
      () => useItem({ id: "1", itemId: "x" }),
      { wrapper },
    );
    await waitFor(() => expect(itemResult.current.state.fulfilled).toBe(true));

    await act(async () => {
      await itemResult.current.actions.remove(undefined as never);
    });

    // Both pages should re-fetch
    await waitFor(() => {
      expect(listGet).toHaveBeenCalledTimes(4);
    });
  });

  it("custom invalidation function receives params and cache handle", async () => {
    const dashGet = vi.fn(
      (_p: { workspaceId: string }) => Promise.resolve({ count: 5 }),
    );
    const itemGet = vi.fn(
      (_p: { workspaceId: string; id: string }) => Promise.resolve({ id: "1" }),
    );
    const updateFn = vi.fn(
      (_p: { workspaceId: string; id: string }) => Promise.resolve("ok"),
    );

    const useDashboard = defineResource({
      key: ({ workspaceId }: { workspaceId: string }) => `/ws/${workspaceId}/dashboard`,
      get: dashGet,
    });

    const useItem = defineResource({
      key: ({ workspaceId, id }: { workspaceId: string; id: string }) =>
        `/ws/${workspaceId}/items/${id}`,
      get: itemGet,
      actions: {
        update: {
          fn: updateFn,
          invalidates: [
            (params, cacheHandle) => {
              cacheHandle.invalidate(useDashboard, { workspaceId: params.workspaceId });
            },
          ],
        },
      },
    });

    // Mount dashboard
    const { result: dashResult } = renderHook(
      () => useDashboard({ workspaceId: "w1" }),
      { wrapper },
    );
    await waitFor(() => expect(dashResult.current.state.fulfilled).toBe(true));
    expect(dashGet).toHaveBeenCalledTimes(1);

    // Mount item and update
    const { result: itemResult } = renderHook(
      () => useItem({ workspaceId: "w1", id: "i1" }),
      { wrapper },
    );
    await waitFor(() => expect(itemResult.current.state.fulfilled).toBe(true));

    await act(async () => {
      await itemResult.current.actions.update(undefined as never);
    });

    // Dashboard should have been re-fetched
    await waitFor(() => {
      expect(dashGet).toHaveBeenCalledTimes(2);
    });
  });

  it("cache.invalidate with no params blows away all entries for resource", async () => {
    const dashGet = vi.fn(
      (_p: { workspaceId: string }) => Promise.resolve({ count: 0 }),
    );
    const triggerGet = vi.fn(() => Promise.resolve("data"));
    const triggerFn = vi.fn(() => Promise.resolve("ok"));

    const useDashboard = defineResource({
      key: ({ workspaceId }: { workspaceId: string }) => `/ws/${workspaceId}/dashboard`,
      get: dashGet,
    });

    const useTrigger = defineResource({
      key: () => "/trigger",
      get: triggerGet,
      actions: {
        fire: {
          fn: triggerFn,
          invalidates: [
            (_params, cacheHandle) => {
              cacheHandle.invalidate(useDashboard);
            },
          ],
        },
      },
    });

    // Mount two different workspace dashboards
    renderHook(() => useDashboard({ workspaceId: "1" }), { wrapper });
    renderHook(() => useDashboard({ workspaceId: "2" }), { wrapper });
    await waitFor(() => expect(dashGet).toHaveBeenCalledTimes(2));

    // Fire trigger
    const { result: triggerResult } = renderHook(
      () => useTrigger({}),
      { wrapper },
    );
    await waitFor(() => expect(triggerResult.current.state.fulfilled).toBe(true));

    await act(async () => {
      await triggerResult.current.actions.fire(undefined as never);
    });

    // Both dashboards should re-fetch
    await waitFor(() => {
      expect(dashGet).toHaveBeenCalledTimes(4);
    });
  });

  it("returned hook has ResourceDefinition brand and key function", () => {
    const useItem = defineResource({
      key: ({ id }: { id: string }) => `/items/${id}`,
      get: ({ id }: { id: string }) => Promise.resolve(id),
    });

    expect(useItem.__brand).toBe("rsrc_resource");
    expect(useItem.key({ id: "42" })).toBe("/items/42");
  });
});
