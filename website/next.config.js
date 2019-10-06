// const rehypePrism = require('@mapbox/rehype-prism')
const remarkSlug = require("remark-slug");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkSlug]
    // rehypePlugins: [rehypePrism]
  }
});

const BASE_URL = process.env.NODE_ENV === "production" ? "/rsrc" : "";
const GA_TRACKING_ID = "UA-46986803-7";

module.exports = withMDX({
  pageExtensions: ["js", "md"],
  assetPrefix: BASE_URL,
  publicRuntimeConfig: {
    BASE_URL,
    GA_TRACKING_ID
  }
});
