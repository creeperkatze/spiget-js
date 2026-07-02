# spiget-js

A framework-agnostic fully typed JavaScript client for the [Spiget API](https://spiget.org/).

[![NPM Version](https://img.shields.io/npm/v/spiget-js)](https://www.npmjs.com/package/spiget-js)
[![NPM Downloads](https://img.shields.io/npm/dt/spiget-js)](https://www.npmjs.com/package/spiget-js)
[![GitHub Branch Check Runs](https://img.shields.io/github/check-runs/creeperkatze/spiget-js/main)](https://github.com/creeperkatze/spiget-js/actions)
[![Codecov](https://img.shields.io/codecov/c/github/creeperkatze/spiget-js)](https://codecov.io/github/creeperkatze/spiget-js)
[![GitHub Issues](https://img.shields.io/github/issues/creeperkatze/spiget-js)](https://github.com/creeperkatze/spiget-js/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/creeperkatze/spiget-js)](https://github.com/creeperkatze/spiget-js/pulls)
[![GitHub Repo stars](https://img.shields.io/github/stars/creeperkatze/spiget-js?style=flat)](https://github.com/creeperkatze/spiget-js/stargazers)

[📚 Docs](https://spiget-js.creeperkatze.dev/) •
[🚀 Getting Started](https://spiget-js.creeperkatze.dev/guide/getting-started) •
[📖 API Reference](https://spiget-js.creeperkatze.dev/api) •
[📝 Changelog](https://github.com/creeperkatze/spiget-js/releases)

## 📦 Installation

```sh
npm install spiget-js
pnpm add spiget-js
yarn add spiget-js
bun add spiget-js
```

## 🚀 Usage

```ts
import SpigetClient from 'spiget-js';

const client = new SpigetClient({
  userAgent: 'my-app/1.0',
});

const resource = await client.resources.get(9089);
const { data: reviews } = await client.resources.getReviews(9089);

console.log(resource);
console.log(reviews);
```

## 📖 API

### `new SpigetClient(options)`

```ts
const client = new SpigetClient({
  baseUrl: 'https://api.spiget.org/v2',
  timeoutMs: 10_000,
  userAgent: 'my-app/1.0',
});
```

### Options

```ts
interface SpigetClientOptions {
  baseUrl?: string;   // default: "https://api.spiget.org/v2"
  timeoutMs?: number; // default: 10000
  userAgent?: string;
  fetch?: typeof globalThis.fetch;
}
```

### Selected Methods

Authors:
- `client.authors.list(options?)`
- `client.authors.get(authorId)`
- `client.authors.getResources(authorId, options?)`
- `client.authors.getReviews(authorId, options?)`
- `client.authors.search(query, options?)`

Categories:
- `client.categories.list(options?)`
- `client.categories.get(categoryId)`
- `client.categories.getResources(categoryId, options?)`

Resources:
- `client.resources.list(options?)`
- `client.resources.listForVersions(versions, options?)`
- `client.resources.listFree(options?)`
- `client.resources.listNew(options?)`
- `client.resources.listPremium(options?)`
- `client.resources.get(resourceId)`
- `client.resources.getAuthor(resourceId)`
- `client.resources.getDownloadUrl(resourceId)`
- `client.resources.getReviews(resourceId, options?)`
- `client.resources.getUpdates(resourceId, options?)`
- `client.resources.getLatestUpdate(resourceId)`
- `client.resources.getVersions(resourceId, options?)`
- `client.resources.getLatestVersion(resourceId)`
- `client.resources.getVersion(resourceId, versionId)`
- `client.resources.getVersionDownloadUrl(resourceId, versionId)`
- `client.resources.search(query, options?)`

Status:
- `client.status.get()`

Webhook:
- `client.webhook.getEvents()`
- `client.webhook.register(url, events)`
- `client.webhook.delete(id, secret)`
- `client.webhook.getStatus(id)`

## 🔐 Authentication

Spiget is a public API and does not require an API key or any other authentication.

## 📄 Pagination

List endpoints accept `size`, `page`, `sort`, and `fields` query parameters and return a `SpigetPaginatedResponse`, combining the response body with pagination metadata read from the API's `X-Page-*` response headers.

```ts
const { data: resources, pagination } = await client.resources.list({ size: 20, sort: '-downloads' });

console.log(pagination.index, pagination.count);
```

## 🌐 Custom Fetch

You can inject your own `fetch` implementation.

```ts
import SpigetClient from 'spiget-js';
import fetch from 'node-fetch';

const client = new SpigetClient({
  fetch,
});
```

## ⚠️ Error Handling

All request, timeout, and API errors are thrown as `SpigetError`.

```ts
import SpigetClient, { SpigetError } from 'spiget-js';

const client = new SpigetClient();

try {
  await client.resources.get(0);
} catch (error) {
  if (error instanceof SpigetError) {
    console.error(error.status);
    console.error(error.message);
    console.error(error.body);
  }
}
```

## 👨‍💻 Development

```sh
pnpm build

pnpm test
```

## 🤝 Contributing

Contributions are always welcome!

Please ensure you run `pnpm lint:fix` before opening a pull request.

## 📜 License

AGPL-3.0
