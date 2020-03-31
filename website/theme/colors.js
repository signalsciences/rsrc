/* @flow */

const teal = "rgb(0,174,233)";
const magenta = "rgb(243,25,120)";
const violet = "rgb(145,128,255)";
const indigo = "rgb(77,46,229)";

export default {
  initialColorModeName: "dark",
  colors: {
    foreground: "rgb(255,255,255)",
    background: indigo,
    "foreground-muted": "rgba(255,255,255,0.40)",
    // "background-muted": "rgba(39,43,51,0.64)",
    "background-muted": "rgba(0,0,0,0.5)",
    darken: "rgba(0,0,0,0.3)",
    primary: "rgb(255,255,255)",

    secondary: magenta,
    tertiary: violet,
    accent: teal,

    modes: {
      light: {
        foreground: "rgb(39,43,51)",
        background: "rgb(255,255,255)",
        "foreground-muted": "rgb(39,43,51,0.40)",
        "background-muted": "rgb(39,43,51,0.04)",
        darken: "rgba(0,0,0,0.05)",
        primary: indigo,

        secondary: magenta,
        tertiary: violet,
        accent: teal,
      },
    },
  },
};
