# Custom Fetch

## Injecting a fetch implementation

You can provide your own `fetch` for non-standard runtimes or to add middleware such as logging or retry logic.

```ts
import SpigetClient from 'spiget-js';
import fetch from 'node-fetch';

const client = new SpigetClient({
  fetch,
});
```

## User-Agent

Set a custom `User-Agent` once at client creation time:

```ts
const client = new SpigetClient({
  userAgent: 'my-dashboard/1.0',
});
```

The value is sent on every request made by that client instance.

## Timeout

The default request timeout is 10 000 ms. Override it with `timeoutMs`:

```ts
const client = new SpigetClient({
  timeoutMs: 30_000,
});
```

A timed-out request throws a `SpigetError` with `status: 0`.

## Base URL

The default base URL is `https://api.spiget.org/v2`. Override it to point at a proxy or gateway:

```ts
const client = new SpigetClient({
  baseUrl: 'https://my-proxy.example.com',
});
```
