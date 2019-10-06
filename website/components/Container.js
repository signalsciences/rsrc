/* @flow */
/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { Box } from "rebass";

type Props = {
  children: React.Node
};

const Container = ({ children, ...rest }: Props) => (
  <Box mx="auto" p="1em" maxWidth="72em" {...rest}>
    {children}
  </Box>
);

export default Container;
