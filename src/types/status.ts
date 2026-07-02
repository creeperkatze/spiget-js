/** A single page of a fetch operation. */
export interface FetchStatusPageItem {
  /** Resource index on the current page. */
  index: number;
}

/** Paging progress of a fetch operation. */
export interface FetchStatusPage {
  /** Amount of pages to load. */
  amount: number;
  /** Current page index. */
  index: number;
  /** The item currently being processed. */
  item: FetchStatusPageItem;
}

/** Status of the fetcher that indexes SpigotMC data. */
export interface FetchStatus {
  /** Timestamp of the last fetcher start. */
  start: number;
  /** Timestamp of the last fetcher end (`0` if currently active). */
  end: number;
  /** Whether the fetcher is currently active. */
  active: boolean;
  /** Paging progress of the current/last fetch. */
  page: FetchStatusPage;
}

/** Status overview returned by {@link StatusApi.get}. */
export interface ApiStatusOverview {
  /** Status of the SpigotMC data fetcher. */
  fetch: FetchStatus;
}

/** API-wide entity counts. */
export interface ApiStats {
  /** Resource count. */
  resources: number;
  /** Author count. */
  authors: number;
  /** Category count. */
  categories: number;
  /** Resource update count. */
  resource_updates: number;
  /** Resource version count. */
  resource_versions: number;
}

/** Response of {@link StatusApi.get}. */
export interface ApiStatus {
  /** Status overview. */
  status: ApiStatusOverview;
  /** API stats. */
  stats: ApiStats;
}
