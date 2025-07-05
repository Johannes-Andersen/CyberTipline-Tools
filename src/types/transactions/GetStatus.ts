import type { ResponseCode } from '../Constants/ResponseCode';

/**
 * GET Status endpoint response.
 */
export interface GetStatusResponse {
  /** The response code returned from the status check. Response code 0 indicates success, any non-zero number is an error code. */
  responseCode: ResponseCode | number;
  /** A description of the response code. */
  responseDescription: string;
}
