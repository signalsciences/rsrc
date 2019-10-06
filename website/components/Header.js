/* @flow */

import * as React from "react";
import { Flex, Box } from "rebass";

import Container from "./Container";
import RsrcLogo from "./RsrcLogo";
import Link from "./Link";
import ColorModeToggle from "./ColorModeToggle";

const Header = () => {
  return (
    <Container as="header">
      <Flex
        py="1em"
        as="nav"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Link variant="links.nav" href="/">
            <RsrcLogo width={80} />
          </Link>
        </Box>
        <Box>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box>
              <Link
                variant="links.nav"
                href="/docs/getting-started/introduction"
              >
                Docs
              </Link>
            </Box>
            <Box ml="3em">
              <Link
                variant="links.nav"
                href="https://github.com/signalsciences/rsrc"
              >
                Github
              </Link>
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
