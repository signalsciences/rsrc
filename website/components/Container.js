/* @flow */

import * as React from "react";
import { Box } from "rebass";

type Props = {
  children: React.Node,
  as: string
};

const Container = ({ children, as = "div" }: Props) => (
  <Box mx="auto" p="16px" maxWidth="1152px" as={as}>
    {children}
  </Box>
);

export default Container;
