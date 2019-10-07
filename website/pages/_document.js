/* @flow */

import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { BASE_URL, GA_TRACKING_ID } = publicRuntimeConfig;

/* eslint-disable react/no-danger */

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          <link rel="shortcut icon" href={`${BASE_URL}/static/favicon.png`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
