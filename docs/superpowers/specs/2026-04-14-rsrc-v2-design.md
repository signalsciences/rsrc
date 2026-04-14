# rsrc v2 Design Spec

## Overview

rsrc v2 is a TypeScript-native, hook-based React library for managing async resource state. It provides a shared cache, declarative cache invalidation, and a generic metadata channel for application-level concerns like notifications.

rsrc is **fetcher-agnostic**. It does not own HTTP, validation, or serialization. It consumes functions that return promises. Those functions can come from oax-generated clients, hand-written fetch calls, axios, gRPC wrappers, or anything else.

### Responsibilities

| Concern | Owner |
|---------|-------|
| Schemas, types, runtime validation | Fetcher layer (e.g. oax) |
| HTTP, auth, headers, retries | Fetcher layer |
| Cache lifecycle (store, TTL, invalidation) | **rsrc** |
| Resource state (pending/fulfilled/rejected) | **rsrc** |
| Cross-resource invalidation | **rsrc** |
| Metadata channel (toast, logging, etc.) | **rsrc** (passthrough) |
| Rendering notifications/toasts | Application |

### Key Decisions

- **No React Query dependency.** rsrc owns the cache and invalidation entirely.
- **No runtime validation.** rsrc trusts the fetchers it's given. Type safety is enforced via TypeScript generics that propagate fetcher types through to the hook return.
- **No Flow.** TypeScript-native from the ground up.
- **Resource references for invalidation.** `invalidates` takes actual resource references (returned by `defineResource`), not strings. TypeScript catches typos and stale references at compile time.
- **Generic metadata channel.** rsrc passes through opaque `meta` on actions to provider callbacks. It never interprets the metadata — the application decides what it means.

---

## Public API

```typescript
export { CacheProvider, createCache, defineResource, useResource }
```

Four exports. That's the entire library.

---

## ResourceConfig

```typescript
type ResourceConfig<TParams, TData, TActions, TMeta = unknown> = {
  key: (params: TParams) => string;
  get: (params: TParams) => Promise<TData>;
  maxAge?: number; // seconds, default 60
  actions?: TActions;
};

type ActionConfig<TParams, TBody, TResponse, TMeta = unknown> = {
  fn: (params: TParams, body: TBody) => Promise<TResponse>;
  invalidates?: Resource[];
  meta?: TMeta;
};
```

- **`key`** — Returns the cache key for this resource given its params. This is the resource's identity.
- **`get`** — A function that fetches the resource. `(params) => Promise<TData>`. rsrc doesn't care how it works.
- **`maxAge`** — TTL in seconds. Default 60. After this, the cached entry is considered stale and re-fetched on next access.
- **`actions`** — Named mutation operations. Each has a `fn`, optional `invalidates` (resource references), and optional `meta` (opaque metadata).

### Type Flow

`TParams` is shared between `key`, `get`, and all action `fn`s — the resource's identity params flow everywhere. Each action has its own `TBody` and `TResponse`. TypeScript infers these from the fetcher function signatures — no manual type annotations needed if the fetchers are typed (e.g. from oax).

---

## defineResource

```typescript
const useWorkspaceRule = defineResource({
  key: ({ workspaceId, ruleId }) => `/workspaces/${workspaceId}/rules/${ruleId}`,
  get: getWorkspaceRule,
  maxAge: 60,
  actions: {
    update: {
      fn: updateWorkspaceRule,
      invalidates: [useWorkspaceRules],
      meta: { toast: { success: "Rule updated." } },
    },
    delete: {
      fn: deleteWorkspaceRule,
      invalidates: [useWorkspaceRules],
      meta: { toast: { success: "Rule deleted." } },
    },
  },
});
```

`defineResource` takes a `ResourceConfig` and returns a typed React hook. The returned hook:

- Is a reusable, importable function
- Can be referenced in other resources' `invalidates` arrays
- Infers all types from the config (params, response, action bodies)

### Usage

```typescript
const { state, actions, refresh, invalidate } = useWorkspaceRule({ workspaceId, ruleId });
```

---

## useResource (inline)

For one-off cases where you don't need cross-resource invalidation or reusability:

```typescript
const { state, actions, refresh, invalidate } = useResource({
  key: `/rules/${ruleId}`,
  get: () => fetch(`/api/rules/${ruleId}`).then(r => r.json()),
  actions: {
    update: {
      fn: (body) => fetch(`/api/rules/${ruleId}`, { method: 'PATCH', body }),
      meta: { toast: { success: "Updated." } },
    },
  },
});
```

Differences from `defineResource`:

- `key` is a string, not a function (params are captured via closure)
- `get` and `fn` are closures with params already bound
- Cannot be referenced in `invalidates` — no cross-resource invalidation
- Not reusable across components

