/* @flow */

/* eslint-disable compat/compat */

import { cleanup } from "@testing-library/react";
import parseError from "../src/parseError";

afterEach(cleanup);

test("#parseError", async () => {
  const body = JSON.stringify({ message: "Whoops" });
  const init = {
    status: 404,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = new Response(body, init);
  const error = await parseError(res);
  expect(error.message).toBe(`HTTP 404 Not Found: ${body}`);
});
