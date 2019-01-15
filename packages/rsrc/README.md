# rsrc

>__NOTICE:__ _This project is under active development. APIs will change._

__rsrc__ is a collection of components designed to help manage async fetch
operations in react.

- Cache
- Fetch
- Resource


## What problem are we trying to solve?

The React ecosystem moves fast and while there are a number of great solutions
for mananging async state, these patterns often require a non-trivial amount of
boilerplate and/or understanding to implement correctly. This can lead to both
maintenance and developer onboarding challenges.

The goal of this project is to identify and abstract generic use cases into
composable components that are simple enough to reason about while remaining as
flexible as the underlying technologies on which they rely.


## Motivation

1. reduce dependence on common boilerplate for managing fetch state
2. encourage a declarative approach to resource operations 
3. facilitate the collocation of resource desciptors with the components that
   depend on them
4. simplify cache management & invalidation
