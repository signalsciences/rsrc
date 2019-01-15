/* @flow */

import _checkStatus from './checkStatus'
import _parseBody from './parseBody'
import _parseError from './parseError'

import type { FetchConfig, Fetcher } from './types'

export default function makeFetcher (config: ?FetchConfig = {}): Fetcher {
  const mergedConfig = {
    fetchFunction: fetch,
    checkStatus: _checkStatus,
    parseBody: _parseBody,
    parseError: _parseError,
    ...config,
  }

  const {
    fetchFunction,
    checkStatus,
    parseBody,
    parseError,
  } = mergedConfig

  return (url, options) => fetchFunction(url, options)
    .then(response => (
      checkStatus(response)
    ))
    .then(response => (
      parseBody(response)
        .then(body => ({
          response,
          body,
        }))
    ))
    .then(({ response, body }) => {
      if (!response.ok) {
        let error = parseError(response, body)
        if (error instanceof Error === false) {
          error = new Error('Rsrc: #parseError should return an error instance')
        }
        return Promise.reject(error)
      }
      return Promise.resolve({
        request: new Request(url, options),
        response,

        pending: false,
        fulfilled: true,
        rejected: false,

        value: body,
        reason: null,
      })
    })
    .catch(error => Promise.resolve({
      request: new Request(url, options),
      response: null,

      pending: false,
      fulfilled: false,
      rejected: true,

      value: null,
      reason: error,
    }))
}
