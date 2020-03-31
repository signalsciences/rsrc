/* @flow */
/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { Global } from "@emotion/core";
import { ThemeProvider, Styled } from "theme-ui";
import Prism from "@theme-ui/prism";
import { Flex, Box, Image } from "rebass";

import Link from "./Link";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import theme from "../theme";

type Props = {
  children: React.Node,
};

const withLink = (Tag) => (props: Props & { id?: string }) => {
  if (!props.id) return <Tag {...props} />;
  const { children } = props;
  return (
    <Tag {...props}>
      <a href={`#${props.id}`}>{children}</a>
    </Tag>
  );
};

const components = {
  pre: ({ children }: Props) => <>{children}</>,
  code: Prism,
  inlineCode: ({ children }: Props) => <Styled.code>{children}</Styled.code>,
  a: Link,
  img: Image,
  h2: withLink("h2"),
  h3: withLink("h3"),
};

const Layout = ({ children }: Props) => (
  <ThemeProvider theme={theme} components={components}>
    <Global
      styles={({ colors }) => ({
        body: {
          margin: 0,
          padding: 0,
          color: colors.foreground,
          backgroundColor: colors.background,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      })}
    />
    <Styled.root>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Box flex={1}>
          <Header />
        </Box>
        <Box flex={999} flexGrow={999}>
          <Main>{children}</Main>
        </Box>
        <Box flex={1}>
          <Footer />
        </Box>
      </Flex>
    </Styled.root>
  </ThemeProvider>
);

export default Layout;
