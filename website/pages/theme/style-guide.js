/* @flow */

import * as React from "react";
import { TypeScale, TypeStyle, ColorPalette } from "@theme-ui/style-guide";

export default () => (
  <>
    <ColorPalette />
    <TypeScale />
    <TypeStyle fontFamily="heading" fontWeight="heading" lineHeight="heading" />
    <TypeStyle fontFamily="body" fontWeight="body" lineHeight="body" />
  </>
);
