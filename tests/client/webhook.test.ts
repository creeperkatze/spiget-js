import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { WebhookRegistration, WebhookStatus } from '../../src/types/index.js';

describe('WebhookApi', () => {
  it('gets available webhook events', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ events: ['resource_new', 'resource_update'] })]);
    const events = await client.webhook.getEvents();
    expect(events).toEqual(['resource_new', 'resource_update']);
    expect(mockFetch.lastCall()?.url).toContain('/webhook/events');
  });

  it('registers a webhook using a form-urlencoded body', async () => {
    const registration: WebhookRegistration = { id: 'abc', secret: 'shh' };
    const { client, mockFetch } = createTestClient([jsonResponse(registration)]);
    const result = await client.webhook.register('https://example.com/hook', ['resource_new', 'resource_update']);
    expect(result).toEqual(registration);

    const call = mockFetch.lastCall()!;
    expect(call.method).toBe('POST');
    expect(call.headers.get('Content-Type')).toContain('application/x-www-form-urlencoded');

    const body = new URLSearchParams(await call.clone().text());
    expect(body.get('url')).toBe('https://example.com/hook');
    expect(body.getAll('events')).toEqual(['resource_new', 'resource_update']);
  });

  it('deletes a webhook', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(null)]);
    await client.webhook.delete('abc', 'shh');
    const call = mockFetch.lastCall()!;
    expect(call.method).toBe('DELETE');
    expect(call.url).toContain('/webhook/delete/abc/shh');
  });

  it('gets webhook status', async () => {
    const status: WebhookStatus = { status: 1, failedConnections: 0 };
    const { client, mockFetch } = createTestClient([jsonResponse(status)]);
    const result = await client.webhook.getStatus('abc');
    expect(result).toEqual(status);
    expect(mockFetch.lastCall()?.url).toContain('/webhook/status/abc');
  });
});
