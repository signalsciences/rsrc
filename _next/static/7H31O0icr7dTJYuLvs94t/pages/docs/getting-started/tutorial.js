(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"K2Q+":function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/getting-started/tutorial",function(){return t("My8V")}])},My8V:function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return l});var o=t("z3IF"),r=t("2Fjn"),a=t("mXGw"),s=t.n(a),c=t("SAVP"),i=(s.a.createElement,{}),p="wrapper";function l(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(c.b)(p,Object(o.a)({},i,t,{components:n,mdxType:"MDXLayout"}),Object(c.b)("h1",{id:"tutorial"},"Tutorial"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"yarn add rsrc\n")),Object(c.b)("blockquote",null,Object(c.b)("p",{parentName:"blockquote"},"Requires ",Object(c.b)("inlineCode",{parentName:"p"},"react@>=16.8"),".\nThe ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"}),"fetch\nAPI"),"\nwill also need to be natively supported or polyfilled for your target\nenvironments.")),Object(c.b)("h2",{id:"configure-a-cache-provider"},"Configure a cache provider"),Object(c.b)("p",null,"The cache provider accepts a single, optional prop called ",Object(c.b)("inlineCode",{parentName:"p"},"map"),", which\ndefaults to ",Object(c.b)("inlineCode",{parentName:"p"},"new Map()"),". The value is expected to expose a\n",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"}),"map")," or map-like\ninterface. For larger applications, you might want to consider a\n",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)"}),"least recently used\n(LRU)"),"\nimplementation like ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.npmjs.com/package/quick-lru"}),"quick-lru")," which\nwill help limit memory usage."),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'// src/App.js\n\nimport * as React from "react";\nimport { Cache } from "rsrc";\nimport lru from "quick-lru";\n\nconst App = () => {\n  return <Cache map={lru(50)}>{/* additional providers, router, etc */}</Cache>;\n};\n\nexport default App;\n')),Object(c.b)("h2",{id:"define-a-resource"},"Define a resource"),Object(c.b)("p",null,"A resource can be thought of as a component-level description of an API endpoint\nand its available methods. In most cases this will mirror the interface provided\nby the endpoint itself along with any related operations that may be useful when\ndealing with the resource."),Object(c.b)("p",null,"In the example below, we have an endpoint at ",Object(c.b)("inlineCode",{parentName:"p"},"/todos"),". While a ",Object(c.b)("inlineCode",{parentName:"p"},"GET")," request to\nthis endpoint might return a collection of todos, it's likely designed to\naccomodate additional operations (",Object(c.b)("inlineCode",{parentName:"p"},"POST"),", ",Object(c.b)("inlineCode",{parentName:"p"},"PATCH"),", etc). We can define and\nexpose these methods as seen in the ",Object(c.b)("inlineCode",{parentName:"p"},"actions")," prop below."),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'// resources/Todos/Resource.js\n\nimport * as React from "react";\nimport { Resource } from "rsrc";\n\nconst Todos = props => {\n  const url = `https://api.example.com/todos`;\n\n  return (\n    <Resource\n      url={url}\n      actions={{\n        create: data => ({\n          options: {\n            method: "POST",\n            body: JSON.stringify(data)\n          },\n          invalidates: [url]\n        }),\n        markComplete: id => ({\n          url: `${url}/{id}`,\n          options: {\n            method: "PATCH",\n            body: JSON.stringify({ completed: true })\n          }\n        })\n      }}\n      {...props}\n    />\n  );\n};\n\nexport default Todos;\n')),Object(c.b)("h2",{id:"build-out-your-views"},"Build out your views"),Object(c.b)("p",null,"A resource view is a component that has been tailored to consume a particular\nresource."),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'// resources/Todos/List.js\n\nimport * as React from "react";\n\nconst TodosList = props => {\n  const { resource } = props;\n\n  if (resource.state.pending) {\n    return "Loading...";\n  }\n\n  if (resource.state.rejected) {\n    return `Error: ${resource.state.reason.message}`;\n  }\n\n  const todos = resource.state.value.filter(todo => !todo.completed);\n\n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id}>\n          <button\n            onClick={() => {\n              resource.actions\n                .markComplete(todo.id)\n                .then(() => {\n                  resource.state.refresh();\n                })\n                .catch(error => {\n                  console.log(error);\n                });\n            }}\n          >\n            \u2714\n          </button>\n          {todo.title}\n        </li>\n      ))}\n    </ul>\n  );\n};\n\nexport default TodosList;\n')),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'// resources/Todos/Create.js\n\nimport * as React from "react";\nimport Form from "./Form";\n\nconst TodosCreate = props => {\n  const { onSuccess, onFail, resource } = props;\n\n  return (\n    <Form\n      initialValues={{ title: "" }}\n      onSubmit={formValues => {\n        resource.actions\n          .create(formValues)\n          .then(fetchState => {\n            onSuccess(fetchState);\n          })\n          .catch(error => {\n            onFail(error);\n          });\n      }}\n    />\n  );\n};\n\nexport default TodosCreate;\n')),Object(c.b)("h2",{id:"use-it-on-a-page"},"Use it on a page"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'// pages/Todos.js\n\nimport * as React from "react";\nimport { Todos, TodosList, TodosCreate } from "../resources/Todos";\n\nconst TodosPage = props => {\n  return (\n    <Todos>\n      {resource => (\n        <div>\n          <TodosCreate\n            onSuccess={handleSuccess}\n            onFail={handleFail}\n            resource={resource}\n          />\n          <hr />\n          <TodosList resource={resource} />\n        </div>\n      )}\n    </Todos>\n  );\n};\n\nexport default TodosPage;\n')))}l.isMDXComponent=!0}},[["K2Q+",1,0]]]);