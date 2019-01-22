const config = require('rollup-config-signalsciences')
const bundleSize = require('rollup-plugin-bundle-size')

export default {
  ...config,
  plugins: [
    ...config.plugins,
    bundleSize()
  ]
}
