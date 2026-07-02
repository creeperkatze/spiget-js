/** A value that can be serialized as a URL query parameter. */
export type QueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>;

/** Pagination metadata read from a paginated Spiget endpoint's `X-Page-*` response headers. */
export interface Pagination {
  /** Field the elements are sorted by (`X-Page-Sort`). */
  sort: string | null;
  /** Sort order (`X-Page-Order`). */
  order: number | null;
  /** Number of elements on the current page (`X-Page-Size`). */
  size: number | null;
  /** Current page index (`X-Page-Index`). */
  index: number | null;
  /** Total amount of pages (`X-Page-Count`). */
  count: number | null;
}

/** Envelope returned by paginated Spiget endpoints, combining the array body with header-derived pagination metadata. */
export interface SpigetPaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

/** Common query parameters accepted by list endpoints. */
export interface ListOptions {
  /** Size of the returned array. */
  size?: number;
  /** Page index. */
  page?: number;
  /** Field to sort by. Use a `+`/`-` prefix for ascending/descending order. */
  sort?: string;
  /** Fields to return, separated by commas. */
  fields?: string;
}

/** Options for creating a {@link SpigetClient}. */
export interface SpigetClientOptions {
  /**
   * Base URL of the Spiget API.
   * @defaultValue "https://api.spiget.org/v2"
   */
  baseUrl?: string;
  /**
   * Request timeout in milliseconds.
   * @defaultValue 10000
   */
  timeoutMs?: number;
  /** Value to send as the `User-Agent` header on every request. */
  userAgent?: string;
  /** Custom fetch implementation. */
  fetch?: typeof globalThis.fetch;
}
