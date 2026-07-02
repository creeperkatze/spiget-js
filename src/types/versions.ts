import type { ResourceRating } from './resources.js';

/** A specific version of a resource. */
export interface ResourceVersion {
  /** Version id. */
  id: number;
  /** Version UUID. */
  uuid: string;
  /** Version name (e.g. `v1.0`). */
  name: string;
  /** Timestamp of the version's release date. */
  releaseDate: number;
  /** Amount of downloads. */
  downloads: number;
  /** The version's rating. */
  rating: ResourceRating;
}
