import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import React from "react";
import { defineResource, CacheProvider, createCache, useResource } from "../src/index";
import type { Cache } from "../src/types";

let cache: Cache;
const onActionSuccess = vi.fn();
const onActionError = vi.fn();

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(CacheProvider, {
    cache,
    onActionSuccess,
    onActionError,
    children,
  });
}

beforeEach(() => {
  cache = createCache();
  onActionSuccess.mockClear();
  onActionError.mockClear();
});

describe("rsrc v2 integration", () => {
  it("full CRUD flow: list, detail, update invalidates list, auto-refetch detail", async () => {
    let listVersion = 0;
    let detailVersion = 0;

    const getWorkspaceRules = vi.fn(
      (_p: { workspaceId: string }, _q?: { page?: number }) =>
        Promise.resolve({ rules: [], version: ++listVersion }),
    );

    const getWorkspaceRule = vi.fn(
      (_p: { workspaceId: string; ruleId: string }) =>
        Promise.resolve({ id: "r1", version: ++detailVersion }),
    );

    const updateWorkspaceRule = vi.fn(
      (_p: { workspaceId: string; ruleId: string }, _b: { name: string }) =>
        Promise.resolve({ id: "r1", name: "updated" }),
    );

    const useWorkspaceRules = defineResource({
      key: ({ workspaceId }: { workspaceId: string }) => `/ws/${workspaceId}/rules`,
      get: getWorkspaceRules,
      maxAge: 120,
    });

    const useWorkspaceRule = defineResource({
      key: ({ workspaceId, ruleId }: { workspaceId: string; ruleId: string }) =>
        `/ws/${workspaceId}/rules/${ruleId}`,
      get: getWorkspaceRule,
      maxAge: 60,
      actions: {
        update: {
          fn: updateWorkspaceRule,
          invalidates: [useWorkspaceRules],
          meta: { toast: { success: "Rule updated." } },
        },
      },
    });

    // Mount list (page 1 and page 2)
    const { result: list1 } = renderHook(
      () => useWorkspaceRules({ workspaceId: "w1" }, { page: 1 }),
      { wrapper },
    );
    const { result: list2 } = renderHook(
      () => useWorkspaceRules({ workspaceId: "w1" }, { page: 2 }),
      { wrapper },
    );

    await waitFor(() => expect(list1.current.state.fulfilled).toBe(true));
    await waitFor(() => expect(list2.current.state.fulfilled).toBe(true));
    expect(getWorkspaceRules).toHaveBeenCalledTimes(2);

    // Mount detail
    const { result: detail } = renderHook(
      () => useWorkspaceRule({ workspaceId: "w1", ruleId: "r1" }),
      { wrapper },
    );
    await waitFor(() => expect(detail.current.state.fulfilled).toBe(true));
    expect(detail.current.state.value).toEqual({ id: "r1", version: 1 });

    // Update the rule
    await act(async () => {
      await detail.current.actions.update({ name: "new name" });
    });

    // List should have been invalidated (both pages re-fetch)
    await waitFor(() => {
      expect(getWorkspaceRules).toHaveBeenCalledTimes(4);
    });

    // Detail should have auto-refetched
    await waitFor(() => {
      expect(detail.current.state.value).toEqual({ id: "r1", version: 2 });
    });

    // Meta channel should have been called
    expect(onActionSuccess).toHaveBeenCalledWith(
      { toast: { success: "Rule updated." } },
      { id: "r1", name: "updated" },
    );
  });

  it("inline useResource works alongside defineResource", async () => {
    const inlineGet = vi.fn(() => Promise.resolve({ setting: "dark" }));

    const { result } = renderHook(
      () => useResource({ key: "/settings", get: inlineGet }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.state.fulfilled).toBe(true));
    expect(result.current.state.value).toEqual({ setting: "dark" });
  });
});
