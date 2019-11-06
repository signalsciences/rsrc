/* @flow */

import React from "react";
import { render, cleanup, wait } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import { Cache, Resource } from "../src";

import { getInvalidKeys } from "../src/Resource";

afterEach(cleanup);

test("#getInvalidKeys", async () => {
  const keys = [
    "/foo",
    "/foo?q=1",
    "/foo/quux",
    "/bar",
    "/bar?q=1",
    "/bar/quux"
  ];

  expect(getInvalidKeys(keys, key => ["/foo"].includes(key))).toEqual(["/foo"]);
  expect(getInvalidKeys(keys, "/bar")).toEqual(["/bar", "/bar?q=1"]);
  expect(getInvalidKeys(keys, ["/foo", "/bar"])).toEqual([
    "/foo",
    "/foo?q=1",
    "/bar",
    "/bar?q=1"
  ]);
});

test("<Resource />", async () => {
  fetch.mockResponses([
    JSON.stringify({ data: "ok" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  ]);
  let renderProps = {};
  const children = arg => {
    renderProps = { ...arg };
    return null;
  };

  const url = "https://foo.bar.com/baz/quux";

  await render(
    <Cache>
      <Resource
        url={url}
        options={{}}
        actions={{
          create: data => ({
            options: {
              body: JSON.stringify(data),
              method: "POST"
            },
            invalidates: [url]
          })
        }}
      >
        {children}
      </Resource>
    </Cache>
  );

  expect(fetch).toHaveBeenCalledTimes(1);

  renderProps.state.read();
  expect(fetch).toHaveBeenCalledTimes(1);

  renderProps.state.invalidate();
  renderProps.state.read();
  expect(fetch).toHaveBeenCalledTimes(2);

  renderProps.state.refresh();
  expect(fetch).toHaveBeenCalledTimes(3);

  await wait(() =>
    renderProps.actions
      .create({ foo: "bar" })
      .then(() => {})
      .catch(() => {})
  );

  expect(fetch).toHaveBeenCalledTimes(5);

  renderProps.state.read();
  expect(fetch).toHaveBeenCalledTimes(5);
});
