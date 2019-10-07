/* @flow */

import React from "react";
import { Box, Text } from "rebass";

export default () => (
  <Box pt={5} textAlign="center">
    <Text as="h1" fontSize={6} fontWeight={900}>
      404
    </Text>
    <Text as="p" fontSize={4} fontWeight={200} color="muted">
      Not found
    </Text>
  </Box>
);
