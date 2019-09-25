/* @flow */

import _checkStatus from './checkStatus'
import _parseBody from './parseBody'
import _parseError from './parseError'

import type { FetcherConfig, Fetcher } from './types'

export default function createFetcher(overrides: FetcherConfig = {}): Fetcher {
  const defaultConfig = {
    fetchFunction: fetch,
    checkStatus: _checkStatus,
    parseBody: _parseBody,
    parseError: _parseError
  }

  const config = {
    ...defaultConfig,
    ...overrides
  }

  const { fetchFunction } = config

  return (url, options) =>
    fetchFunction(url, options)
      // First we check the status of the response and either resolve or reject it
      // based on the function's criteria. The default is to only resolve when
      // `response.ok` is true (status in the range 200-299).
      .then(response => {
        const { checkStatus } = config
        return checkStatus(response)
      })
      .then(response => {
        const { parseBody } = config
        return parseBody(response).then(value =>
          Promise.resolve({
            pending: false,
            fulfilled: true,
            rejected: false,
            value,
            reason: null
          })
        )
      })
      .catch(error => {
        if (error instanceof Error) {
          return Promise.resolve({
            pending: false,
            fulfilled: false,
            rejected: true,
            value: null,
            reason: error
          })
        }

        const { parseError } = config

        return parseError(error).then(reason =>
          Promise.resolve({
            pending: false,
            fulfilled: false,
            rejected: true,
            value: null,
            reason
          })
        )
      })
}
