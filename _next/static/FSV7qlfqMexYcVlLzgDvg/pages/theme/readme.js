(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{"78JO":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/readme",function(){return n("791K")}])},"791K":function(e,t,n){"use strict";n.r(t);var a=n("mXGw"),c=n.n(a),r=n("z3IF"),b=n("2Fjn"),s=n("SAVP"),o=(c.a.createElement,{}),p="wrapper";function i(e){var t=e.components,n=Object(b.a)(e,["components"]);return Object(s.b)(p,Object(r.a)({},o,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,Object(s.b)("img",Object(r.a)({parentName:"p"},{src:"https://signalsciences.github.io/rsrc/static/rsrc-logo.svg",alt:"Logo"}))),Object(s.b)("p",null,Object(s.b)("img",Object(r.a)({parentName:"p"},{src:"https://signalsciences.github.io/rsrc/static/rsrc-type.svg",alt:"Rsrc"}))),Object(s.b)("p",null,Object(s.b)("a",Object(r.a)({parentName:"p"},{href:"https://npmjs.com/package/rsrc"}),Object(s.b)("img",Object(r.a)({parentName:"a"},{src:"https://flat.badgen.net/npm/v/rsrc",alt:"version"}))),"\n",Object(s.b)("a",Object(r.a)({parentName:"p"},{href:"LICENSE.md"}),Object(s.b)("img",Object(r.a)({parentName:"a"},{src:"https://flat.badgen.net/badge/license/MIT/blue",alt:"license"}))),"\n",Object(s.b)("a",Object(r.a)({parentName:"p"},{href:"https://bundlephobia.com/result?p=rsrc"}),Object(s.b)("img",Object(r.a)({parentName:"a"},{src:"http://flat.badgen.net/bundlephobia/minzip/rsrc",alt:"gzip Size"})))),Object(s.b)("p",null,"A collection of components designed to simplify fetch state in React."),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("a",Object(r.a)({parentName:"strong"},{href:"https://signalsciences.github.io/rsrc"}),"Docs"))),Object(s.b)("h2",{id:"getting-started"},"Getting Started"),Object(s.b)("pre",null,Object(s.b)("code",Object(r.a)({parentName:"pre"},{}),"yarn add rsrc\n")),Object(s.b)("h2",{id:"usage"},"Usage"),Object(s.b)("pre",null,Object(s.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),'import React from "react";\nimport { Resource } from "rsrc";\n\nexport default props => {\n  const { id } = props;\n  const url = `/todos/${id}`;\n\n  return (\n    <Resource\n      url={url}\n      maxAge={60}\n      actions={{\n        remove: () => ({\n          options: {\n            method: "DELETE"\n          },\n          invalidates: ["/todos"]\n        })\n      }}\n    >\n      {({ state, actions }) => {\n        if (!state.fulfilled) return null;\n\n        const todo = state.value;\n\n        const handleClick = () => {\n          actions\n            .remove()\n            .then(fetchState => {\n              /* */\n            })\n            .catch(error => {\n              /* */\n            });\n        };\n\n        return (\n          <div>\n            <h1>{todo.name}</h1>\n            <p>{todo.description}</p>\n            <button onClick={handleClick}>\xd7</button>\n          </div>\n        );\n      }}\n    </Resource>\n  );\n};\n')),Object(s.b)("h3",{id:"related"},"Related"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("a",Object(r.a)({parentName:"li"},{href:"https://github.com/reduxjs/redux"}),"Redux")),Object(s.b)("li",{parentName:"ul"},Object(s.b)("a",Object(r.a)({parentName:"li"},{href:"https://github.com/heroku/react-refetch"}),"React Refetch"))))}i.isMDXComponent=!0;var l=c.a.createElement;t.default=function(){return l(i,null)}}},[["78JO",1,0]]]);