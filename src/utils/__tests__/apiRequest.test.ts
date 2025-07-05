import assert from 'node:assert';
import { afterEach, describe, it, mock } from 'node:test';
import {
  parseGetStatus,
  parseResponseError,
} from '../../client/responseParsers';
import { makeApiRequest } from '../apiRequest';

describe('makeApiRequest', () => {
  afterEach(() => {
    mock.restoreAll();
  });

  const mockUrl = 'https://api.example.com/endpoint';
  const mockAuth = 'base64-encoded-auth';
  const errorXmlResponse =
    '<reportResponse><responseCode>1000</responseCode><responseDescription>Server Error</responseDescription></reportResponse>';
  const successXmlResponse =
    '<reportResponse><responseCode>0</responseCode><responseDescription>OK</responseDescription></reportResponse>';
  const requestId = 'abc-123-xyz';
  const parsers = {
    response: parseGetStatus,
    error: parseResponseError,
  };

  it('should make a successful request with correct headers', async () => {
    // Mock fetch
    const mockFetch = mock.method(globalThis, 'fetch', () =>
      Promise.resolve({
        ok: true,
        headers: new Headers({ 'Request-ID': requestId }),
        text: () => Promise.resolve(successXmlResponse),
      }),
    );

    const result = await makeApiRequest(mockUrl, mockAuth, parsers);

    // Verify fetch was called with correct parameters
    assert.strictEqual(mockFetch.mock.calls.length, 1);
    assert.strictEqual(mockFetch.mock.calls[0]?.arguments[0], mockUrl);
    assert.deepStrictEqual(mockFetch.mock.calls[0]?.arguments[1], {
      headers: {
        Authorization: `Basic ${mockAuth}`,
      },
    });

    // Verify the returned data
    assert.deepStrictEqual(result, {
      data: { responseCode: 0, responseDescription: 'OK' },
      requestId: requestId,
    });
  });

  it('should handle missing Request-ID header', async () => {
    mock.method(globalThis, 'fetch', () =>
      Promise.resolve({
        ok: true,
        headers: new Headers({}),
        text: () => Promise.resolve(successXmlResponse),
      }),
    );

    const result = await makeApiRequest(mockUrl, mockAuth, parsers);

    assert.strictEqual(result.requestId, 'unknown');
  });

  it('should merge custom fetch options with defaults', async () => {
    const customOptions: RequestInit = {
      method: 'POST',
      body: 'test-body',
      headers: {
        'Content-Type': 'application/xml',
      },
    };

    const mockFetch = mock.method(globalThis, 'fetch', () =>
      Promise.resolve({
        ok: true,
        headers: new Headers({}),
        text: () => Promise.resolve(successXmlResponse),
      }),
    );

    await makeApiRequest(mockUrl, mockAuth, parsers, customOptions);

    assert.strictEqual(mockFetch.mock.calls.length, 1);
    assert.strictEqual(mockFetch.mock.calls[0]?.arguments[0], mockUrl);
    assert.deepStrictEqual(mockFetch.mock.calls[0]?.arguments[1], {
      method: 'POST',
      body: 'test-body',
      headers: {
        'Content-Type': 'application/xml',
        Authorization: `Basic ${mockAuth}`,
      },
    });
  });

  it('should handle error responses with parsed error data', async () => {
    mock.method(globalThis, 'fetch', () =>
      Promise.resolve({
        ok: false,
        status: 500,
        headers: new Headers({ 'Request-ID': requestId }),
        text: () => Promise.resolve(errorXmlResponse),
      }),
    );

    await assert.rejects(makeApiRequest(mockUrl, mockAuth, parsers), {
      message: `Request failed with http status 500 - ServerError (Request-ID: ${requestId})`,
    });
  });

  it('should handle error responses with unparseable error data', async () => {
    mock.method(globalThis, 'fetch', () =>
      Promise.resolve({
        ok: false,
        status: 500,
        headers: new Headers({ 'Request-ID': requestId }),
        text: () => Promise.resolve('Invalid XML'),
      }),
    );

    await assert.rejects(makeApiRequest(mockUrl, mockAuth, parsers), {
      message: `Request failed with http status 500 (Request-ID: ${requestId})`,
    });
  });

  it('should handle network errors', async () => {
    mock.method(globalThis, 'fetch', () =>
      Promise.reject(new Error('Network error')),
    );

    await assert.rejects(makeApiRequest(mockUrl, mockAuth, parsers), {
      message: 'Network error',
    });
  });

  it('should handle error responses with known response codes', async () => {
    mock.method(globalThis, 'fetch', () =>
      Promise.resolve({
        ok: false,
        status: 500,
        headers: new Headers({ 'Request-ID': requestId }),
        text: () => Promise.resolve(errorXmlResponse),
      }),
    );

    await assert.rejects(makeApiRequest(mockUrl, mockAuth, parsers), {
      message: `Request failed with http status 500 - ServerError (Request-ID: ${requestId})`,
    });
  });

  it.only('should handle error responses with unknown response codes', async () => {
    mock.method(globalThis, 'fetch', () =>
      Promise.resolve({
        ok: false,
        status: 500,
        headers: new Headers({ 'Request-ID': requestId }),
        text: () =>
          Promise.resolve(
            '<reportResponse><responseCode>6969</responseCode><responseDescription>IDK what this is</responseDescription></reportResponse>',
          ),
      }),
    );

    await assert.rejects(makeApiRequest(mockUrl, mockAuth, parsers), {
      message: `Request failed with http status 500 (6969: IDK what this is) (Request-ID: ${requestId})`,
    });
  });
});
