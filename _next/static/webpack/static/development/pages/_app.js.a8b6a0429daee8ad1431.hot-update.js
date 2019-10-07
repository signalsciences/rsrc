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
    styles: function styles(_ref4) {
      var colors = _ref4.colors;
      return {
        body: {
          margin: 0,
          padding: 0,
          color: colors.text,
          backgroundColor: colors.background,
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

/***/ })

})
//# sourceMappingURL=_app.js.a8b6a0429daee8ad1431.hot-update.js.map