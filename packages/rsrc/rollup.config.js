/* @flow */
const config = require('rollup-config-signalsciences')
const pkg = require('./package.json')

module.exports = {
  ...config,
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
  ],
}
