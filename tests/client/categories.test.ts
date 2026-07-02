import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { Category, Resource } from '../../src/types/index.js';

const MOCK_CATEGORY: Category = { id: 5, name: 'General' };

describe('CategoriesApi', () => {
  it('lists categories', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_CATEGORY])]);
    const result = await client.categories.list();
    expect(result.data).toEqual([MOCK_CATEGORY]);
    expect(mockFetch.lastCall()?.url).toContain('/categories');
  });

  it('gets a single category', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_CATEGORY)]);
    const category = await client.categories.get(5);
    expect(category).toEqual(MOCK_CATEGORY);
    expect(mockFetch.lastCall()?.url).toContain('/categories/5');
  });

  it('gets resources in a category', async () => {
    const resources = [{ id: 1 } as Resource];
    const { client, mockFetch } = createTestClient([jsonResponse(resources)]);
    const result = await client.categories.getResources(5, { size: 20 });
    expect(result.data).toEqual(resources);
    expect(mockFetch.lastCall()?.url).toContain('/categories/5/resources');
    expect(mockFetch.lastCall()?.url).toContain('size=20');
  });
});
