/* @flow */

import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { GA_TRACKING_ID } = publicRuntimeConfig;

/* eslint-disable react/no-danger */

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="A collection of components designed to simplify fetch state in React"
          />
          <meta property="og:title" content="rsrc · simply fetching" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://signalsciences.github.io/rsrc/"
          />
          <meta
            property="og:description"
            content="A collection of components designed to simplify fetch state in React"
          />
          <meta
            property="og:image"
            content="https://signalsciences.github.io/rsrc/static/rsrc-og.png"
          />
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:image"
            content="https://signalsciences.github.io/rsrc/static/rsrc-og.png"
          />
          <link
            rel="shortcut icon"
            href="https://signalsciences.github.io/rsrc/static/favicon.png"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
            `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
