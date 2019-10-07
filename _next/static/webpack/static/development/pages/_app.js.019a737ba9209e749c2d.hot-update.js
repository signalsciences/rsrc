webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "../node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/core */ "../node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! theme-ui */ "../node_modules/theme-ui/dist/index.esm.js");
/* harmony import */ var _theme_ui_prism__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @theme-ui/prism */ "../node_modules/@theme-ui/prism/dist/prism.esm.js");
/* harmony import */ var rebass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rebass */ "../node_modules/rebass/dist/index.esm.js");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Link */ "./components/Link.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Footer */ "./components/Footer.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Header */ "./components/Header.js");
/* harmony import */ var _Main__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Main */ "./components/Main.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../theme */ "./theme/index.js");

var _jsxFileName = "/Users/john/go/src/github.com/signalsciences/rsrc/website/components/Layout.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1__["createElement"];

/* eslint-disable react/jsx-props-no-spreading */











var withLink = function withLink(Tag) {
  return function (props) {
    if (!props.id) return __jsx(Tag, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }));
    var children = props.children;
    return __jsx(Tag, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    }), __jsx("a", {
      href: "#".concat(props.id),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: this
    }, children));
  };
};

var components = {
  pre: function pre(_ref) {
    var children = _ref.children;
    return __jsx(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, children);
  },
  code: _theme_ui_prism__WEBPACK_IMPORTED_MODULE_4__["default"],
  inlineCode: function inlineCode(_ref2) {
    var children = _ref2.children;
    return __jsx(theme_ui__WEBPACK_IMPORTED_MODULE_3__["Styled"].code, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: this
    }, children);
  },
  a: _Link__WEBPACK_IMPORTED_MODULE_6__["default"],
  img: rebass__WEBPACK_IMPORTED_MODULE_5__["Image"],
  h2: withLink("h2"),
  h3: withLink("h3")
};

var Layout = function Layout(_ref3) {
  var children = _ref3.children;
  return __jsx(theme_ui__WEBPACK_IMPORTED_MODULE_3__["ThemeProvider"], {
    theme: _theme__WEBPACK_IMPORTED_MODULE_10__["default"],
    components: components,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, __jsx(_emotion_core__WEBPACK_IMPORTED_MODULE_2__["Global"], {
    styles: function styles(theme) {
      return {
        body: {
          margin: 0,
          padding: 0,
          color: theme.colors.text,
          backgroundColor: theme.colors.background,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale"
        }
      };
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }), __jsx(theme_ui__WEBPACK_IMPORTED_MODULE_3__["Styled"].root, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, __jsx(rebass__WEBPACK_IMPORTED_MODULE_5__["Flex"], {
    flexDirection: "column",
    justifyContent: "space-between",
    sx: {
      minHeight: "100vh"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, __jsx(rebass__WEBPACK_IMPORTED_MODULE_5__["Box"], {
    flex: 1,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, __jsx(_Header__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  })), __jsx(rebass__WEBPACK_IMPORTED_MODULE_5__["Box"], {
    flex: 999,
    flexGrow: 999,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: this
  }, __jsx(_Main__WEBPACK_IMPORTED_MODULE_9__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: this
  }, children)), __jsx(rebass__WEBPACK_IMPORTED_MODULE_5__["Box"], {
    flex: 1,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }, __jsx(_Footer__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./components/Main.js":
/*!****************************!*\
  !*** ./components/Main.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "../node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rebass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rebass */ "../node_modules/rebass/dist/index.esm.js");
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container */ "./components/Container.js");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sidebar */ "./components/Sidebar.js");
/* harmony import */ var _Pager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pager */ "./components/Pager.js");
/* harmony import */ var _pages_docs_index_md__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pages/docs/index.md */ "../docs/index.md");
/* harmony import */ var _pages_theme_index_md__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pages/theme/index.md */ "./pages/theme/index.md");
var _jsxFileName = "/Users/john/go/src/github.com/signalsciences/rsrc/website/components/Main.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];









var Content = function Content(_ref) {
  var children = _ref.children;
  return __jsx(rebass__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    sx: {
      p: {
        maxWidth: 720
      },
      "& h1:first-of-type ": {
        mt: 5
      }
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, children);
};

var Main = function Main(_ref2) {
  var children = _ref2.children;
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])();
  var isDocs = /\/docs\//.test(router.pathname);
  var isTheme = /\/theme\//.test(router.pathname);
  return __jsx(_Container__WEBPACK_IMPORTED_MODULE_3__["default"], {
    as: "main",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, isDocs || isTheme ? __jsx(rebass__WEBPACK_IMPORTED_MODULE_2__["Flex"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, __jsx(rebass__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    flex: [0, 1],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, isDocs ? __jsx(_pages_docs_index_md__WEBPACK_IMPORTED_MODULE_6__["default"], {
    pathname: router.pathname,
    components: {
      wrapper: _Sidebar__WEBPACK_IMPORTED_MODULE_4__["default"]
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }) : __jsx(_pages_theme_index_md__WEBPACK_IMPORTED_MODULE_7__["default"], {
    pathname: router.pathname,
    components: {
      wrapper: _Sidebar__WEBPACK_IMPORTED_MODULE_4__["default"]
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  })), __jsx(rebass__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    flex: [1, 2, 3],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, __jsx(Content, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, children), isDocs && __jsx(rebass__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    mt: 4,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, __jsx(_pages_docs_index_md__WEBPACK_IMPORTED_MODULE_6__["default"], {
    pathname: router.pathname,
    components: {
      wrapper: _Pager__WEBPACK_IMPORTED_MODULE_5__["default"]
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  })))) : children);
};

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ })

})
//# sourceMappingURL=_app.js.019a737ba9209e749c2d.hot-update.js.map