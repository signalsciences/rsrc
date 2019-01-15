/* @flow */

import * as React from 'react'

import Cache from 'rsrc-cache'
import Fetch from 'rsrc-fetch'

import isPlainObject from './isPlainObject'
import buildUrl from './buildUrl'

import type { ResourceProps } from './types'

const defaultCache = new Map()

class Resource extends React.Component<ResourceProps> {
  static displayName = 'Resource'

  static defaultProps = {
    path: '',
    params: {},
    query: {},
    options: {},
    maxAge: 60 * 60, // 1 hour
    actions: {},
  }

  render () {
    const {
      children,
      actions,
      path,
      params,
      query,

      options,
      maxAge,
      config,
    } = this.props

    const url = buildUrl(path, params, query)

    return (
      <Cache.Consumer>
        {
          (ctx) => {
            // If no Cache provider is found, the default `undefined` will be returned
            // Warn user on dev, this may be desired in some cases
            if (ctx === undefined) {
              /* eslint-disable no-console */
              console.warn('rsrc : <Resource /> - Persistent cache provider not found. Falling back to instance cache.')
              /* eslint-enable no-console */
            }

            const cache = ctx || defaultCache

            return (
              <Fetch
                maxAge={ maxAge }
                cache={ cache }
                url={ url }
                options={ options }
                fetch={ config }
              >
                {
                  (fetchState) => {
                    const invalidate = (invalidates: string | string[]) => {
                      let keys = invalidates

                      if (typeof invalidates === 'string') {
                        keys = [invalidates]
                      }

                      const cacheKeys = cache
                        ? [...cache.keys()]
                        : []

                      if (keys && typeof keys.forEach === 'function') {
                        keys.forEach((template) => {
                          const pathPattern = template.replace(/\//g, '\\/')
                            .replace(/{([^}]*)}/g, '.+?')

                          // /foo/bar/{id}
                          // \/foo\/bar\/{id}
                          // \/foo\/bar\/.+?

                          const matcher = new RegExp(pathPattern)
                          const matches = cacheKeys.filter(key => matcher.test(key.split(/[?#]/)[0]))

                          matches.forEach((match) => {
                            if (cache) { cache.delete(match) }
                          })
                        })
                      }
                    }

                    const mappedActions = {}

                    if (actions && isPlainObject(actions)) {
                      Object.keys(actions).forEach((key) => {
                        const action = key ? actions[key] : null
                        if (action && typeof action === 'function') {
                          mappedActions[key] = (...args) => {
                            const actionProps = action(...args)
                            const merged = {
                              ...this.props,
                              ...actionProps,
                            }
                            const actionUrl = buildUrl(merged.path, merged.params, merged.query)
                            const { invalidates } = merged
                            // $FlowFixMe need to resolve
                            const promise = fetchState.fetch(actionUrl, merged.options)
                              .then((promiseState) => {
                                if (promiseState.rejected) {
                                  throw promiseState
                                }
                                return promiseState
                              })
                            if (invalidates) {
                              // this will only trigger on successful fetches
                              return promise.then((promiseState) => {
                                invalidate(invalidates)
                                return promiseState
                              })
                            }
                            return promise
                          }
                        }
                      })
                    }
                    const childProps = {
                      // ResourceProps
                      meta: this.props,

                      // ResourceMappedActions
                      actions: mappedActions,

                      // FetchState
                      state: fetchState,
                    }

                    return (
                      <React.Fragment>
                        {
                          typeof children === 'function'
                            ? children(childProps)
                            : children
                        }
                      </React.Fragment>
                    )
                  }
                }
              </Fetch>
            )
          }
        }
      </Cache.Consumer>
    )
  }
}

export default Resource
