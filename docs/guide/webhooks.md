# Webhooks

Get notified about resource and author changes without polling the API.

## Available events

```ts
const events = await client.webhook.getEvents();
```

## Register a webhook

```ts
const { id, secret } = await client.webhook.register('https://example.com/hook', [
  'resource_new',
  'resource_update',
]);
```

> [!TIP]
> This form can be used to easily register a new webhook interactively: https://spiget.org/webhook/

Keep the `id` and `secret` returned here, you'll need both to manage the webhook afterwards.

## Check webhook status

```ts
const status = await client.webhook.getStatus(id);
console.log(status.failedConnections);
```

## Delete a webhook

```ts
await client.webhook.delete(id, secret);
```
