import { SpigetClient } from '../../src/client/spiget.js';
import { createMockFetch } from './http.js';

export function createTestClient(responses: Response[] = []) {
  const mockFetch = createMockFetch(responses);
  const client = new SpigetClient({
    baseUrl: 'https://api.spiget.org/v2',
    fetch: mockFetch as unknown as typeof fetch,
  });
  return { client, mockFetch };
}
