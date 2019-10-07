/* @flow */
/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import getConfig from "next/config";
import NextLink from "next/link";
import { Link as RebassLink } from "rebass";

// https://github.com/zeit/next.js/issues/3335#issuecomment-489354854
/**
 * Higher order component, which is based on 'next/link'
 * When app is deployed on github pages repository which is not the main one
 * e.g https://username.github.io/repository/
 * standard 'next/link' is not wokring properly, it doesn't add the 'reporsitory'
 * to url so instead of expected 'https://username.github.io/repository/about',
 * it would be 'https://username.github.io/about/
 * This HOC solves the problem, by adding the prefix (which is defined in next.config.js)
 * to 'as' property
 */

const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

type Props = {
  children: React.Node,
  href: string
};

const Link = ({ children, href, ...rest }: Props) => {
  // External links
  if (/^https?:/.test(href)) {
    return (
      <RebassLink href={href} {...rest}>
        {children}
      </RebassLink>
    );
  }

  // Internal links
  return (
    <NextLink href={href} as={`${BASE_URL}${href}`}>
      <RebassLink {...rest}>{children}</RebassLink>
    </NextLink>
  );
};

export default Link;
