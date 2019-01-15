/* @flow */

const rehypePrism = require('@mapbox/rehype-prism')

const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    hastPlugins: [rehypePrism],
  },
})

module.exports = withMDX({
  pageExtensions: ['js', 'md'],
  webpack: (config) => {
    // config.module.rules.push(
    //   {
    //     test: /\.md$/,
    //     use: 'raw-loader',
    //   }
    // )
    config.module.rules.push(
      {
        test: /\.js/,
        use: 'babel-loader',
      }
    )
    return config
  },
})
