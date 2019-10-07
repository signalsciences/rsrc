/* @flow */

const black = "#000";
const charcoal = "#242424";
const gray = "#ccc";
const smoke = "#eee";
const white = "#fff";
const violet = "#583af0";

// const red = 'rgb(255,  59,  48)'
const orange = "rgb(240, 84, 36)";
// const yellow = 'rgb(255, 204,   0)'
// const green = 'rgb( 52, 199,  89)'
const teal = "rgb(100, 210, 255)";
const blue = "rgb(  0, 122, 255)";
const pink = "rgb(255,  45,  85)";

export default {
  initialColorModeName: "light",
  colors: {
    text: charcoal,
    body: charcoal,
    heading: black,
    background: white,
    primary: violet,
    muted: gray,
    secondary: pink,
    accent: blue,
    "text-muted": "rgba(0,0,0,.35)",
    "background-muted": "rgba(200,200,200,.2)",
    modes: {
      dark: {
        text: gray,
        body: gray,
        heading: white,
        background: black,
        primary: violet,
        "text-muted": "rgba(255,255,255,.8)",
        "background-muted": "rgba(255,255,255,.05)"
      },
      violet: {
        text: smoke,
        body: smoke,
        heading: white,
        background: violet,
        primary: white,
        secondary: orange,
        accent: teal,
        muted: gray,
        "text-muted": "rgba(255,255,255,.8)",
        "background-muted": "rgba(0,0,0,.6)"
      }
    }
  }
};
