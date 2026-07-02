import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { ApiStatus } from '../../src/types/index.js';

const MOCK_STATUS: ApiStatus = {
  status: { fetch: { start: 1, end: 2, active: false, page: { amount: 10, index: 0, item: { index: 0 } } } },
  stats: { resources: 1, authors: 1, categories: 1, resource_updates: 1, resource_versions: 1 },
};

describe('StatusApi', () => {
  it('gets the API status', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_STATUS)]);
    const status = await client.status.get();
    expect(status).toEqual(MOCK_STATUS);
    expect(mockFetch.lastCall()?.url).toContain('/status');
  });
});
