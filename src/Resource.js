/* @flow */

import * as React from "react";

import Cache from "./Cache";
import Fetch from "./Fetch";

import createFetcher from "./createFetcher";

import type { ResourceProps } from "./types";

function mapFetchersToActions(props: ResourceProps, invalidate: Function) {
  const mappedActions = {};

  const { actions, fetcher } = props;

  Object.keys(actions).forEach(key => {
    const action = key ? actions[key] : null;

    if (action && typeof action === "function") {
      mappedActions[key] = (...args) => {
        const actionProps = action(...args);

        const url =
          actionProps.url && typeof actionProps.url === "string"
            ? actionProps.url
            : props.url;
        const options = actionProps.options || props.options;
        const invalidates = actionProps.invalidates || [];

        const promise = fetcher(url, options)
          .then(fulfilledState => {
            if (invalidates && invalidate.length > 0) {
              invalidate(invalidates);
            }
            return fulfilledState;
          })
          .catch(rejectedState => {
            throw rejectedState;
          });

        return promise;
      };
    }
  });

  return mappedActions;
}

const Resource = (props: ResourceProps): React.Node => {
  const {
    url,
    options,
    maxAge,

    children,
    fetcher
  } = props;

  const defaultCache = new Map<*, *>();

  return (
    <Cache.Consumer>
      {context => {
        // If no Cache provider is found, the default `undefined` will be returned
        // Warn user on dev, this may be desired in some cases
        if (context === undefined) {
          /* eslint-disable no-console */
          console.warn(
            "rsrc : <Resource /> - Persistent cache provider not found. Falling back to instance cache."
          );
          /* eslint-enable no-console */
        }

        const cache = context || defaultCache;

        const invalidate = matchers => {
          const cacheKeys = [...cache.keys()];
          const keysToInvalidate = [];
          matchers.forEach(matcher => {
            keysToInvalidate.push(
              ...cacheKeys.filter(cacheKey => !!cacheKey.match(matcher))
            );
          });
          keysToInvalidate.forEach(keyToInvalidate => {
            cache.delete(keyToInvalidate);
          });
        };

        const actions = mapFetchersToActions(props, invalidate);

        return (
          <Fetch
            url={url}
            options={options}
            maxAge={maxAge}
            fetcher={fetcher}
            cache={cache}
          >
            {state => {
              const childProps = {
                meta: props,
                actions,
                state
              };

              return (
                <>
                  {typeof children === "function"
                    ? children(childProps)
                    : children}
                </>
              );
            }}
          </Fetch>
        );
      }}
    </Cache.Consumer>
  );
};

Resource.defaultProps = {
  url: "",
  options: {},
  maxAge: 60, // 1 minute
  actions: {},
  fetcher: createFetcher()
};

export default Resource;
