(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{B1Gs:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return s}));var a=t("kOwS"),c=t("qNsG"),o=t("q1tI"),r=t.n(o),p=t("E/Ix"),b=(r.a.createElement,{}),i="wrapper";function s(e){var n=e.components,t=Object(c.a)(e,["components"]);return Object(p.b)(i,Object(a.a)({},b,t,{components:n,mdxType:"MDXLayout"}),Object(p.b)("h1",{id:"cache"},"Cache"),Object(p.b)("p",null,"Cache is a context provider with a map-like interface. It can store any\narbitrary key-value pairs. The ",Object(p.b)("inlineCode",{parentName:"p"},"Fetch")," component uses ",Object(p.b)("inlineCode",{parentName:"p"},"Cache")," to store promises\nreturned from ",Object(p.b)("inlineCode",{parentName:"p"},"GET")," requests keyed by the URL. The timestamp information is\nalso included to assist with time-based invalidation strategies (via the\n",Object(p.b)("inlineCode",{parentName:"p"},"maxAge")," prop)."),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"React.Component<CacheProps, CacheState>\n")),Object(p.b)("h2",{id:"props"},"Props"),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"type CacheProps = {\n  map: Map<*, *>,\n  children?: React.Node\n};\n")),Object(p.b)("blockquote",null,Object(p.b)("p",{parentName:"blockquote"},"The ",Object(p.b)("inlineCode",{parentName:"p"},"map")," prop accepts any map-like interface. At a minimum, it should be\niterable and provide methods for ",Object(p.b)("inlineCode",{parentName:"p"},"get()"),", ",Object(p.b)("inlineCode",{parentName:"p"},"set()"),", and ",Object(p.b)("inlineCode",{parentName:"p"},"delete()"),".")),Object(p.b)("h2",{id:"state"},"State"),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"type CacheState = {\n  get: (key: *) => *,\n  set: (key: *, value: *) => Map<*, *>,\n  delete: (key: *) => boolean,\n  entries: () => Iterator<*>,\n  values: () => Iterator<*>,\n  keys: () => Iterator<*>\n};\n")),Object(p.b)("p",null,"This state is passed to the context provider which is then used internally by\n",Object(p.b)("inlineCode",{parentName:"p"},"Resource"),"."),Object(p.b)("h2",{id:"example"},"Example"),Object(p.b)("blockquote",null,Object(p.b)("p",{parentName:"blockquote"},"The cache consumer shown below is for illustration purposes only. It is used\ninternally by ",Object(p.b)("inlineCode",{parentName:"p"},"Resource")," and is not meant to be used directly.")),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),'import React from "react";\nimport { Cache } from "rsrc";\n\nexport default () => (\n  <Cache>\n    <Cache.Consumer>\n      {cache => {\n        const addRandomEntry = () => {\n          cache.set(+new Date(), Math.random());\n        };\n        const removeEntry = key => {\n          cache.delete(key);\n        };\n        return (\n          <>\n            <button onClick={addRandomEntry}>Add entry</button>\n            <ul>\n              {[...cache.entries()].map(([key, value]) => (\n                <li key={key}>\n                  <button onClick={() => removeEntry(key)}>\xd7</button>\n                  {`${key}: ${value}`}\n                </li>\n              ))}\n            </ul>\n          </>\n        );\n      }}\n    </Cache.Consumer>\n  </Cache>\n);\n')))}s.isMDXComponent=!0},"n/Qb":function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/api/cache",function(){return t("B1Gs")}])}},[["n/Qb",0,1]]]);