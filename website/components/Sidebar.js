/* @flow */

import * as React from "react";
import { Box, Button } from "rebass";

const { useState } = React;

type Props = {
  children: React.Node
};

const Nav = ({ children }: Props) => (
  <Box
    mt={6}
    sx={{
      h4: {
        mt: 3,
        mb: 1
      },
      ul: {
        listStyleType: "none",
        px: 0,
        pb: 4,
        mx: 0,
        my: 1
      },
      "li a": {
        variant: "links.nav"
      }
    }}
  >
    {children}
  </Box>
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
        <Nav>{children}</Nav>
      </Box>
      {/* Sidebar as toggled overlay menu */}
      <Box display={["block", "none"]}>
        <Box
          onClick={toggleOpen}
          p={[4, 0]}
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            bg: "background",
            transform: isOpen ? "none" : "translateX(-100%)",
            overflowY: "auto",
            transitionProperty: "transform",
            transitionDuration: ".2s",
            transitionTimingFunction: "ease-out"
          }}
        >
          <Nav>{children}</Nav>
        </Box>
        <Button
          variant="circle"
          onClick={toggleOpen}
          m={3}
          sx={{
            zIndex: 1000,
            position: "fixed",
            bottom: 0,
            left: 0
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
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
