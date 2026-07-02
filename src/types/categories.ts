import type { ListOptions } from './base.js';

/** A category resources can be listed under. */
export interface Category {
  /** Category id. */
  id: number;
  /** Category name. */
  name: string;
}

/** Query parameters for {@link CategoriesApi.list}. */
export type GetCategoriesOptions = ListOptions;

/** Query parameters for {@link CategoriesApi.getResources}. */
export type GetCategoryResourcesOptions = ListOptions;
