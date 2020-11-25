/* @flow */

import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import { Cache, Fetch } from "../src";

beforeEach(cleanup);
afterEach(() => {
  fetch.resetMocks();
});

test("<Fetch /> should fulfill requests and stay in sync", async () => {
  fetch.mockResponses(
    [
      JSON.stringify({ data: "alpha" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    ],
    [
      JSON.stringify({ data: "bravo" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    ],
    [
      JSON.stringify({ data: "charlie" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    ],
    [
      JSON.stringify({ data: "delta" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    ],
    [
      JSON.stringify({ data: "echo" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    ]
  );

  let renderProps1 = {};
  const children1 = (arg) => {
    renderProps1 = { ...arg };
    return null;
  };

  let renderProps2 = {};
  const children2 = (arg) => {
    renderProps2 = { ...arg };
    return null;
  };

  //
  // We are using Fetch with Cache in order to test expected use where
  // `componentDidUpdate` checks allow components relying on the same endpoint
  // to stay in sync. The default cache used by Fetch (i.e. `new Map`) is
  // unaware of state and not expected to keep components in sync.
  //
  // For example, the below implementation will not trigger a state change at
  // the cache level and thus never trigger `componentDidUpdate`:
  //
  // const Component = ({ url1 = "alpha", url2 = "alpha" }) => (
  //   <>
  //     <Fetch url={url1}>{children1}</Fetch>
  //     <Fetch url={url2}>{children2}</Fetch>
  //   </>
  // );
  //
  type Props = {
    url1?: string,
    url2?: string,
  };
  const Component = ({ url1, url2 }: Props) => (
    <Cache>
      <Cache.Consumer>
        {(cache) => (
          <>
            {/* $FlowIgnore */}
            <Fetch url={url1} cache={cache}>
              {children1}
            </Fetch>
            {/* $FlowIgnore */}
            <Fetch url={url2} cache={cache}>
              {children2}
            </Fetch>
          </>
        )}
      </Cache.Consumer>
    </Cache>
  );
  Component.defaultProps = {
    url1: "foo",
    url2: "foo",
  };

  const { rerender } = await render(<Component />);

  expect(renderProps1.pending).toBe(true);
  expect(renderProps2.pending).toBe(true);
  // $FlowIgnore
  await waitFor(() => expect(renderProps1.value.data).toBe("alpha"));
  // $FlowIgnore
  await waitFor(() => expect(renderProps2.value.data).toBe("alpha"));
  expect(fetch).toHaveBeenCalledTimes(1);

  // read should not trigger a refetch or a state change at the cache level
  renderProps1.read();
  expect(renderProps1.pending).toBe(true);
  expect(renderProps2.pending).toBe(false);
  // $FlowIgnore
  await waitFor(() => expect(renderProps1.value.data).toBe("alpha"));
  // $FlowIgnore
  await waitFor(() => expect(renderProps2.value.data).toBe("alpha"));
  expect(fetch).toHaveBeenCalledTimes(1);

  // refresh and invalidate should trigger both fetch states to update even if
  // the key already exists for the other fetch (see Fetch #componentDidUpdate)
  renderProps1.refresh();
  expect(renderProps1.pending).toBe(true);
  expect(renderProps2.pending).toBe(true);
  // $FlowIgnore
  await waitFor(() => expect(renderProps1.value.data).toBe("bravo"));
  // $FlowIgnore
  await waitFor(() => expect(renderProps2.value.data).toBe("bravo"));
  expect(fetch).toHaveBeenCalledTimes(2);

  renderProps2.refresh();
  expect(renderProps1.pending).toBe(true);
  expect(renderProps2.pending).toBe(true);
  // $FlowIgnore
  await waitFor(() => expect(renderProps1.value.data).toBe("charlie"));
  // $FlowIgnore
  await waitFor(() => expect(renderProps2.value.data).toBe("charlie"));
  expect(fetch).toHaveBeenCalledTimes(3);

  renderProps1.invalidate();
  expect(renderProps1.pending).toBe(true);
  expect(renderProps2.pending).toBe(true);
  // $FlowIgnore
  await waitFor(() => expect(renderProps1.value.data).toBe("delta"));
  // $FlowIgnore
  await waitFor(() => expect(renderProps2.value.data).toBe("delta"));
  expect(fetch).toHaveBeenCalledTimes(4);

  // changing the url of one fetch should not impact the other
  rerender(<Component url1="bar" />);
  expect(renderProps1.pending).toBe(true);
  expect(renderProps2.pending).toBe(false);
  // $FlowIgnore
  await waitFor(() => expect(renderProps1.value.data).toBe("echo"));
  // $FlowIgnore
  await waitFor(() => expect(renderProps2.value.data).toBe("delta"));
  expect(fetch).toHaveBeenCalledTimes(5);
});

test("<Fetch /> should set state to rejected for no-OK response", async () => {
  fetch.mockResponses([
    JSON.stringify("FAIL"),
    {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    },
  ]);

  let renderProps = {};
  const children = (arg) => {
    renderProps = { ...arg };
    return null;
  };
  const Component = () => <Fetch url="foo">{children}</Fetch>;
  await render(<Component />);

  expect(renderProps.pending).toBe(true);
  await waitFor(() => expect(renderProps.rejected).toBe(true));
});

test("<Fetch /> should refetch on stale cache hit", async () => {
  fetch.mockResponses(
    [
      JSON.stringify({ data: "alpha" }),
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      },
    ],
    [
      JSON.stringify({ data: "bravo" }),
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      },
    ]
  );

  const sleep = (time) =>
    new Promise((res) => {
      setTimeout(res, time);
    });

  let renderProps = {};
  const children = (arg) => {
    renderProps = { ...arg };
    return null;
  };
  const Component = () => (
    <Fetch url="quux" maxAge={1}>
      {children}
    </Fetch>
  );

  await render(<Component />);

  expect(fetch).toHaveBeenCalledTimes(1);

  await sleep(100);
  renderProps.read();
  expect(fetch).toHaveBeenCalledTimes(1);

  await sleep(1000);
  renderProps.read();
  expect(fetch).toHaveBeenCalledTimes(2);
});
