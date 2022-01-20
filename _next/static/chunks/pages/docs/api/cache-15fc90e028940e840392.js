(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[511],{9431:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return s}});var a=t(159),o=t(219),r=(t(7294),t(3905)),i=["components"],p={};function s(e){var n=e.components,t=(0,o.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"cache"},"Cache"),(0,r.kt)("p",null,"Cache is a context provider with a map-like interface. It can store any\narbitrary key-value pairs. The ",(0,r.kt)("inlineCode",{parentName:"p"},"Fetch")," component uses ",(0,r.kt)("inlineCode",{parentName:"p"},"Cache")," to store promises\nreturned from ",(0,r.kt)("inlineCode",{parentName:"p"},"GET")," requests keyed by the URL. The timestamp information is\nalso included to assist with time-based invalidation strategies (via the\n",(0,r.kt)("inlineCode",{parentName:"p"},"maxAge")," prop)."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"React.Component<CacheProps, CacheState>\n")),(0,r.kt)("h2",{id:"props"},"Props"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"type CacheProps = {\n  map: Map<*, *>,\n  children?: React.Node,\n};\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"map")," prop accepts any map-like interface. At a minimum, it should be\niterable and provide methods for ",(0,r.kt)("inlineCode",{parentName:"p"},"get()"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"set()"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"delete()"),".")),(0,r.kt)("h2",{id:"state"},"State"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"type CacheState = {\n  get: (key: *) => *,\n  set: (key: *, value: *) => Map<*, *>,\n  delete: (key: *) => boolean,\n  entries: () => Iterator<*>,\n  values: () => Iterator<*>,\n  keys: () => Iterator<*>,\n};\n")),(0,r.kt)("p",null,"This state is passed to the context provider which is then used internally by\n",(0,r.kt)("inlineCode",{parentName:"p"},"Resource"),"."),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"The cache consumer shown below is for illustration purposes only. It is used\ninternally by ",(0,r.kt)("inlineCode",{parentName:"p"},"Resource")," and is not meant to be used directly.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'import React from "react";\nimport { Cache } from "rsrc";\n\nexport default () => (\n  <Cache>\n    <Cache.Consumer>\n      {(cache) => {\n        const addRandomEntry = () => {\n          cache.set(+new Date(), Math.random());\n        };\n        const removeEntry = (key) => {\n          cache.delete(key);\n        };\n        return (\n          <>\n            <button onClick={addRandomEntry}>Add entry</button>\n            <ul>\n              {[...cache.entries()].map(([key, value]) => (\n                <li key={key}>\n                  <button onClick={() => removeEntry(key)}>\xd7</button>\n                  {`${key}: ${value}`}\n                </li>\n              ))}\n            </ul>\n          </>\n        );\n      }}\n    </Cache.Consumer>\n  </Cache>\n);\n')))}s.isMDXComponent=!0},2970:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/api/cache",function(){return t(9431)}])}},function(e){e.O(0,[774,888,179],(function(){return n=2970,e(e.s=n);var n}));var n=e.O();_N_E=n}]);