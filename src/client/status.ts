import type { SpigetClientCore } from './core.js';
import type { ApiStatus } from '../types/index.js';

/** API namespace for the Spiget API's own status. */
export class StatusApi {
  constructor(private readonly core: SpigetClientCore) {}

  /** Returns the API status, including fetcher progress and entity counts. */
  async get(): Promise<ApiStatus> {
    return this.core.requestJson<ApiStatus>('status');
  }
}
