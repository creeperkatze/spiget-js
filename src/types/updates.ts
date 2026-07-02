/** An update posted for a resource. */
export interface ResourceUpdate {
  /** Update id. */
  id: number;
  /** Resource id. */
  resource: number;
  /** Update title. */
  title: string;
  /** Base64-encoded description of the update. */
  description: string;
  /** Update timestamp. */
  date: number;
  /** Amount of likes for this update. */
  likes: number;
}
