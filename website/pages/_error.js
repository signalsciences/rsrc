/* @flow */

import React from "react";
import { Box, Text } from "rebass";

export default () => (
  <Box pt={5} textAlign="center">
    <Text as="h1" mt={84} fontSize={6} fontWeight={900}>
      404
    </Text>
    <Text as="p" mt={24} fontSize={4} fontWeight={200} color="foreground-muted">
      Not found
    </Text>
  </Box>
);
