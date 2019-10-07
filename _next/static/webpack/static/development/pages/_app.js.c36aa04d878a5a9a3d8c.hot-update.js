webpackHotUpdate("static/development/pages/_app.js",{

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
        mx: 'auto',
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
      lineNumber: 40
    },
    __self: this
  }, isDocs || isTheme ? __jsx(rebass__WEBPACK_IMPORTED_MODULE_2__["Flex"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, __jsx(rebass__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    flex: [0, 1],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, isDocs ? __jsx(_pages_docs_index_md__WEBPACK_IMPORTED_MODULE_6__["default"], {
    pathname: router.pathname,
    components: {
      wrapper: _Sidebar__WEBPACK_IMPORTED_MODULE_4__["default"]
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }) : __jsx(_pages_theme_index_md__WEBPACK_IMPORTED_MODULE_7__["default"], {
    pathname: router.pathname,
    components: {
      wrapper: _Sidebar__WEBPACK_IMPORTED_MODULE_4__["default"]
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  })), __jsx(rebass__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    flex: [1, 2, 3],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, __jsx(Content, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, children), isDocs && __jsx(rebass__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    mt: 4,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, __jsx(_pages_docs_index_md__WEBPACK_IMPORTED_MODULE_6__["default"], {
    pathname: router.pathname,
    components: {
      wrapper: _Pager__WEBPACK_IMPORTED_MODULE_5__["default"]
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  })))) : children);
};

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ })

})
//# sourceMappingURL=_app.js.c36aa04d878a5a9a3d8c.hot-update.js.map