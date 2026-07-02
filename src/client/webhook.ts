import type { SpigetClientCore } from './core.js';
import type { WebhookRegistration, WebhookStatus } from '../types/index.js';

/** API namespace for webhooks. */
export class WebhookApi {
  constructor(private readonly core: SpigetClientCore) {}

  /** Returns a list of available webhook events. */
  async getEvents(): Promise<string[]> {
    const response = await this.core.requestJson<{ events: string[] }>('webhook/events');
    return response.events;
  }

  /**
   * Registers a new webhook.
   * @remarks This form can be used to easily register a new one: https://spiget.org/webhook/
   */
  async register(url: string, events: string[]): Promise<WebhookRegistration> {
    const body = new URLSearchParams();
    body.set('url', url);
    for (const event of events) body.append('events', event);

    return this.core.requestJson<WebhookRegistration>('webhook/register', { method: 'POST', body });
  }

  /** Deletes a webhook. */
  async delete(id: string, secret: string): Promise<void> {
    await this.core.requestVoid(`webhook/delete/${encodeURIComponent(id)}/${encodeURIComponent(secret)}`, {
      method: 'DELETE',
    });
  }

  /** Returns the status of a webhook. */
  async getStatus(id: string): Promise<WebhookStatus> {
    return this.core.requestJson<WebhookStatus>(`webhook/status/${encodeURIComponent(id)}`);
  }
}
