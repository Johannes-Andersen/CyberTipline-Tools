import type { ResponseCode } from '../Constants/ResponseCode';

/**
 * Response properties for the GET Status endpoint.
 */
export interface GetStatusResponse {
  /** The response code returned from the submittal. Response code 0 indicates success, any non-zero number is an error code. */
  responseCode: ResponseCode | number;
  /** A description of the response code. */
  responseDescription: string;
}
