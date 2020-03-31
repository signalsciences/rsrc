/* @flow */

/* eslint-disable compat/compat */

import { cleanup, waitFor } from "@testing-library/react";
import checkStatus from "../src/checkStatus";

afterEach(cleanup);

test("#checkStatus ok", async () => {
  const body = "";
  const init = {
    ok: true,
    status: 200,
    statusText: "OK",
  };
  const res = new Response(body, init);
  await waitFor(() => expect(checkStatus(res)).resolves.toEqual(res));
});

/*
test('#checkStatus !ok', async () => {
  const body = ''
  const init = {
    ok: false,
    status: 404,
    statusText: 'NOT FOUND',
  }
  const res = new Response(body, init)
  await waitFor(() => expect(checkStatus(res)).rejects.toEqual(new Error(res.statusText)))
})
*/
