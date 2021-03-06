/* @flow */

import React from "react";
import { render, cleanup } from "@testing-library/react";
import HLRU from "hashlru";
import { Cache } from "../src";

afterEach(cleanup);

function setup(increment) {
  let renderProps = {};
  const children = (arg) => {
    renderProps = { ...arg };
    increment();
    return null;
  };
  render(
    <Cache>
      <Cache.Consumer>{children}</Cache.Consumer>
    </Cache>
  );
  return {
    renderProps,
  };
}

test("cache provider only updates on mutations", async () => {
  let counter = 0;

  const increment = () => {
    counter += 1;
  };
  const { renderProps } = setup(increment);

  expect([...renderProps.entries()]).toEqual([]);
  expect(counter).toBe(1);

  expect(renderProps.set("foo", "bar")).toEqual(new Map([["foo", "bar"]]));
  expect(counter).toBe(2);

  expect(renderProps.get("foo")).toEqual("bar");
  expect(counter).toBe(2);

  expect(renderProps.has("foo")).toEqual(true);
  expect(counter).toBe(2);

  expect([...renderProps.entries()]).toEqual([["foo", "bar"]]);
  expect(counter).toBe(2);

  expect([...renderProps.values()]).toEqual(["bar"]);
  expect(counter).toBe(2);

  expect([...renderProps.keys()]).toEqual(["foo"]);
  expect(counter).toBe(2);

  expect(renderProps.set("baz", "qux")).toEqual(
    new Map([
      ["foo", "bar"],
      ["baz", "qux"],
    ])
  );
  expect(counter).toEqual(3);

  expect(renderProps.delete("foo")).toBe(true);
  expect(counter).toEqual(4);

  // TODO: add this back if we need it
  // expect(renderProps.delete('foo')).toBe(false)
  // expect(counter).toEqual(4)

  renderProps.clear();
  expect([...renderProps.entries()]).toEqual([]);
  expect(counter).toEqual(5);
});

test("accommodates custom caches that do not return boolean from delete", async () => {
  let renderProps = {};
  const children = (arg) => {
    renderProps = { ...arg };
    return null;
  };

  const lru = HLRU(5);
  lru.delete = lru.remove;

  await render(
    <Cache map={lru}>
      <Cache.Consumer>{children}</Cache.Consumer>
    </Cache>
  );

  expect(renderProps.delete("foo")).toEqual(false);

  renderProps.set("foo", "bar");
  expect(renderProps.get("foo")).toEqual("bar");
  expect(renderProps.delete("foo")).toEqual(true);
});
