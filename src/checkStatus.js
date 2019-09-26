/* @flow */

export default function checkStatus(response: Response): Promise<Response> {
  if (!response.ok) {
    return Promise.reject(response)
  }
  return Promise.resolve(response)
}
