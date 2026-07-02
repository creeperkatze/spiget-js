import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { createMockFetch, jsonResponse, errorResponse } from '../utils/http.js';
import { SpigetError } from '../../src/errors.js';
import { SpigetClient } from '../../src/client/spiget.js';

describe('SpigetClientCore', () => {
  it('sends a custom User-Agent header when configured', async () => {
    const mockFetch = createMockFetch([jsonResponse([])]);
    const client = new SpigetClient({
      baseUrl: 'https://api.spiget.org/v2',
      userAgent: 'my-app/1.0',
      fetch: mockFetch as unknown as typeof fetch,
    });
    await client.categories.list();
    expect(mockFetch.lastCall()?.headers.get('User-Agent')).toBe('my-app/1.0');
  });

  it('parses pagination metadata from response headers', async () => {
    const { client, mockFetch } = createTestClient([
      jsonResponse([], 200, {
        'X-Page-Sort': 'name',
        'X-Page-Order': '1',
        'X-Page-Size': '10',
        'X-Page-Index': '0',
        'X-Page-Count': '5',
      }),
    ]);
    const result = await client.categories.list();
    expect(result.pagination).toEqual({ sort: 'name', order: 1, size: 10, index: 0, count: 5 });
    expect(mockFetch.callCount()).toBe(1);
  });

  it('throws SpigetError on non-ok response', async () => {
    const { client } = createTestClient([errorResponse(500)]);
    await expect(client.categories.list()).rejects.toThrow(SpigetError);
  });

  it('throws SpigetError with message from response body', async () => {
    const { client } = createTestClient([errorResponse(404, { message: 'Not found' })]);
    try {
      await client.categories.get(1);
      expect.unreachable();
    } catch (err) {
      expect(err).toBeInstanceOf(SpigetError);
      expect((err as SpigetError).message).toBe('Not found');
      expect((err as SpigetError).status).toBe(404);
    }
  });

  it('throws SpigetError with a message from a plain string error field', async () => {
    const { client } = createTestClient([errorResponse(400, { error: 'Invalid request' })]);
    try {
      await client.webhook.register('https://example.com', ['test']);
      expect.unreachable();
    } catch (err) {
      expect(err).toBeInstanceOf(SpigetError);
      expect((err as SpigetError).message).toBe('Invalid request');
      expect((err as SpigetError).status).toBe(400);
    }
  });
});
