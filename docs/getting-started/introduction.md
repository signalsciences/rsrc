# Introduction

There are a number of great solutions for mananging async fetch state in the
React ecosystem but many of these often require a non-trivial amount of
boilerplate or framework knowledge to implement and maintain.

This project attempts to identify and abstract generic fetch state utilities
into composable components that are as flexible and expressive as the underlying
technologies they expose.

For more on the backstory, please check out the
[announcement](https://building.signalsciences.com/introducing-rsrc) on the
[Signal Sciences blog](https://building.signalsciences.com/).

## Motivation

- reduce dependence on common boilerplate for managing fetch state
- encourage a declarative approach to resource operations
- facilitate the collocation of resource descriptors with the components that
  depend on them
- simplify cache management and invalidation

## What does this do?

|              |                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cache**    | Cache is a context provider that exposes a simple [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)-like interface. This should be mounted near the top of your application tree similar to other context providers.                                                                                                 |
| **Fetch**    | Fetch is a component that offers a declarative approach to the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) api. Its main job is to translate [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) state into consumable props and expose to read, invalidate, and refresh fetch states. |
| **Resource** | Resource glues together the above functionality with a more expressive interface. If Fetch represents an individual request state, a Resource can be thought of as a more generic entity description that defines and exposes additional or related actions for a given endpoint.                                                                              |

## What doesn't this do?

Server-side rendering (SSR), and cache initialization from serialized state are
not supported out of the box. This is because rsrc leverages raw promises rather
than serialized objects to persist state internally.

That said, the cache component accepts any map-like interface, so it should be
possible to serialize resolved states, and then rewrap them in promises before
passing along to the cache provider.

## References & Credits

Related projects, inspiration, and references:

- [heroku/react-refetch](https://github.com/heroku/react-refetch)
