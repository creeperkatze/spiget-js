# Authors & Categories

## List and get authors

```ts
const { data: authors } = await client.authors.list({ size: 20 });
const author = await client.authors.get(12345);
```

> [!NOTE]
> The author list only includes members involved with resources, either being their author or having reviewed a resource.

## An author's resources and reviews

```ts
const { data: resources } = await client.authors.getResources(12345);
const { data: reviews } = await client.authors.getReviews(12345);
```

## Search authors

```ts
const { data: results } = await client.authors.search('inventive', { field: 'name' });
```

## List and get categories

```ts
const { data: categories } = await client.categories.list();
const category = await client.categories.get(5);
```

## A category's resources

```ts
const { data: resources } = await client.categories.getResources(5, { size: 20 });
```
