# rsrc

__rsrc__ is a collection of components designed to help manage async fetch
operations in React.


## What problem are we solving?

There are a number of great solutions for mananging async fetch state in the
React ecosystem but many of these patterns require a non-trivial amount of
boilerplate or framework knowledge to implement and maintain.

This project attempts to identify and abstract generic fetch state utilities into
composable components that are simple enough to reason about while remaining as
flexible and expressive as the underlying technologies they expose.


### Motivation

- reduce dependence on common boilerplate for managing fetch state
- encourage a declarative approach to resource operations 
- facilitate the collocation of resource descriptors with the components that
   depend on them
- simplify cache management and invalidation


## What does this do?

This library exports 3 components to manage and simplify async fetch operations
in React. 

1. __Cache__. Cache is a context provider that exposes a simple
   [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)-like
   interface. This should be mounted near the top of your application tree
   similar to other context providers.
2. __Fetch__. Fetch is a component that offers a declarative approach to the
   [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) api. Its
   main jobs are to translate
   [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
   state into consumable props, provide a simple mechanism for caching and
   expiring promises, as well as providing utilities to read, invalidate, and
   refresh fetch states.
3. __Resource__. Resource glues together the functionality above with a more
   expressive interface. If Fetch represents an individual request state, a
   Resource can be thought of as a generic entity description that defines and
   exposes additional or related actions for a given endpoint.


## What doesn't this do?

Currently server side rendering (SSR) and cache initialization from serialized
state are not supported out of the box. rsrc leverages the unique
characteristics of promises to manage state change internally. Promises,
however, are not serializable which makes them less straight-forward to persist
across instances.

That said, and since a map can be passed to the Cache component directly, it should be
possible to serialize resolved states, and then rewrap them in new promises.

```
[key: string]: {
  lastResolved: number,
  value: Promise<PromiseState>
}
```

For now we've chosen to optimize for ergonomics and simplicity over
serialization and persistance.


## References & Credits

Related projects, inspiration, and references:

- [rsms/js-lru](https://github.com/rsms/js-lru)
- [heroku/react-refetch](https://github.com/heroku/react-refetch)
