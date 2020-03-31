/* @flow */

import { cleanup } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import createFetcher from "../src/createFetcher";

afterEach(cleanup);

test("#createFetcher returns a fetcher that updates state on successful fetches", async () => {
  fetch.mockResponses([
    JSON.stringify({ data: "ok" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  ]);
  const value = await createFetcher()("/foo");
  expect(value).toEqual({ data: "ok" });
});

test("#createFetcher returns a fetcher that updates state on unsuccessful fetches", async () => {
  const error = new Error(
    'HTTP 500 Internal Server Error: "{\\"message\\":\\"Whoops\\"}"'
  );
  fetch.mockResponses([
    JSON.stringify({ message: "Whoops" }),
    {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    },
  ]);
  expect(createFetcher()("/foo")).rejects.toEqual(error);
});
