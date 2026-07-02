import { SpigetError } from '../errors.js';
import { buildApiUrl, extractErrorMessage, extractPagination, parseErrorBody, withJsonBody } from '../utils/request.js';
import type { SpigetClientOptions, SpigetPaginatedResponse } from '../types/base.js';

const DEFAULT_BASE_URL = 'https://api.spiget.org/v2';
const DEFAULT_TIMEOUT_MS = 10_000;

/** Options passed to individual request methods. */
export interface RequestOptions {
  query?: object;
  body?: BodyInit | object | object[] | null;
  method?: string;
  headers?: HeadersInit;
}

/** Low-level HTTP client used internally by all API namespace classes. */
export class SpigetClientCore {
  readonly #baseUrl: string;
  readonly #timeoutMs: number;
  readonly #userAgent: string | undefined;
  readonly #fetch: typeof globalThis.fetch;

  constructor(options: SpigetClientOptions = {}) {
    this.#baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
    this.#timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.#userAgent = options.userAgent;
    this.#fetch = options.fetch ?? globalThis.fetch;
  }

  /** Builds the absolute API URL for a given path and optional query parameters, without sending a request. */
  buildUrl(path: string, query?: object): string {
    return buildApiUrl(this.#baseUrl, path, query);
  }

  /** Sends a request and parses the response body as JSON. */
  async requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.#send(path, options);
    return response.json() as Promise<T>;
  }

  /** Sends a request and parses the response body as a JSON array, combined with pagination metadata read from the response headers. */
  async requestPaginated<T>(path: string, options: RequestOptions = {}): Promise<SpigetPaginatedResponse<T>> {
    const response = await this.#send(path, options);
    const data = (await response.json()) as T[];
    return { data, pagination: extractPagination(response.headers) };
  }

  /** Sends a request and discards the response body. */
  async requestVoid(path: string, options: RequestOptions = {}): Promise<void> {
    await this.#send(path, options);
  }

  async #send(path: string, options: RequestOptions): Promise<Response> {
    const { query, body, method = body != null ? 'POST' : 'GET', headers: extraHeaders } = options;

    const url = buildApiUrl(this.#baseUrl, path, query);
    const init = withJsonBody({ method, body, headers: new Headers(extraHeaders) });
    const headers = init.headers as Headers;

    headers.set('Accept', 'application/json');

    if (this.#userAgent) {
      headers.set('User-Agent', this.#userAgent);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.#timeoutMs);

    let response: Response;
    try {
      response = await this.#fetch(url, { ...init, signal: controller.signal });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw new SpigetError(`Request timed out after ${this.#timeoutMs}ms`);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) {
      const responseBody = await parseErrorBody(response);
      throw new SpigetError(extractErrorMessage(responseBody, response.status), {
        status: response.status,
        response,
        body: responseBody,
      });
    }

    return response;
  }
}
