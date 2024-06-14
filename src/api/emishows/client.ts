import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.WEBSHOWS__EMISHOWS__SCHEME || "http";
const host = process.env.WEBSHOWS__EMISHOWS__HOST || "localhost";
const port =
  process.env.WEBSHOWS__EMISHOWS__PORT === undefined
    ? 35000
    : process.env.WEBSHOWS__EMISHOWS__PORT;
const path = (process.env.WEBSHOWS__EMISHOWS__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const emishows = createClient<paths>({ baseUrl: url });
