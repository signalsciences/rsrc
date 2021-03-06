const remarkSlug = require("remark-slug");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkSlug],
  },
});

const isProd = process.env.NODE_ENV === "production";
const BASE_URL = isProd ? "/rsrc" : "";
const GA_TRACKING_ID = "UA-46986803-7";

module.exports = withMDX({
  trailingSlash: isProd,
  pageExtensions: ["js", "md"],
  assetPrefix: BASE_URL,
  publicRuntimeConfig: {
    BASE_URL,
    GA_TRACKING_ID,
  },
  webpack: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      symlinks: false,
    },
  }),
});
