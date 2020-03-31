/* @flow */

import * as React from "react";
import { useRouter } from "next/router";
import { Flex, Box } from "rebass";
import Container from "./Container";
import Sidebar from "./Sidebar";
import Pager from "./Pager";
import Docs from "../pages/docs/index.md";

type Props = {
  children: React.Node,
};

const Main = ({ children }: Props) => {
  const router = useRouter();
  const isDocs = /\/docs\//.test(router.pathname);

  return (
    <Container as="main">
      {isDocs ? (
        <Flex>
          <Box flex={[0, 1]} mt={84}>
            <Docs
              pathname={router.pathname}
              components={{
                wrapper: Sidebar,
              }}
            />
          </Box>
          <Box flex={[1, 2, 3]} mt={84}>
            {children}
            {isDocs && (
              <Box mt={4}>
                <Docs
                  pathname={router.pathname}
                  components={{
                    wrapper: Pager,
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
