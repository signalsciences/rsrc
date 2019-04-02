const rehypePrism = require('@mapbox/rehype-prism')

const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    hastPlugins: [rehypePrism],
  },
})

module.exports = withMDX({
  pageExtensions: ['js', 'md'],
  assetPrefix: process.env.NODE_ENV === 'production' ? '/rsrc' : '',
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.js/,
        use: [
          options.defaultLoaders.babel
        ]
      }
    )
    return config
  }
})
