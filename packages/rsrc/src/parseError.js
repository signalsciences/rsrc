/* @flow */

export class FetchError extends Error {
  constructor (status: number, statusText: string, body: any, ...params: any) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }
    this.statusText = statusText
    this.status = status
    this.body = body
  }

  body: any

  statusText: string

  status: number
}

export default function parseError (response: Response, body: any): FetchError {
  const message = '[rsrc-fetch]: Promise rejected.'
  return new FetchError(response.status, response.statusText, body, message)
}
