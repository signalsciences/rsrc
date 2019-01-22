/* @flow */

// TODO: Swap url-template for path-to-regexp?
// These modules do not have exports, use require instead
const queryString = require('query-string')
const urlTemplate = require('url-template')

export default function buildUrl (path: string = '', params?: Object, query?: Object): string {
  const template = urlTemplate.parse(path)
  const endpoint = template.expand(params || {})
  const search = typeof query === 'object' && Object.keys(query).length > 0
    ? `?${queryString.stringify(query)}`
    : ''
  const url = `${endpoint}${search}`
  return url
}
