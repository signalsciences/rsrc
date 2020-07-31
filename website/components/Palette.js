/* @flow */

import * as React from "react";
import { Box } from "rebass";

const Palette = () => (
  <Box>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
      const name = `base0${i.toString(16).toUpperCase()}`;
      return (
        <Box key={name} p={3} bg={`${name}`}>
          <code>{name}</code>
        </Box>
      );
    })}
  </Box>
);

export default Palette;
