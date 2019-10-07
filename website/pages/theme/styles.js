/* @flow */

import * as React from "react";
import { Styled } from "theme-ui";
import { Box } from "rebass";
import { TypeScale, TypeStyle, ColorPalette } from "@theme-ui/style-guide";

export default () => (
  <>
    <Styled.h1>Styles</Styled.h1>
    <Box my={5}>
      <ColorPalette />
    </Box>
    <Box my={5}>
      <TypeScale />
    </Box>
    <Box my={5}>
      <TypeStyle
        fontFamily="heading"
        fontWeight="heading"
        lineHeight="heading"
      />
    </Box>
    <Box my={5}>
      <TypeStyle fontFamily="body" fontWeight="body" lineHeight="body" />
    </Box>
  </>
);
