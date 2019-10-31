/* @flow */

const heading = {
  color: "foreground",
  fontFamily: "heading",
  fontWeight: "heading",
  a: {
    color: "foreground",
    textDecoration: "none"
  },
  "a:hover:before": {
    borderColor: "foreground-muted"
  },
  "a:before": {
    m: 0,
    pb: 3,
    width: "32px",
    content: '""',
    display: "block",
    borderWidth: 0,
    borderTopWidth: 4,
    borderStyle: "solid",
    borderColor: "primary"
  }
};

export default {
  styles: {
    root: {
      backgroundColor: "background",
      color: "foreground",
      fontFamily: "body",
      fontWeight: "body",
      fontSize: 3,
      lineHeight: 3,
      letterSpacing: 3
    },
    code: {
      fontFamily: "monospace",
      backgroundColor: "background-muted",
      fontSize: 1,
      lineHeight: 1
    },
    pre: {
      p: 24,
      my: 40,
      color: "foreground",
      overflowX: "auto",
      ".comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url": {
        color: "foreground"
      },
      ".property, .tag, .boolean, .number, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable": {
        color: "tertiary"
      },
      ".atrule, .attr-value, .keyword": {
        color: "accent"
      },
      ".selector, .attr-name, .string, .char, .builtin, .inserted": {
        color: "secondary"
      },
      // overrides
      ".comment": {
        fontStyle: "italic",
        color: "foreground-muted"
      },
      ".string, .number": {
        color: "secondary"
      }
    },
    h1: {
      ...heading,
      mt: 0,
      fontWeight: "bold",
      fontSize: [6, 6, 7],
      letterSpacing: [6, 6, 7],
      lineHeight: [6, 6, 7]
    },
    h2: {
      ...heading,
      mt: 88,
      fontSize: [4, 4, 5],
      letterSpacing: [5, 5, 6],
      lineHeight: [5, 5, 6]
    },
    h3: {
      ...heading,
      mt: 24,
      fontSize: 4,
      letterSpacing: 4,
      lineHeight: 4
    },
    h4: {
      ...heading,
      mt: 24,
      fontSize: 3,
      letterSpacing: 3,
      lineHeight: 3
    },
    h5: {
      ...heading,
      mt: 24,
      fontSize: 2,
      letterSpacing: 2,
      lineHeight: 2
    },
    h6: {
      ...heading,
      mt: 24,
      fontSize: 1,
      letterSpacing: 1,
      lineHeight: 1
    },
    p: {
      maxWidth: "720px",
      my: 24
    },
    ul: {
      maxWidth: "640px",
      my: 4,
      px: 4
    },
    ol: {
      maxWidth: "640px",
      my: 4,
      px: 4
    },
    li: {
      my: 1,
      px: 0,
      "& ul": {
        my: 0
      },
      "& ol": {
        my: 0
      }
    },
    blockquote: {
      borderColor: "darken",
      backgroundColor: "background-muted",
      borderWidth: 0,
      borderLeftWidth: 8,
      borderStyle: "solid",
      px: 4,
      py: 1,
      mx: 0,
      my: 4,
      color: "foreground",
      fontStyle: "italic"
    },
    table: {
      my: 4,
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: "0",
      emptyCells: "hide",
      "& th": {
        maxWidth: "640px",
        minWidth: "120px",
        p: 3,
        textAlign: "left",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "foreground-muted"
      },
      "& td": {
        maxWidth: "640px",
        minWidth: "120px",
        p: 3,
        textAlign: "left",
        verticalAlign: "top",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "foreground-muted"
      },
      "& th:empty": {
        display: "none"
      },
      "& tr:last-child td": {
        border: 0
      },
      "& th:first-of-type": {
        pl: 0
      },
      "& td:first-of-type": {
        pl: 0
      },
      "& th:last-of-type": {
        pr: 0
      },
      "& td:last-of-type": {
        pr: 0
      }
    },
    a: {
      cursor: "pointer",
      color: "foreground",
      textDecoration: "underline",
      transition: "all 0.2s ease-out",
      ":hover": {
        color: "foreground-muted"
      }
    }
  },

  links: {
    nav: {
      cursor: "pointer",
      color: "foreground",
      textDecoration: "none",
      transition: "all 0.2s ease-out",
      ":hover": {
        color: "foreground-muted"
      }
    }
  },

  buttons: {
    primary: {
      py: 3,
      px: 4,
      textDecoration: "none",
      cursor: "pointer",
      fontSize: 3,
      lineHeight: 3,
      letterSpacing: 3,
      fontWeight: "body",
      outline: "none",
      borderRadius: "default",
      borderWidth: 1,
      borderStyle: "solid",
      color: "background",
      borderColor: "primary",
      bg: "primary",
      ":hover": {
        opacity: 0.8
      }
    },
    outline: {
      variant: "buttons.primary",
      color: "primary",
      borderColor: "primary",
      bg: "background",
      ":hover": {
        opacity: 0.8
      }
    },
    floating: {
      variant: "buttons.primary",
      px: 0,
      fontSize: 3,
      color: "heading",
      borderColor: "transparent",
      bg: "transparent",
      fontWeight: "bold",
      ":hover": {
        opacity: 0.8
      }
    },
    circle: {
      variant: "buttons.outline",
      color: "foreground",
      borderColor: "foreground",
      bg: "background",
      borderRadius: "circle",
      lineHeight: "0px",
      p: 1
    },
    square: {
      variant: "buttons.circle",
      borderRadius: "default",
      color: "background",
      borderColor: "foreground",
      bg: "foreground"
    }
  }
};
