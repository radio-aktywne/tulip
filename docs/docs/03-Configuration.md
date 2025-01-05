---
slug: /config
title: Configuration
---

## Environment variables

You can configure the app at runtime using various environment variables:

- `TULIP__SERVER__HOST` -
  host to run the server on
  (default: `0.0.0.0`)
- `TULIP__SERVER__PORT` -
  port to run the server on
  (default: `10530`)
- `TULIP__COOKIES__DOMAIN` -
  domain for the cookies
  (default: ``)
- `TULIP__SECRETS__AUTH` -
  secrets for encrypting auth cookies
  (default: `secret`)
- `TULIP__URLS__PUBLIC` -
  public URL of the app
  (default: `http://localhost:10530`)
- `TULIP__BEAVER__HTTP__SCHEME`
  scheme of the HTTP API of the beaver service
  (default: `http`)
- `TULIP__BEAVER__HTTP__HOST`
  host of the HTTP API of the beaver service
  (default: `localhost`)
- `TULIP__BEAVER__HTTP__PORT`
  port of the HTTP API of the beaver service
  (default: `10500`)
- `TULIP__BEAVER__HTTP__PATH`
  path of the HTTP API of the beaver service
  (default: ``)
- `TULIP__SCORPION__PUBLIC__SCHEME` -
  scheme of the public API of the scorpion service
  (default: `http`)
- `TULIP__SCORPION__PUBLIC__HOST` -
  host of the public API of the scorpion service
  (default: `localhost`)
- `TULIP__SCORPION__PUBLIC__PORT` -
  port of the public API of the scorpion service
  (default: `20000`)
- `TULIP__SCORPION__PUBLIC__PATH` -
  path of the public API of the scorpion service
  (default: ``)
- `TULIP__SCORPION__PUBLIC__CLIENT` -
  client ID to authenticate with the public API of the scorpion service
  (default: `tulip`)
- `TULIP__SCORPION__PUBLIC__SECRET` -
  client secret to authenticate with the public API of the scorpion service
  (default: `secret`)
- `TULIP__DEBUG` -
  enable debug mode
  (default: `true`)
