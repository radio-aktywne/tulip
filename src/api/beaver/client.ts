import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.TULIP__BEAVER__SCHEME || "http";
const host = process.env.TULIP__BEAVER__HOST || "localhost";
const port =
  process.env.TULIP__BEAVER__PORT === undefined
    ? 35000
    : process.env.TULIP__BEAVER__PORT;
const path = (process.env.TULIP__BEAVER__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const beaver = createClient<paths>({ baseUrl: url });