Self-management still works: `refresh()` re-GETs, `invalidate()` clears from cache.

---

## Hook Return Shape

Both `useResource` and hooks from `defineResource` return:

```typescript
type UseResourceReturn<TData, TActions> = {
  state: {
    pending: boolean;
    fulfilled: boolean;
    rejected: boolean;
    value: TData | null;
    reason: Error | null;
  };
  actions: {
    [K in keyof TActions]: (body: TBody) => Promise<TResponse>;
  };
  refresh: () => void;
  invalidate: () => void;
};
```

- **`state`** — The GET lifecycle. Always starts with an initial fetch on mount.
- **`actions`** — Named mutations from the config. Each returns a promise. On success: invalidates referenced resources, calls provider's `onActionSuccess` with meta, then auto-refetches this resource's own GET.
- **`refresh`** — Invalidate self + re-GET.
- **`invalidate`** — Clear self from cache without re-fetching.

---

## CacheProvider

```typescript
<CacheProvider
  cache={createCache()}
  onActionSuccess={(meta: unknown, result: unknown) => void}
  onActionError={(meta: unknown, error: Error) => void}
>
  <App />
</CacheProvider>
```

- **`cache`** — Required. Created via `createCache()`.
- **`onActionSuccess`** — Called after any action succeeds. Receives the action's `meta` and the result. Application interprets `meta` however it wants (toasts, logging, analytics).
- **`onActionError`** — Called after any action fails. Receives `meta` and the error.

If no `CacheProvider` is found, `useResource` falls back to an instance-level cache (ephemeral, scoped to the component). A dev warning is logged, same as rsrc v1.

---

## createCache

```typescript
const cache = createCache();                    // default Map
const cache = createCache({ store: lruCache }); // custom Map-like backend
```

Factory for the cache instance. Accepts an optional custom store that implements the `Map` interface. Same flexibility as rsrc v1 (LRU, SessionStorage-backed, etc.).

### Cache Entry Shape

```typescript
type CacheEntry = {
  value: Promise<any>;
  lastResolved?: number; // timestamp
};
```

Caches the **promise**, not the resolved value. This gives deduplication for free: multiple components mounting with the same params share one in-flight request.

---

## Cache Invalidation

### Self-Invalidation

Every hook has `refresh()` and `invalidate()`:

- `invalidate()` — Deletes own cache entry.
- `refresh()` — Deletes own cache entry + triggers re-GET.

### Cross-Resource Invalidation

Declared in action configs via `invalidates`:

```typescript
actions: {
  update: {
    fn: updateWorkspaceRule,
    invalidates: [useWorkspaceRules],
  },
}
```

When an action succeeds:

1. rsrc iterates the `invalidates` array.
2. For each referenced resource, calls that resource's `key()` with the current resource's params to compute the cache key.
3. Deletes that cache entry.
4. Any mounted hook watching a deleted key automatically re-fetches.
5. Then re-fetches this resource's own GET (auto-refetch after mutation).

### Why Resource References Instead of Strings

```typescript
// String-based (rsrc v1) — silent failure if URL changes
invalidates: ['/workspaces/${workspaceId}/rules']

// Resource-based (rsrc v2) — compile-time error if resource is removed/renamed
invalidates: [useWorkspaceRules]
```

Resource references are just imports. TypeScript catches broken references. No typos, no hidden coupling, no runtime debugging.

### Param Resolution

When `useWorkspaceRule` (params: `{ workspaceId, ruleId }`) invalidates `useWorkspaceRules` (key needs: `{ workspaceId }`), rsrc passes the current resource's full params to the referenced resource's `key()` function. The key function picks what it needs, ignores the rest. This works because child resources are always a superset of parent params.

---

## Action Lifecycle

When an action is called:

```
actions.update(body)
  |
  +--> fn(params, body)         // call the fetcher
  |
  +--> on success:
  |     +--> invalidate referenced resources
  |     +--> onActionSuccess(meta, result)   // provider callback
  |     +--> auto-refetch own GET            // state.value updates to server truth
  |     +--> return result
  |
  +--> on error:
        +--> onActionError(meta, error)      // provider callback
        +--> throw error
```

There is no optimistic update. After a successful action, the resource re-GETs to reflect the server's response.

---

## Full Example

### App Root

```typescript
import { CacheProvider, createCache } from 'rsrc';

const cache = createCache();

function App() {
  return (
    <CacheProvider
      cache={cache}
      onActionSuccess={(meta) => {
        if (meta?.toast?.success) showToast(meta.toast.success);
      }}
      onActionError={(meta, error) => {
        showToast(meta?.toast?.error || error.message);
      }}
    >
      <Router />
    </CacheProvider>
  );
}
```

