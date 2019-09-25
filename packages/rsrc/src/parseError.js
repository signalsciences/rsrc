/* @flow */

import parseBody from './parseBody'

export default function parseError(response: Response): Promise<Error> {
  return parseBody(response).then(body =>
    Promise.resolve(
      new Error(
        `HTTP ${response.status} ${response.statusText}: ${JSON.stringify(
          body
        )}`
      )
    )
  )
}
