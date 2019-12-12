(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"0Zzt":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return b}));var a=n("kOwS"),o=n("qNsG"),r=n("q1tI"),c=n.n(r),i=n("E/Ix"),l=(c.a.createElement,{}),s="wrapper";function b(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)(s,Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"fetch"},"Fetch"),Object(i.b)("p",null,"Fetch is a component that exposes a declarative interface for the ",Object(i.b)("inlineCode",{parentName:"p"},"fetch")," API.\nIts main job is to translate the promise state of a fetch operation into\nconsumable props. It also provides methods to read, invalidate, and refresh\nfetch states."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"React.Component<FetchProps, FetchState>\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"The Fetch component is designed to work with ",Object(i.b)("inlineCode",{parentName:"p"},"GET")," requests. This is for 2 reasons:"),Object(i.b)("ol",{parentName:"blockquote"},Object(i.b)("li",{parentName:"ol"},Object(i.b)("inlineCode",{parentName:"li"},"GET")," requests are typically\n",Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://developer.mozilla.org/en-US/docs/Glossary/safe"}),"safe"),", and\n",Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://developer.mozilla.org/en-US/docs/Glossary/cacheable"}),"cacheable"),"."),Object(i.b)("li",{parentName:"ol"},Object(i.b)("inlineCode",{parentName:"li"},"POST"),", ",Object(i.b)("inlineCode",{parentName:"li"},"PUT"),", ",Object(i.b)("inlineCode",{parentName:"li"},"PATCH"),", and ",Object(i.b)("inlineCode",{parentName:"li"},"DELETE")," methods are typically reserved for\noperations that modify state on the server. In UI terms, these actions\nusually require user interaction, e.g. ",Object(i.b)("inlineCode",{parentName:"li"},"onClick"),", ",Object(i.b)("inlineCode",{parentName:"li"},"onSubmit"),".")),Object(i.b)("p",{parentName:"blockquote"},"To make additional operations for a particular endpoint available to\nchildren, consider using a Resource component.")),Object(i.b)("h2",{id:"props"},"Props"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"type FetchProps = {\n  url: string,\n  options: RequestOptions,\n  maxAge: number,\n  children?: FetchState => React.Node,\n\n  /* advanced options */\n  cache: CacheState,\n  fetcher: Fetcher\n};\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},Object(i.b)("inlineCode",{parentName:"p"},"maxAge")," is the maximum ",Object(i.b)("strong",{parentName:"p"},"number of seconds")," since last resolved that a cached\nresult will be considered acceptable. The fetcher will always look in the cache\nfirst. If the result is not found, or the last resolved timestamp is outside the\nmaximum allowed, the fetcher will automatically refresh the result.")),Object(i.b)("h2",{id:"fetchstate"},"FetchState"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"type FetchState = {\n  pending: boolean,\n  rejected: boolean,\n  fulfilled: boolean,\n  value: ?any,\n  reason: ?Error\n  invalidate: () => void,\n  read: () => void,\n  refresh: () => void\n};\n")),Object(i.b)("h2",{id:"example"},"Example"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),'import React from "react";\n\nexport default () => {\n  const url = `https://api.example.com/users`;\n  const options = {\n    method: "GET",\n    headers: {\n      "Content-Type": "application/json; charset=UTF-8"\n    }\n  };\n  const maxAge = 60 * 60; // 1 hour\n\n  return (\n    <Fetch url={url} options={options} maxAge={maxAge}>\n      {fetchState => {\n        if (fetchState.pending) return "Loading...";\n\n        if (fetchState.rejected) return "Error";\n\n        const users = fetchState.value.data;\n\n        return (\n          <>\n            <button onClick={fetchState.read}>Read</button>\n            <button onClick={fetchState.invalidate}>Invalidate</button>\n            <button onClick={fetchState.refresh}>Refresh</button>\n            <ul>\n              {users.map(user => (\n                <li key={user.id}>{user.name}</li>\n              ))}\n            </ul>\n          </>\n        );\n      }}\n    </Fetch>\n  );\n};\n')))}b.isMDXComponent=!0},"7GzR":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/api/fetch",function(){return n("0Zzt")}])}},[["7GzR",0,1]]]);