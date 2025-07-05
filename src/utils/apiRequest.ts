import { ResponseCode } from '../types';

/**
 * Generic API request handler with authentication and status code handling
 */
export async function makeApiRequest<T>(
  url: string,
  auth: string,
  parser: {
    response: (xmlData: string) => T;
    error: (xmlError: string) => {
      responseCode: number;
      responseDescription: string;
    };
  },
  fetchOptions: RequestInit = {},
): Promise<{ data: T; requestId: string }> {
  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      Authorization: `Basic ${auth}`,
      ...fetchOptions.headers,
    },
  });

  const requestId = response.headers.get('Request-ID') || 'unknown';

  if (!response.ok) {
    let errorMessage = `Request failed with http status ${response.status}`;

    try {
      const errorResponse = await response.text();
      const errorData = parser.error(errorResponse);
      if (errorData) {
        const resolved = ResponseCode[errorData.responseCode];
        if (resolved) {
          errorMessage += ` - ${ResponseCode[errorData.responseCode]}`;
        } else {
          errorMessage += ` (${errorData.responseCode}: ${errorData.responseDescription})`;
        }
      }
    } catch (_e) {
      // ignore errors when parsing the error message
    }

    throw new Error(`${errorMessage} (Request-ID: ${requestId})`);
  }

  const data = parser.response(await response.text());

  return {
    data,
    requestId,
  };
}
