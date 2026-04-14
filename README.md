# rsrc

React hooks for managing async resource state with type-safe cache invalidation.

## Install

```bash
pnpm add rsrc
```

## Quick Start

```typescript
import { CacheProvider, createCache, defineResource } from 'rsrc';

// 1. Create a cache and wrap your app
const cache = createCache();

function App() {
  return (
    <CacheProvider cache={cache}>
      <MyComponent />
    </CacheProvider>
  );
}

// 2. Define a resource
const useUser = defineResource({
  key: ({ userId }) => `/users/${userId}`,
  get: ({ userId }) => fetch(`/api/users/${userId}`).then(r => r.json()),
});

// 3. Use it
function MyComponent() {
  const { state } = useUser({ userId: '123' });

  if (state.pending) return <div>Loading...</div>;
  if (state.rejected) return <div>Error: {state.reason?.message}</div>;
  return <div>{state.value.name}</div>;
}
```

See `docs/superpowers/specs/2026-04-14-rsrc-v2-design.md` for the full design spec.
