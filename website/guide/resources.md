# Resources

Browse, search, and download resources (plugins).

## List resources

```ts
const { data: resources, pagination } = await client.resources.list({
  size: 20,
  sort: '-downloads',
});
```

`resources.listFree`, `resources.listNew`, and `resources.listPremium` work the same way, scoped to their respective subset.

## Resources for a Minecraft version

```ts
const compatible = await client.resources.listForVersions('1.20.1', { method: 'any' });

// Or match against multiple versions at once
const compatibleAll = await client.resources.listForVersions(['1.20.1', '1.20.2'], { method: 'all' });
```

## Get a resource

```ts
const resource = await client.resources.get(9089);
const author = await client.resources.getAuthor(9089);
```

## Search resources

```ts
const { data: results } = await client.resources.search('essentials', { field: 'name' });
```

## Download a resource

`resources.getDownloadUrl` and `resources.getVersionDownloadUrl` build the absolute URL that redirects to the file, without making a request. Open it directly, or fetch it and follow the redirect yourself.

```ts
const url = client.resources.getDownloadUrl(9089);
const latestVersionUrl = client.resources.getVersionDownloadUrl(9089, 'latest');
```

> [!NOTE]
> This redirects to Spiget's CDN for files hosted on SpigotMC.org, or to the URL of externally hosted resources. Check `resource.external` before downloading.
