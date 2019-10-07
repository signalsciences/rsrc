/* @flow */

import * as React from "react";
import { useRouter } from "next/router";
import { Flex, Box } from "rebass";

import Container from "./Container";
import Sidebar from "./Sidebar";
import Pager from "./Pager";

import Docs from "../pages/docs/index.md";
import Theme from "../pages/theme/index.md";

type Props = {
  children: React.Node
};

const Content = ({ children }: Props) => (
  <Box
    sx={{
      p: {
        maxWidth: 720
      },
      "& h1:first-of-type ": {
        mt: 5
      }
    }}
  >
    {children}
  </Box>
);

const Main = ({ children }: Props) => {
  const router = useRouter();
  const isDocs = /\/docs\//.test(router.pathname);
  const isTheme = /\/theme\//.test(router.pathname);

  return (
    <Container as="main">
      {isDocs || isTheme ? (
        <Flex>
          <Box flex={[0, 1]}>
            {isDocs ? (
              <Docs
                pathname={router.pathname}
                components={{
                  wrapper: Sidebar
                }}
              />
            ) : (
              <Theme
                pathname={router.pathname}
                components={{
                  wrapper: Sidebar
                }}
              />
            )}
          </Box>
          <Box flex={[1, 2, 3]}>
            <Content>{children}</Content>
            {isDocs && (
              <Box mt={4}>
                <Docs
                  pathname={router.pathname}
                  components={{
                    wrapper: Pager
                  }}
                />
              </Box>
            )}
          </Box>
        </Flex>
      ) : (
        children
      )}
    </Container>
  );
};

export default Main;
