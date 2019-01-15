/* @flow */

export default function checkStatus (response: Response): Promise<any> {
  // if (!response.ok) {
  //   return Promise.reject(new Error(response.statusText))
  // }
  return Promise.resolve(response)
}
