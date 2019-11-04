/* @flow */

import * as React from "react";
import { Flex, Box } from "rebass";
import { Styled } from "theme-ui";
import Container from "./Container";
import Link from "./Link";
import SigSciLogo from "./SigSciLogo";

const Footer = () => {
  return (
    <Container as="footer">
      <Flex alignItems="center" justifyContent="space-between" mt={4} py={4}>
        <Box textAlign="left">
          <Styled.div as={Box} sx={{ color: "foreground-muted", fontSize: 0 }}>
            {`© ${new Date().getFullYear()} Signal Sciences`}
          </Styled.div>
        </Box>
        <Box textAlign="right">
          <Link href="https://www.signalsciences.com">
            <SigSciLogo width={120} />
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default Footer;
