(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"33Qh":function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/api/resource",function(){return t("iiM4")}])},"7ljp":function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return m})),t.d(n,"c",(function(){return l}));var r=t("q1tI"),o=t.n(r);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=o.a.createContext({}),l=function(e){var n=o.a.useContext(u),t=n;return e&&(t="function"===typeof e?e(n):i({},n,{},e)),t},p=function(e){var n=l(e.components);return o.a.createElement(u.Provider,{value:n},e.children)},b="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},f=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(t),b=r,f=p["".concat(c,".").concat(b)]||p[b]||d[b]||a;return t?o.a.createElement(f,i({ref:n},u,{components:t})):o.a.createElement(f,i({ref:n},u))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"===typeof e||r){var a=t.length,c=new Array(a);c[0]=f;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[b]="string"===typeof e?e:r,c[1]=i;for(var u=2;u<a;u++)c[u]=t[u];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"},Ff2n:function(e,n,t){"use strict";function r(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}t.d(n,"a",(function(){return r}))},Qetd:function(e,n,t){"use strict";var r=Object.assign.bind(Object);e.exports=r,e.exports.default=e.exports},iiM4:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return l}));var r=t("wx14"),o=t("Ff2n"),a=t("q1tI"),c=t.n(a),i=t("7ljp"),s=(c.a.createElement,{}),u="wrapper";function l(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(i.b)(u,Object(r.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"resource"},"Resource"),Object(i.b)("p",null,"Resource glues together the functionality of Cache and Fetch with a more\nexpressive interface. Since Fetch is limited to handle only the ",Object(i.b)("inlineCode",{parentName:"p"},"GET")," method\nfor a particular endpoint, Resource expands on this to allow additional or\nrelated operations to be declared and exposed to children via ",Object(i.b)("inlineCode",{parentName:"p"},"actions"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),"React.Component<ResourceProps, ResourceState>\n")),Object(i.b)("h2",{id:"props"},"Props"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),"type Action = any => {\n  url?: string,\n  options?: RequestOptions,\n  maxAge?: number,\n  invalidates?: Array<string>\n};\n\ntype ResourceProps = {\n  url: string,\n  options: RequestOptions,\n  maxAge: number,\n  actions: { [key: string]: Action },\n  children?: ResourceState => React.Node,\n\n  /* advanced options */\n  fetcher: Fetcher\n};\n")),Object(i.b)("h2",{id:"state"},"State"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),"type FetchState = {\n  pending: boolean,\n  rejected: boolean,\n  fulfilled: boolean,\n  value: ?any,\n  reason: ?Error\n  invalidate: () => void,\n  read: () => void,\n  refresh: () => void\n};\n\ntype ResourceState = {\n  state: FetchState,\n  actions: {\n    [key: string]: (*) => Promise<*>\n  },\n  meta: ResourceProps\n};\n")),Object(i.b)("h2",{id:"example"},"Example"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),'// resources/users/User.js\n\nimport React from "react";\nimport { Resource } from "rsrc";\nimport Form from "./Form";\n\nexport default ({ id }) => {\n  const url = `https://api.example.com/users/${id}`;\n  const options = {\n    method: "GET",\n    headers: {\n      "Content-Type": "application/json; charset=UTF-8"\n    }\n  };\n  const maxAge = 60 * 60; // 1 hour\n\n  const update = data => ({\n    url,\n    options: {\n      ...options,\n      method: "PATCH",\n      body: JSON.stringify(data)\n    },\n    invalidates: [url]\n  });\n\n  return (\n    <Resource url={url} options={options} maxAge={maxAge} actions={{ update }}>\n      {resource => {\n        const { state, actions } = resource;\n\n        if (state.pending) return "Loading...";\n\n        if (state.rejected) return "Error";\n\n        const handleSubmit = formValues => {\n          actions\n            .update(formValues)\n            .then(value => console.log("Success", value))\n            .catch(error => console.log("Fail", error.message));\n        };\n\n        const { name, email } = state.value;\n\n        return <Form initialState={{ name, email }} onSubmit={handleSubmit} />;\n      }}\n    </Resource>\n  );\n};\n')))}l.isMDXComponent=!0},wx14:function(e,n,t){"use strict";function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}t.d(n,"a",(function(){return r}))}},[["33Qh",0,1]]]);