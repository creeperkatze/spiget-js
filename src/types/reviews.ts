import type { Author } from './authors.js';
import type { ResourceRating } from './resources.js';

/** A review left on a resource. */
export interface ResourceReview {
  /** The review's author. */
  author: Author;
  /** The rating given with this review. */
  rating: ResourceRating;
  /** Base64-encoded review message. */
  message: string;
  /** Base64-encoded message the resource author responded with. */
  responseMessage?: string;
  /** Version name the review was posted for. */
  version: string;
  /** Review timestamp. */
  date: number;
}
