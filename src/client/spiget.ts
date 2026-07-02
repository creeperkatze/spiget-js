import { SpigetClientCore } from './core.js';
import { AuthorsApi } from './authors.js';
import { CategoriesApi } from './categories.js';
import { ResourcesApi } from './resources.js';
import { StatusApi } from './status.js';
import { WebhookApi } from './webhook.js';
import type { SpigetClientOptions } from '../types/base.js';

/**
 * Client for the Spiget API.
 * @example
 * ```ts
 * import SpigetClient from 'spiget-js';
 * const client = new SpigetClient();
 * const resource = await client.resources.get(9089);
 * ```
 */
export class SpigetClient {
  readonly #core: SpigetClientCore;

  readonly authors: AuthorsApi;
  readonly categories: CategoriesApi;
  readonly resources: ResourcesApi;
  readonly status: StatusApi;
  readonly webhook: WebhookApi;

  constructor(options: SpigetClientOptions = {}) {
    this.#core = new SpigetClientCore(options);

    this.authors = new AuthorsApi(this.#core);
    this.categories = new CategoriesApi(this.#core);
    this.resources = new ResourcesApi(this.#core);
    this.status = new StatusApi(this.#core);
    this.webhook = new WebhookApi(this.#core);
  }
}
