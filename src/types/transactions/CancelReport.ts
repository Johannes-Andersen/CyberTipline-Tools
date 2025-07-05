import type { ResponseCode } from '../Constants/ResponseCode.js';

/**
 * POST properties for the Cancel Report endpoint.
 *
 * @interface CancelReport
 * @see https://report.cybertip.org/ispws/documentation/index.html#cancel-the-report
 */
export interface CancelReport {
  /** Report ID of the report to cancel. */
  id: number;
}

/**
 * Response properties for the Cancel Report endpoint.
 */
export interface CancelReportResponse {
  /** The response code returned from the submittal. Response code 0 indicates successful report cancellation, any non-zero number is an error code. */
  responseCode: ResponseCode | number;
  /** A description of the response code. */
  responseDescription: string;
  /** Report ID of the cancelled report. */
  reportId: number;
}
