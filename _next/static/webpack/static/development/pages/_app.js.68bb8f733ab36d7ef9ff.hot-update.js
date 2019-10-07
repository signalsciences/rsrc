webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./theme/styles.js":
/*!*************************!*\
  !*** ./theme/styles.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "../node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");

var heading = {
  color: "heading",
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
  mt: [5, 6],
  mb: 0,
  pb: [2, 3],
  pt: 0,
  a: {
    color: "heading",
    textDecoration: "none"
  },
  "a:hover": {
    color: "body"
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
/* harmony default export */ __webpack_exports__["default"] = ({
  styles: {
    root: {
      backgroundColor: "background",
      color: "body",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body"
    },
    a: {
      cursor: "pointer",
      color: "body",
      transition: "all .3s ease-out",
      textDecoration: "underline",
      "&:hover": {
        color: "primary"
      }
    },
    code: {
      fontFamily: "monospace",
      backgroundColor: "background-muted",
      fontSize: 1
    },
    pre: {
      p: 4,
      color: "body",
      overflowX: "auto",
      ".comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url": {
        color: "text-muted"
      },
      ".comment": {
        fontStyle: "italic"
      },
      ".property, .tag, .boolean, .number, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable": {
        color: "accent"
      },
      ".atrule, .attr-value, .keyword": {
        color: "primary"
      },
      ".selector, .attr-name, .string, .char, .builtin, .inserted": {
        color: "secondary"
      }
    },
    h1: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, heading, {
      fontSize: [5, 5, 6],
      fontWeight: "bold"
    }),
    h2: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, heading, {
      fontSize: [4, 4, 5]
    }),
    h3: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, heading, {
      fontSize: 3
    }),
    h4: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, heading, {
      fontSize: 2
    }),
    h5: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, heading, {
      fontSize: 1
    }),
    h6: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, heading, {
      fontSize: 0
    }),
    p: {
      my: 4
    },
    ul: {
      my: 4,
      px: 4
    },
    ol: {
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
      borderWidth: 0,
      borderLeftWidth: 8,
      borderStyle: "solid",
      borderColor: "background-muted",
      backgroundColor: "background-muted",
      color: "body",
      px: 4,
      py: 1,
      my: 4,
      mx: 0,
      fontStyle: "italic"
    },
    table: {
      my: 4,
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: "0",
      emptyCells: "hide",
      "& th": {
        p: 3,
        textAlign: "left",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "background-muted"
      },
      "& td": {
        p: 3,
        textAlign: "left",
        verticalAlign: "top",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "background-muted"
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
    }
  },
  links: {
    nav: {
      color: "inherit",
      fontWeight: "inherit",
      textDecoration: "none",
      ":hover,:focus": {
        color: "accent"
      }
    }
  },
  buttons: {
    primary: {
      py: 3,
      px: 4,
      textDecoration: "none",
      cursor: "pointer",
      fontSize: 2,
      fontWeight: "bold",
      transition: "all .3s ease-out",
      outline: "none",
      borderRadius: "default",
      borderWidth: 1,
      borderStyle: "solid",
      color: "background",
      borderColor: "primary",
      bg: "primary",
      ":hover": {
        color: "background",
        borderColor: "background",
        bg: "accent"
      }
    },
    outline: {
      variant: "buttons.primary",
      color: "primary",
      borderColor: "primary",
      bg: "background",
      ":hover": {
        color: "accent",
        borderColor: "accent",
        bg: "background"
      }
    },
    floating: {
      variant: "buttons.primary",
      px: 0,
      fontWeight: "bold",
      fontSize: 3,
      color: "heading",
      borderColor: "transparent",
      bg: "transparent",
      ":hover": {
        color: "accent",
        borderColor: "transparent",
        bg: "transparent"
      }
    },
    circle: {
      variant: "buttons.outline",
      color: "body",
      borderColor: "body",
      bg: "background",
      borderRadius: "circle",
      lineHeight: 0,
      p: 1
    }
  }
});

/***/ })

})
//# sourceMappingURL=_app.js.68bb8f733ab36d7ef9ff.hot-update.js.map