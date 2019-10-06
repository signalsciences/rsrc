/* @flow */

/*
 * Theme Key        CSS Properties
 * ---------        --------------
 * borders          border, border-top, border-right, border-bottom, border-left
 * borderWidths     border-width
 * borderStyles     border-style
 * colors           color, background-color, border-color
 * fonts            font-family
 * fontSizes        font-size
 * fontWeights      font-weight
 * letterSpacings   letter-spacing
 * lineHeights      line-height
 * radii            border-radius
 * sizes            width, height, min-width, max-width, min-height, max-height
 * shadows          box-shadow, text-shadow
 * space            margin, margin-top, margin-right, margin-bottom, margin-left,
 *                  padding, padding-top, padding-right, padding-bottom,
 *                  padding-left, grid-gap, grid-column-gap, grid-row-gap
 * transitions      transition
 * zIndices         z-index
 */

import colors from "./colors";
import styles from "./styles";

export default {
  ...colors,
  ...styles,
  borders: {},
  borderWidths: {},
  borderStyles: {},
  fonts: {
    body: "system-ui, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace"
  },
  fontSizes: [12, 14, 18, 24, 32, 40, 80],
  fontWeights: {
    light: 200,
    body: 400,
    heading: 700,
    bold: 900
  },
  letterSpacings: {},
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  radii: {
    default: 0,
    circle: 99999
  },
  sizes: {},
  shadows: {},
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  transitions: {},
  zIndices: {}
};
