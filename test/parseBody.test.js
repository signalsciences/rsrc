/* @flow */

/* eslint-disable compat/compat */

import { cleanup, waitFor } from "@testing-library/react";
import parseBody from "../src/parseBody";

afterEach(cleanup);

test("#parseBody 204 empty", async () => {
  const body = "Yeehaw";
  const init = {
    status: 204
  };
  const res = new Response(body, init);
  await waitFor(() => expect(parseBody(res)).resolves.toBe(null));
});

test("#parseBody no content-type", async () => {
  const body = "Yeehaw";
  const init = {
    headers: {
      "Content-Type": ""
    }
  };
  const res = new Response(body, init);
  await waitFor(() => expect(parseBody(res)).resolves.toBe(null));
});

test("#parseBody text", async () => {
  const body = "Yeehaw";
  const init = {
    headers: {
      "Content-Type": "text/plain"
    }
  };
  const res = new Response(body, init);
  await waitFor(() => expect(parseBody(res)).resolves.toEqual(body));
});

test("#parseBody json", async () => {
  const body = '{ "foo": "giddyup" }';
  const init = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const res = new Response(body, init);
  await waitFor(() =>
    expect(parseBody(res)).resolves.toEqual(JSON.parse(body))
  );
});

test("#parseBody other -> arraybuffer", async () => {
  const body = "<html><body></body></html>";
  const init = {
    headers: {
      "Content-Type": "something/else"
    }
  };
  const res = new Response(body, init);

  // NOTE: we are coercing to string to work around an issue where ArrayBuffer
  // instance types cannot be compared.
  //
  // https://github.com/facebook/jest/issues/7780
  //
  // expect(parseBody(res)).resolves.toBeInstanceOf(ArrayBuffer)
  //
  //   ● #parseBody other -> arraybuffer
  //
  // expect(received).resolves.toBeInstanceOf(expected)
  //
  // Expected constructor: ArrayBuffer
  // Received constructor: ArrayBuffer

  await waitFor(() =>
    expect(parseBody(res).then(p => p.toString())).resolves.toBe(
      "[object ArrayBuffer]"
    )
  );
});
