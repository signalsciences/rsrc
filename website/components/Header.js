/* @flow */

import * as React from "react";
import { Flex, Box } from "rebass";
import { Styled } from "theme-ui";
import Container from "./Container";
import RsrcLogo from "./RsrcLogo";
import Link from "./Link";
import ColorModeToggle from "./ColorModeToggle";

const Header = () => {
  return (
    <Container as="header">
      <Flex
        as="nav"
        pt="1em"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Styled.div
            as={Link}
            sx={{
              variant: "links.nav",
            }}
            href="/"
          >
            <RsrcLogo width={80} />
          </Styled.div>
        </Box>
        <Box>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box>
              <Styled.div
                as={Link}
                sx={{
                  variant: "links.nav",
                }}
                href="/docs/getting-started/introduction"
              >
                Docs
              </Styled.div>
            </Box>
            <Box ml="3em">
              <Styled.div
                as={Link}
                sx={{
                  variant: "links.nav",
                }}
                href="https://github.com/signalsciences/rsrc"
              >
                Github
              </Styled.div>
            </Box>
            <Box ml="3em">
              <ColorModeToggle />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;
