import type { Icon } from './common.js';
import type { ListOptions } from './base.js';

/** An author of one or more resources, or a reviewer of resources. */
export interface Author {
  /** Id of the author. */
  id: number;
  /** Author name. */
  name: string;
  /** The author's avatar. */
  icon: Icon;
}

/** Query parameters for {@link AuthorsApi.list}. */
export type GetAuthorsOptions = ListOptions;

/** Query parameters for {@link AuthorsApi.getResources}. */
export type GetAuthorResourcesOptions = ListOptions;

/** Query parameters for {@link AuthorsApi.getReviews}. */
export type GetAuthorReviewsOptions = ListOptions;

/** Query parameters for {@link AuthorsApi.search}. */
export interface SearchAuthorsOptions extends ListOptions {
  /** Field to search in. */
  field?: 'name';
}
