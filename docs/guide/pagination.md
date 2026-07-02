# Pagination

List endpoints accept `size`, `page`, `sort`, and `fields` query parameters and return a `SpigetPaginatedResponse`, combining the response body with pagination metadata read from the API's `X-Page-*` response headers.

```ts
const { data: resources, pagination } = await client.resources.list({
  size: 50,
  page: 1,
  sort: '-downloads',
});

console.log(pagination.index); // current page index
console.log(pagination.count); // total amount of pages
```

## Sorting

Prefix the `sort` field with `+` or `-` for ascending or descending order:

```ts
const { data } = await client.resources.list({ sort: '-downloads' });
```

## Selecting fields

Limit the fields returned per item with a comma-separated list, useful for reducing response size:

```ts
const { data } = await client.resources.list({ fields: 'id,name,downloads' });
```

## The `Pagination` shape

```ts
interface Pagination {
  sort: string | null;  // X-Page-Sort
  order: number | null;  // X-Page-Order
  size: number | null;  // X-Page-Size
  index: number | null;  // X-Page-Index
  count: number | null;  // X-Page-Count
}
```