### Resource Definitions

```typescript
// resources/workspaceRules.ts
import { defineResource } from 'rsrc';
import { getWorkspaceRules } from '../fetchers';

export const useWorkspaceRules = defineResource({
  key: ({ workspaceId }) => `/workspaces/${workspaceId}/rules`,
  get: getWorkspaceRules,
  maxAge: 120,
});
```

```typescript
// resources/workspaceRule.ts
import { defineResource } from 'rsrc';
import { getWorkspaceRule, updateWorkspaceRule, deleteWorkspaceRule } from '../fetchers';
import { useWorkspaceRules } from './workspaceRules';

export const useWorkspaceRule = defineResource({
  key: ({ workspaceId, ruleId }) => `/workspaces/${workspaceId}/rules/${ruleId}`,
  get: getWorkspaceRule,
  maxAge: 60,
  actions: {
    update: {
      fn: updateWorkspaceRule,
      invalidates: [useWorkspaceRules],
      meta: { toast: { success: "Rule updated." } },
    },
    delete: {
      fn: deleteWorkspaceRule,
      invalidates: [useWorkspaceRules],
      meta: { toast: { success: "Rule deleted." } },
    },
  },
});
```

### Component

```typescript
// components/WorkspaceRule.tsx
import { useWorkspaceRule } from '../resources/workspaceRule';

function WorkspaceRule({ workspaceId, ruleId }) {
  const { state, actions, refresh } = useWorkspaceRule({ workspaceId, ruleId });

  if (state.pending) return <Spinner />;
  if (state.rejected) return <Error error={state.reason} />;

  return (
    <div>
      <h1>{state.value.name}</h1>
      <button onClick={() => actions.update({ name: "New Name" })}>Update</button>
      <button onClick={() => actions.delete()}>Delete</button>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
```

### Inline (No defineResource)

```typescript
// Quick one-off, no cross-resource invalidation
function Settings() {
  const { state } = useResource({
    key: '/settings',
    get: () => fetch('/api/settings').then(r => r.json()),
  });

  if (state.pending) return <Spinner />;
  return <pre>{JSON.stringify(state.value)}</pre>;
}
```

---

## oax Integration

oax can generate base resource configs. rsrc doesn't depend on oax — it just consumes the typed fetcher functions oax produces.

```typescript
// oax generates typed fetchers
declare function getWorkspaceRule(params: { workspaceId: string; ruleId: string }): Promise<WorkspaceRule>;
declare function updateWorkspaceRule(params: { workspaceId: string; ruleId: string }, body: UpdateRuleBody): Promise<WorkspaceRule>;
```

rsrc infers types from these:

```typescript
const useWorkspaceRule = defineResource({
  key: ({ workspaceId, ruleId }) => `/workspaces/${workspaceId}/rules/${ruleId}`,
  get: getWorkspaceRule,         // rsrc infers TParams and TData
  actions: {
    update: {
      fn: updateWorkspaceRule,   // rsrc infers TBody and TResponse
      invalidates: [useWorkspaceRules],
    },
  },
});

// TypeScript knows:
// params: { workspaceId: string, ruleId: string }
// state.value: WorkspaceRule | null
// actions.update(body): body must be UpdateRuleBody
```

oax could also generate the `defineResource` call itself as a base config, which consumers extend with invalidation rules and meta. rsrc never imports or depends on oax.

---

## Migration Path from rsrc v1

| rsrc v1 | rsrc v2 |
|---------|---------|
| `<Cache>` provider | `<CacheProvider cache={createCache()}>` |
| `<Resource url={...} actions={...}>` | `defineResource({ key, get, actions })` |
| `<Fetch url={...}>` | `useResource({ key, get })` |
| Render props `{({ state, actions }) => ...}` | Hook return `const { state, actions } = ...` |
| `createFetcher()` | Not needed — fetchers come from outside (oax, fetch, etc.) |
| Flow types | TypeScript |
| String-based `invalidates` | Resource-reference-based `invalidates` |

---

## What rsrc v2 Does NOT Do

- **HTTP.** No fetch, no axios, no ky. Pass your own fetchers.
- **Runtime validation.** No Zod, no schema checks. The fetcher validates.
- **Retries.** The fetcher retries. rsrc just stores the result.
- **Optimistic updates.** Actions re-GET after success. Server is the source of truth.
- **SSR / Hydration.** Promise-based cache. No serialization built in.
- **Request deduplication.** Caching the promise handles same-params dedup. Different-params requests are independent.
- **Toast rendering.** rsrc passes metadata through. The app renders.
