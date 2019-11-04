/* @flow */

import * as React from "react";
import { Styled, useColorMode } from "theme-ui";
import { Box } from "rebass";

const ColorModeToggle = () => {
  const [colorMode, setColorMode] = useColorMode();

  const toggleMode = () => {
    const modes = ["dark", "light"];
    const currentIndex = modes.indexOf(colorMode);
    let i = currentIndex + 1;
    if (currentIndex === modes.length - 1) {
      i = 0;
    }
    setColorMode(modes[i]);
  };

  return (
    <Styled.div
      as={Box}
      sx={{ variant: "buttons.circle" }}
      onClick={toggleMode}
    >
      <svg viewBox="0 0 32 32" width={16} height={16} fill="currentcolor">
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="currentcolor"
          strokeWidth="4"
        />
        <path
          d={`
            M 16 0
            A 16 16 0 0 0 16 32
            z
          `}
        />
      </svg>
    </Styled.div>
  );
};

export default ColorModeToggle;
