# Error Handling

All request failures (network errors, timeouts, and API errors) throw a `SpigetError`.

## Catching errors

```ts
import SpigetClient, { SpigetError } from 'spiget-js';

try {
  await client.resources.get(0);
} catch (err) {
  if (err instanceof SpigetError) {
    console.error(err.status, err.message);
  }
}
```

## SpigetError properties

| Property | Type | Description |
|---|---|---|
| `message` | `string` | Human-readable description |
| `status` | `number` | HTTP status code, or `0` for network/timeout errors |
| `body` | `unknown` | Raw response body if available |
| `response` | `Response \| undefined` | The raw fetch `Response` if available |

## Common status codes

- `404` - the requested resource does not exist
- `400` - invalid request (e.g. registering a webhook with a malformed body)
- `0` - the request never reached the server (network error, timeout, DNS failure)

## Distinguishing error types

```ts
try {
  await client.resources.search('essentials');
} catch (err) {
  if (!(err instanceof SpigetError)) throw err; // re-throw unexpected errors

  if (err.status === 0) {
    // Network or timeout - the Spiget API may be unreachable
  } else if (err.status === 404) {
    // Not found
  } else {
    // API error - inspect err.body for details
  }
}
```
