import type { SpigetClientCore } from './core.js';
import type {
  Author,
  GetAuthorReviewsOptions,
  GetAuthorResourcesOptions,
  GetAuthorsOptions,
  Resource,
  ResourceReview,
  SearchAuthorsOptions,
  SpigetPaginatedResponse,
} from '../types/index.js';

/** API namespace for authors. */
export class AuthorsApi {
  constructor(private readonly core: SpigetClientCore) {}

  /**
   * Returns a list of available authors.
   * @remarks Only includes members involved with resources, either being their author or having reviewed a resource.
   */
  async list(options?: GetAuthorsOptions): Promise<SpigetPaginatedResponse<Author>> {
    return this.core.requestPaginated<Author>('authors', { query: options });
  }

  /** Returns details about an author. */
  async get(authorId: number): Promise<Author> {
    return this.core.requestJson<Author>(`authors/${authorId}`);
  }

  /** Returns an author's resources. */
  async getResources(authorId: number, options?: GetAuthorResourcesOptions): Promise<SpigetPaginatedResponse<Resource>> {
    return this.core.requestPaginated<Resource>(`authors/${authorId}/resources`, { query: options });
  }

  /** Returns an author's reviews left on resources. */
  async getReviews(authorId: number, options?: GetAuthorReviewsOptions): Promise<SpigetPaginatedResponse<ResourceReview>> {
    return this.core.requestPaginated<ResourceReview>(`authors/${authorId}/reviews`, { query: options });
  }

  /** Searches authors. */
  async search(query: string, options?: SearchAuthorsOptions): Promise<SpigetPaginatedResponse<Author>> {
    return this.core.requestPaginated<Author>(`search/authors/${encodeURIComponent(query)}`, { query: options });
  }
}
