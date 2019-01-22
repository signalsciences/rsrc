(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{110:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.withMDXComponents=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=i(n(1)),r=i(n(79)),c=i(n(37));function i(e){return e&&e.__esModule?e:{default:e}}var s=(0,r.default)({}),l=s.Provider,p=s.Consumer;t.withMDXComponents=function(e){return function(t){var n=t.components,r=function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(t,["components"]);return o.default.createElement(p,null,function(t){return o.default.createElement(e,a({components:n||t},r))})}};var m=function(e){var t=e.components,n=e.children;return o.default.createElement(l,{value:t},n)};m.propTypes={components:c.default.object.isRequired,children:c.default.element.isRequired},t.default=m},2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(615);Object.defineProperty(t,"MDXTag",{enumerable:!0,get:function(){return r(a).default}});var o=n(110);function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"MDXProvider",{enumerable:!0,get:function(){return r(o).default}})},615:function(e,t,n){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),c=n(1),i=p(c),s=p(n(614)),l=n(110);function p(e){return e&&e.__esModule?e:{default:e}}var m={inlineCode:"code",wrapper:"div"},u=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==a(t)&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+a(t));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,c.Component),r(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.parentName,a=e.props,r=void 0===a?{}:a,c=e.children,l=e.components,p=void 0===l?{}:l,u=e.Layout,f=e.layoutProps,h=p[n+"."+t]||p[t]||m[t]||t;return u?((0,s.default)(this,u),i.default.createElement(u,o({components:p},f),i.default.createElement(h,r,c))):i.default.createElement(h,r,c)}}]),t}();t.default=(0,l.withMDXComponents)(u)},706:function(e,t,n){__NEXT_REGISTER_PAGE("/",function(){return e.exports=n(713),{page:e.exports.default}})},713:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(2);function c(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=function(e){var t=e.components;c(e,["components"]);return o.a.createElement(r.MDXTag,{name:"wrapper",components:t},o.a.createElement(r.MDXTag,{name:"h1",components:t},"rsrc"),o.a.createElement(r.MDXTag,{name:"p",components:t},o.a.createElement(r.MDXTag,{name:"strong",components:t,parentName:"p"},"rsrc")," is a collection of components designed to help manage async fetch\noperations in React."),o.a.createElement(r.MDXTag,{name:"h2",components:t},"What problem are we solving?"),o.a.createElement(r.MDXTag,{name:"p",components:t},"There are a number of great solutions for mananging async fetch state in the\nReact ecosystem but many of these patterns require a non-trivial amount of\nboilerplate or framework knowledge to implement and maintain."),o.a.createElement(r.MDXTag,{name:"p",components:t},"This project attempts to identify and abstract generic fetch state utilities into\ncomposable components that are simple enough to reason about while remaining as\nflexible and expressive as the underlying technologies they expose."),o.a.createElement(r.MDXTag,{name:"h3",components:t},"Motivation"),o.a.createElement(r.MDXTag,{name:"ul",components:t},o.a.createElement(r.MDXTag,{name:"li",components:t,parentName:"ul"},"reduce dependence on common boilerplate for managing fetch state"),o.a.createElement(r.MDXTag,{name:"li",components:t,parentName:"ul"},"encourage a declarative approach to resource operations "),o.a.createElement(r.MDXTag,{name:"li",components:t,parentName:"ul"},"facilitate the collocation of resource descriptors with the components that\ndepend on them"),o.a.createElement(r.MDXTag,{name:"li",components:t,parentName:"ul"},"simplify cache management and invalidation")),o.a.createElement(r.MDXTag,{name:"h2",components:t},"What does this do?"),o.a.createElement(r.MDXTag,{name:"p",components:t},"This library exports 3 components to manage and simplify async fetch operations\nin React. "),o.a.createElement(r.MDXTag,{name:"ol",components:t},o.a.createElement(r.MDXTag,{name:"li",components:t,parentName:"ol"},o.a.createElement(r.MDXTag,{name:"strong",components:t,parentName:"li"},"Cache"),". Cache is a context provider that exposes a simple\n",o.a.createElement(r.MDXTag,{name:"a",components:t,parentName:"li",props:{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"}},"map"),"-like\ninterface. This should be mounted near the top of your application tree\nsimilar to other context providers."),o.a.createElement(r.MDXTag,{name:"li",components:t,parentName:"ol"},o.a.createElement(r.MDXTag,{name:"strong",components:t,parentName:"li"},"Fetch"),". Fetch is a component that offers a declarative approach to the\n",o.a.createElement(r.MDXTag,{name:"a",components:t,parentName:"li",props:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"}},"fetch")," api. Its\nmain jobs are to translate\n",o.a.createElement(r.MDXTag,{name:"a",components:t,parentName:"li",props:{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"}},"promise"),"\nstate into consumable props, provide a simple mechanism for caching and\nexpiring promises, as well as providing utilities to read, invalidate, and\nrefresh fetch states."),o.a.createElement(r.MDXTag,{name:"li",components:t,parentName:"ol"},o.a.createElement(r.MDXTag,{name:"strong",components:t,parentName:"li"},"Resource"),". Resource glues together the above functionality with a more\nexpressive interface. If Fetch represents an individual request state, a\nResource can be thought of as a generic entity description that defines and\nexposes additional or related actions for a given endpoint.")),o.a.createElement(r.MDXTag,{name:"h2",components:t},"What doesn't this do?"),o.a.createElement(r.MDXTag,{name:"p",components:t},"Currently, server side rendering (SSR), and cache initialization from serialized\nstate are not supported out of the box. rsrc leverages some unique\ncharacteristics of promises to simplify state management internally.  Promises\nare not serializable, which makes them less straight-forward to persist across\ninstances."),o.a.createElement(r.MDXTag,{name:"p",components:t},"That said, the cache component accepts an arbitrary map-like interface, so it\nshould be possible to serialize resolved states, and then rewrap them in\npromises before passing along to the cache provider."),o.a.createElement(r.MDXTag,{name:"p",components:t},"For the time being though, we've chosen to optimize for ergonomics and simplicity over\npersistance."),o.a.createElement(r.MDXTag,{name:"h2",components:t},"References & Credits"),o.a.createElement(r.MDXTag,{name:"p",components:t},"Related projects, inspiration, and references:"),o.a.createElement(r.MDXTag,{name:"ul",components:t},o.a.createElement(r.MDXTag,{name:"li",components:t,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"a",components:t,parentName:"li",props:{href:"https://github.com/heroku/react-refetch"}},"heroku/react-refetch"))))};t.default=function(){return a.createElement("div",{className:"content"},a.createElement(i,null))}}},[[706,1,0]]]);