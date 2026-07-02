# Getting Started

## Installation

::: code-group

```sh [npm]
npm install spiget-js
```

```sh [pnpm]
pnpm add spiget-js
```

```sh [yarn]
yarn add spiget-js
```

```sh [bun]
bun add spiget-js
```

:::

## Create a client

Spiget is a public API and does not require an API key.

```ts
import SpigetClient from 'spiget-js';

const client = new SpigetClient({
  userAgent: 'my-app/1.0',
});
```

## Fetch some data

```ts
const resource = await client.resources.get(9089);
const author = await client.resources.getAuthor(9089);
const { data: reviews } = await client.resources.getReviews(9089);
```

## Common options

```ts
const client = new SpigetClient({
  baseUrl: 'https://api.spiget.org/v2',
  timeoutMs: 10_000,
  userAgent: 'my-app/1.0',
});
```

## Where to go next

- See [Error Handling](/guide/error-handling) for catching and inspecting errors
- See [Resources](/guide/resources) for browsing, searching, and downloading resources
- See [Authors & Categories](/guide/authors) for browsing authors and categories
- See [Pagination](/guide/pagination) for reading pagination metadata from list responses
- See [API Reference](/api/) for the generated public API docs
