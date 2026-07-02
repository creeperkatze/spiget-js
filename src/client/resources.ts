import type { SpigetClientCore } from './core.js';
import type {
  Author,
  GetResourcesForVersionsOptions,
  GetResourcesOptions,
  ListOptions,
  Resource,
  ResourceReview,
  ResourceUpdate,
  ResourceVersion,
  SearchResourcesOptions,
  SpigetPaginatedResponse,
} from '../types/index.js';

/** API namespace for resources (plugins). */
export class ResourcesApi {
  constructor(private readonly core: SpigetClientCore) {}

  /** Returns a list of available resources (premium and free). */
  async list(options?: GetResourcesOptions): Promise<SpigetPaginatedResponse<Resource>> {
    return this.core.requestPaginated<Resource>('resources', { query: options });
  }

  /** Returns resources for the specified Minecraft version(s). */
  async listForVersions(
    versions: string | string[],
    options?: GetResourcesForVersionsOptions,
  ): Promise<SpigetPaginatedResponse<Resource>> {
    const versionParam = (Array.isArray(versions) ? versions : [versions]).map(encodeURIComponent).join(',');
    return this.core.requestPaginated<Resource>(`resources/for/${versionParam}`, { query: options });
  }

  /** Returns a list of available free resources. */
  async listFree(options?: ListOptions): Promise<SpigetPaginatedResponse<Resource>> {
    return this.core.requestPaginated<Resource>('resources/free', { query: options });
  }

  /** Returns all new resources. */
  async listNew(options?: ListOptions): Promise<SpigetPaginatedResponse<Resource>> {
    return this.core.requestPaginated<Resource>('resources/new', { query: options });
  }

  /** Returns a list of available premium resources. */
  async listPremium(options?: ListOptions): Promise<SpigetPaginatedResponse<Resource>> {
    return this.core.requestPaginated<Resource>('resources/premium', { query: options });
  }

  /** Returns a resource by its id. */
  async get(resourceId: number): Promise<Resource> {
    return this.core.requestJson<Resource>(`resources/${resourceId}`);
  }

  /** Returns the author of a resource. */
  async getAuthor(resourceId: number): Promise<Author> {
    return this.core.requestJson<Author>(`resources/${resourceId}/author`);
  }

  /**
   * Returns the absolute URL that downloads a resource.
   * @remarks Requesting this URL redirects to Spiget's CDN (`cdn.spiget.org`) for files hosted on SpigotMC.org, or to the URL of externally hosted resources. Check {@link Resource.external} before downloading.
   */
  getDownloadUrl(resourceId: number): string {
    return this.core.buildUrl(`resources/${resourceId}/download`);
  }

  /** Returns reviews of a resource. */
  async getReviews(resourceId: number, options?: ListOptions): Promise<SpigetPaginatedResponse<ResourceReview>> {
    return this.core.requestPaginated<ResourceReview>(`resources/${resourceId}/reviews`, { query: options });
  }

  /** Returns updates of a resource. */
  async getUpdates(resourceId: number, options?: ListOptions): Promise<SpigetPaginatedResponse<ResourceUpdate>> {
    return this.core.requestPaginated<ResourceUpdate>(`resources/${resourceId}/updates`, { query: options });
  }

  /** Returns the latest update of a resource. */
  async getLatestUpdate(resourceId: number): Promise<ResourceUpdate> {
    return this.core.requestJson<ResourceUpdate>(`resources/${resourceId}/updates/latest`);
  }

  /** Returns versions of a resource. */
  async getVersions(resourceId: number, options?: ListOptions): Promise<SpigetPaginatedResponse<ResourceVersion>> {
    return this.core.requestPaginated<ResourceVersion>(`resources/${resourceId}/versions`, { query: options });
  }

  /** Returns the latest version of a resource. */
  async getLatestVersion(resourceId: number): Promise<ResourceVersion> {
    return this.core.requestJson<ResourceVersion>(`resources/${resourceId}/versions/latest`);
  }

  /** Returns a specific version of a resource by its id. */
  async getVersion(resourceId: number, versionId: number): Promise<ResourceVersion> {
    return this.core.requestJson<ResourceVersion>(`resources/${resourceId}/versions/${versionId}`);
  }

  /**
   * Returns the absolute URL that downloads a specific version of a resource.
   * @remarks This only redirects to the stored download location and might not download a file (e.g. for external resources).
   */
  getVersionDownloadUrl(resourceId: number, versionId: number | 'latest'): string {
    return this.core.buildUrl(`resources/${resourceId}/versions/${versionId}/download`);
  }

  /** Searches resources by name or tag. */
  async search(query: string, options?: SearchResourcesOptions): Promise<SpigetPaginatedResponse<Resource>> {
    return this.core.requestPaginated<Resource>(`search/resources/${encodeURIComponent(query)}`, { query: options });
  }
}
