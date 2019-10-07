// const rehypePrism = require('@mapbox/rehype-prism')
const remarkSlug = require("remark-slug");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkSlug]
    // rehypePlugins: [rehypePrism]
  }
});

const isProd = process.env.NODE_ENV === "production";
const BASE_URL = isProd ? "/rsrc" : "";
const GA_TRACKING_ID = "UA-46986803-7";

module.exports = withMDX({
  exportTrailingSlash: true,
  pageExtensions: ["js", "md"],
  assetPrefix: BASE_URL,
  publicRuntimeConfig: {
    BASE_URL,
    GA_TRACKING_ID
  }
});
