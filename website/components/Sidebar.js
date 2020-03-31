/* @flow */

import * as React from "react";
import { Styled } from "theme-ui";
import { Box } from "rebass";

const { useState } = React;

type Props = {
  children: React.Node,
};

const Nav = ({ children }: Props) => (
  <Styled.div
    as={Box}
    sx={{
      "& h4": {
        mt: 3,
        mb: 3,
        fontWeight: 300,
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
      },
      "& ul": {
        listStyleType: "none",
        px: 0,
        pb: 3,
        mx: 0,
        mt: 2,
        mb: 0,
      },
      "& li": {
        my: 2,
      },
      "& li a": {
        variant: "links.nav",
        fontWeight: "body",
      },
    }}
  >
    {children}
  </Styled.div>
);

const Sidebar = ({ children }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <Box variant="sidebar">
      {/* Sidebar as static nav on page */}
      <Box onClick={toggleOpen} display={["none", "block"]}>
        <Nav>
          <Box pt={3} pb={0}>
            {children}
          </Box>
        </Nav>
      </Box>
      {/* Sidebar as toggled overlay menu */}
      <Box display={["block", "none"]}>
        <Styled.div
          as={Box}
          onClick={toggleOpen}
          sx={{
            px: 4,
            py: 84,
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            bg: "background",
            transform: isOpen ? "none" : "translateX(100%)",
            overflowY: "auto",
            transitionProperty: "transform",
            transitionDuration: ".2s",
            transitionTimingFunction: "ease-out",
          }}
        >
          <Nav>{children}</Nav>
        </Styled.div>
        <Styled.div
          as={Box}
          onClick={toggleOpen}
          sx={{
            m: 3,
            variant: "buttons.square",
            zIndex: 1000,
            position: "fixed",
            bottom: 0,
            right: 0,
          }}
        >
          <Box
            as="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            fill="currentcolor"
          >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </Box>
        </Styled.div>
      </Box>
    </Box>
  );
};

export default Sidebar;
