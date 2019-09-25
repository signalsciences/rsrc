/* @flow */

export default function parseBody(response: Response): Promise<any> {
  const contentType = response.headers.get('Content-Type')

  // Response methods return promises. To simulate for empty responses,
  // we wrap the return in a Promise.resolve()
  if (!contentType || response.status === 204) {
    return Promise.resolve(null)
  }

  const mimeType = contentType.split(';')[0].trim()

  if (
    mimeType === 'application/json' ||
    mimeType === 'text/json' ||
    /\+json$/.test(mimeType)
  ) {
    return response.json()
  }

  if (
    mimeType === 'text/plain' ||
    mimeType === 'text/html' ||
    mimeType === 'application/xml' ||
    mimeType === 'text/xml' ||
    /\+xml$/.test(mimeType)
  ) {
    return response.text()
  }

  return response.arrayBuffer()
}
