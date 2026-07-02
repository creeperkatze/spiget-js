import { describe, it, expect } from 'vitest';
import { appendQuery, buildApiUrl, extractErrorMessage, extractPagination, normalizeBaseUrl } from '../../src/utils/request.js';

describe('normalizeBaseUrl', () => {
  it('strips trailing slashes', () => {
    expect(normalizeBaseUrl('https://api.spiget.org/v2/')).toBe('https://api.spiget.org/v2');
  });

  it('leaves plain base URL unchanged', () => {
    expect(normalizeBaseUrl('https://api.spiget.org/v2')).toBe('https://api.spiget.org/v2');
  });

  it('throws on empty string', () => {
    expect(() => normalizeBaseUrl('')).toThrow(TypeError);
  });
});

describe('buildApiUrl', () => {
  it('constructs a URL for a path', () => {
    const url = buildApiUrl('https://api.spiget.org/v2', 'resources');
    expect(url).toBe('https://api.spiget.org/v2/resources');
  });

  it('appends query parameters', () => {
    const url = buildApiUrl('https://api.spiget.org/v2', 'resources', { size: 10, page: 0 });
    expect(url).toContain('size=10');
    expect(url).toContain('page=0');
  });

  it('skips null and undefined query values', () => {
    const url = buildApiUrl('https://api.spiget.org/v2', 'resources', { size: null, page: undefined });
    expect(url).not.toContain('size');
    expect(url).not.toContain('page');
  });
});

describe('appendQuery', () => {
  it('handles array values', () => {
    const url = new URL('https://example.com/test');
    appendQuery(url, { tags: ['a', 'b'] });
    expect(url.searchParams.getAll('tags')).toEqual(['a', 'b']);
  });
});

describe('extractErrorMessage', () => {
  it('reads a top-level message field', () => {
    expect(extractErrorMessage({ message: 'Forbidden' }, 403)).toBe('Forbidden');
  });

  it('reads a nested error.message field', () => {
    expect(extractErrorMessage({ error: { message: 'Not found' } }, 404)).toBe('Not found');
  });

  it('reads a plain string error field', () => {
    expect(extractErrorMessage({ error: 'Invalid request' }, 400)).toBe('Invalid request');
  });

  it('falls back to the status code', () => {
    expect(extractErrorMessage(null, 500)).toBe('HTTP 500');
  });
});

describe('extractPagination', () => {
  it('reads pagination fields from headers', () => {
    const headers = new Headers({
      'X-Page-Sort': 'name',
      'X-Page-Order': '-1',
      'X-Page-Size': '50',
      'X-Page-Index': '2',
      'X-Page-Count': '7',
    });
    expect(extractPagination(headers)).toEqual({ sort: 'name', order: -1, size: 50, index: 2, count: 7 });
  });

  it('returns nulls for missing headers', () => {
    expect(extractPagination(new Headers())).toEqual({ sort: null, order: null, size: null, index: null, count: null });
  });
});
