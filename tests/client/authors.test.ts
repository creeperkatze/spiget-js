import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { Author, Resource, ResourceReview } from '../../src/types/index.js';

const MOCK_AUTHOR: Author = {
  id: 12345,
  name: 'inventivetalent',
  icon: { url: '/authors/12345/icon' },
};

describe('AuthorsApi', () => {
  it('lists authors', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_AUTHOR])]);
    const result = await client.authors.list({ size: 10 });
    expect(result.data).toEqual([MOCK_AUTHOR]);
    expect(mockFetch.lastCall()?.url).toContain('/authors?size=10');
  });

  it('gets a single author', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_AUTHOR)]);
    const author = await client.authors.get(12345);
    expect(author).toEqual(MOCK_AUTHOR);
    expect(mockFetch.lastCall()?.url).toContain('/authors/12345');
  });

  it('gets an author\'s resources', async () => {
    const resources = [{ id: 1 } as Resource];
    const { client, mockFetch } = createTestClient([jsonResponse(resources)]);
    const result = await client.authors.getResources(12345);
    expect(result.data).toEqual(resources);
    expect(mockFetch.lastCall()?.url).toContain('/authors/12345/resources');
  });

  it('gets an author\'s reviews', async () => {
    const reviews = [{ message: 'R29vZA==' } as ResourceReview];
    const { client, mockFetch } = createTestClient([jsonResponse(reviews)]);
    const result = await client.authors.getReviews(12345);
    expect(result.data).toEqual(reviews);
    expect(mockFetch.lastCall()?.url).toContain('/authors/12345/reviews');
  });

  it('searches authors', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_AUTHOR])]);
    const result = await client.authors.search('inventive', { field: 'name' });
    expect(result.data).toEqual([MOCK_AUTHOR]);
    expect(mockFetch.lastCall()?.url).toContain('/search/authors/inventive');
    expect(mockFetch.lastCall()?.url).toContain('field=name');
  });
});
