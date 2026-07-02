# Reviews, Updates & Versions

## Reviews

```ts
const { data: reviews } = await client.resources.getReviews(9089);

for (const review of reviews) {
  console.log(review.author.name, review.rating.average);
}
```

`message` and `responseMessage` are base64-encoded, decode them before displaying:

```ts
const message = Buffer.from(review.message, 'base64').toString('utf-8');
```

## Updates

```ts
const { data: updates } = await client.resources.getUpdates(9089);
const latest = await client.resources.getLatestUpdate(9089);
```

`description` is also base64-encoded, same as review messages above.

## Versions

```ts
const { data: versions } = await client.resources.getVersions(9089);
const latest = await client.resources.getLatestVersion(9089);
const version = await client.resources.getVersion(9089, latest.id);
```

Download a specific version:

```ts
const url = client.resources.getVersionDownloadUrl(9089, latest.id);
```
