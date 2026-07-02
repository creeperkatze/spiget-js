import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { Resource, ResourceUpdate, ResourceVersion } from '../../src/types/index.js';

const MOCK_RESOURCE: Resource = {
  id: 9089,
  name: 'EssentialsX',
  tag: 'The essential plugin suite for Minecraft servers',
  contributors: 'md_5, KHR415',
  likes: 100,
  file: { type: '.jar', size: 1.2, sizeUnit: 'MB', url: 'resources/9089/download' },
  testedVersions: ['1.20.1', '1.20.2'],
  links: {},
  rating: { count: 10, average: 4.5 },
  releaseDate: 1500000000,
  updateDate: 1600000000,
  downloads: 1000000,
  external: false,
  icon: { url: '/resources/9089/icon' },
  premium: false,
  author: { id: 1 },
  category: { id: 5 },
  version: { id: 1, uuid: 'abc-123' },
};

describe('ResourcesApi', () => {
  it('lists resources', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_RESOURCE])]);
    const result = await client.resources.list({ size: 10, sort: '-downloads' });
    expect(result.data).toEqual([MOCK_RESOURCE]);
    expect(mockFetch.lastCall()?.url).toContain('sort=-downloads');
  });

  it('lists resources for a single version', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_RESOURCE])]);
    await client.resources.listForVersions('1.20.1', { method: 'any' });
    expect(mockFetch.lastCall()?.url).toContain('/resources/for/1.20.1');
    expect(mockFetch.lastCall()?.url).toContain('method=any');
  });

  it('lists resources for multiple versions, joined by commas', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_RESOURCE])]);
    await client.resources.listForVersions(['1.20.1', '1.20.2'], { method: 'all' });
    expect(mockFetch.lastCall()?.url).toContain('/resources/for/1.20.1,1.20.2');
  });

  it('lists free resources', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_RESOURCE])]);
    await client.resources.listFree();
    expect(mockFetch.lastCall()?.url).toContain('/resources/free');
  });

  it('lists new resources', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_RESOURCE])]);
    await client.resources.listNew();
    expect(mockFetch.lastCall()?.url).toContain('/resources/new');
  });

  it('lists premium resources', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_RESOURCE])]);
    await client.resources.listPremium();
    expect(mockFetch.lastCall()?.url).toContain('/resources/premium');
  });

  it('gets a single resource', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_RESOURCE)]);
    const resource = await client.resources.get(9089);
    expect(resource).toEqual(MOCK_RESOURCE);
    expect(mockFetch.lastCall()?.url).toContain('/resources/9089');
  });

  it('gets the author of a resource', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ id: 1, name: 'md_5', icon: { url: '' } })]);
    await client.resources.getAuthor(9089);
    expect(mockFetch.lastCall()?.url).toContain('/resources/9089/author');
  });

  it('builds a download URL without making a request', async () => {
    const { client, mockFetch } = createTestClient([]);
    const url = client.resources.getDownloadUrl(9089);
    expect(url).toBe('https://api.spiget.org/v2/resources/9089/download');
    expect(mockFetch.callCount()).toBe(0);
  });

  it('builds a version download URL without making a request', async () => {
    const { client, mockFetch } = createTestClient([]);
    const url = client.resources.getVersionDownloadUrl(9089, 'latest');
    expect(url).toBe('https://api.spiget.org/v2/resources/9089/versions/latest/download');
    expect(mockFetch.callCount()).toBe(0);
  });

  it('gets reviews of a resource', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([])]);
    await client.resources.getReviews(9089);
    expect(mockFetch.lastCall()?.url).toContain('/resources/9089/reviews');
  });

  it('gets updates of a resource', async () => {
    const updates = [{ id: 1 } as ResourceUpdate];
    const { client, mockFetch } = createTestClient([jsonResponse(updates)]);
    const result = await client.resources.getUpdates(9089);
    expect(result.data).toEqual(updates);
    expect(mockFetch.lastCall()?.url).toContain('/resources/9089/updates');
  });

  it('gets the latest update of a resource', async () => {
    const update: ResourceUpdate = { id: 1, resource: 9089, title: 'v2.0', description: 'SGVsbG8=', date: 1, likes: 0 };
    const { client, mockFetch } = createTestClient([jsonResponse(update)]);
    const result = await client.resources.getLatestUpdate(9089);
    expect(result).toEqual(update);
    expect(mockFetch.lastCall()?.url).toContain('/resources/9089/updates/latest');
  });

  it('gets versions of a resource', async () => {
    const versions = [{ id: 1 } as ResourceVersion];
    const { client, mockFetch } = createTestClient([jsonResponse(versions)]);
    const result = await client.resources.getVersions(9089);
    expect(result.data).toEqual(versions);
    expect(mockFetch.lastCall()?.url).toContain('/resources/9089/versions');
  });

  it('gets the latest version of a resource', async () => {
    const version: ResourceVersion = { id: 1, uuid: 'abc', name: 'v2.0', releaseDate: 1, downloads: 1, rating: { count: 0, average: 0 } };
    const { client, mockFetch } = createTestClient([jsonResponse(version)]);
    const result = await client.resources.getLatestVersion(9089);
    expect(result).toEqual(version);
    expect(mockFetch.lastCall()?.url).toContain('/resources/9089/versions/latest');
  });

  it('gets a specific version of a resource', async () => {
    const version: ResourceVersion = { id: 5, uuid: 'abc', name: 'v1.0', releaseDate: 1, downloads: 1, rating: { count: 0, average: 0 } };
    const { client, mockFetch } = createTestClient([jsonResponse(version)]);
    const result = await client.resources.getVersion(9089, 5);
    expect(result).toEqual(version);
    expect(mockFetch.lastCall()?.url).toContain('/resources/9089/versions/5');
  });

  it('searches resources', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse([MOCK_RESOURCE])]);
    const result = await client.resources.search('essentials', { field: 'name' });
    expect(result.data).toEqual([MOCK_RESOURCE]);
    expect(mockFetch.lastCall()?.url).toContain('/search/resources/essentials');
    expect(mockFetch.lastCall()?.url).toContain('field=name');
  });
});
