import type { SpigetClientCore } from './core.js';
import type {
  Category,
  GetCategoriesOptions,
  GetCategoryResourcesOptions,
  Resource,
  SpigetPaginatedResponse,
} from '../types/index.js';

/** API namespace for resource categories. */
export class CategoriesApi {
  constructor(private readonly core: SpigetClientCore) {}

  /** Returns a list of categories. */
  async list(options?: GetCategoriesOptions): Promise<SpigetPaginatedResponse<Category>> {
    return this.core.requestPaginated<Category>('categories', { query: options });
  }

  /** Returns details about a category. */
  async get(categoryId: number): Promise<Category> {
    return this.core.requestJson<Category>(`categories/${categoryId}`);
  }

  /** Returns the resources in a category. */
  async getResources(categoryId: number, options?: GetCategoryResourcesOptions): Promise<SpigetPaginatedResponse<Resource>> {
    return this.core.requestPaginated<Resource>(`categories/${categoryId}/resources`, { query: options });
  }
}
