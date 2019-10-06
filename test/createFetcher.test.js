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
        "Content-Type": "application/json"
      }
    }
  ]);
  const fetchState = await createFetcher()("/foo");
  expect(fetchState.pending).toBe(false);
  expect(fetchState.fulfilled).toBe(true);
  expect(fetchState.value).toEqual({ data: "ok" });
});

test("#createFetcher returns a fetcher that updates state on unsuccessful fetches", async () => {
  fetch.mockResponses([
    JSON.stringify({ message: "Whoops" }),
    {
      status: 500,
      headers: {
        "Content-Type": "text/plain"
      }
    }
  ]);
  const fetchState = await createFetcher()("/foo");
  expect(fetchState.pending).toBe(false);
  expect(fetchState.rejected).toBe(true);
});
