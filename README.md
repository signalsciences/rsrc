![Logo](https://signalsciences.github.io/rsrc/static/rsrc-logo.svg)

![Rsrc](https://signalsciences.github.io/rsrc/static/rsrc-type.svg)

[![ci][ci-badge]][ci]
[![version][version-badge]][npm]
[![license][license-badge]](LICENSE.md)
[![gzip size][gzip-badge]][gzip]

[ci-badge]: https://github.com/signalsciences/rsrc/workflows/CI/badge.svg
[ci]: https://github.com/signalsciences/rsrc/actions
[version-badge]: https://badgen.net/npm/v/rsrc
[npm]: https://npmjs.com/package/rsrc
[gzip-badge]: http://badgen.net/bundlephobia/minzip/rsrc
[gzip]: https://bundlephobia.com/result?p=rsrc
[license-badge]: https://badgen.net/badge/license/MIT/blue

A collection of components designed to simplify fetch state in React.

**[Docs](https://signalsciences.github.io/rsrc)**

## :rotating_light: NOTICE :rotating_light:

Effective **May 17th 2021** the default branch will change from `master` to `main`. Run the following commands to update a local clone:
```
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a
```

## Getting Started

```
yarn add rsrc
```

## Usage

```jsx
import React from "react";
import { Resource } from "rsrc";

export default (props) => {
  const { id } = props;
  const url = `/todos/${id}`;

  return (
    <Resource
      url={url}
      maxAge={60}
      actions={{
        remove: () => ({
          options: {
            method: "DELETE",
          },
          invalidates: ["/todos"],
        }),
      }}
    >
      {({ state, actions }) => {
        if (!state.fulfilled) return null;

        const todo = state.value;

        const handleClick = () => {
          actions
            .remove()
            .then((value) => {
              /* */
            })
            .catch((error) => {
              /* */
            });
        };

        return (
          <div>
            <h1>{todo.name}</h1>
            <p>{todo.description}</p>
            <button onClick={handleClick}>×</button>
          </div>
        );
      }}
    </Resource>
  );
};
```

### Related

- [Redux](https://github.com/reduxjs/redux)
- [React Refetch](https://github.com/heroku/react-refetch)
