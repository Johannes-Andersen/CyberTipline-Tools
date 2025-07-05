import type { ResponseCode } from '../Constants/ResponseCode.js';

/**
 * Cancel Report endpoint request.
 *
 * Before the report is finished, it may be cancelled if the reporter encounters an error during submission.
 * A request to cancel a report requires the report ID of the report to cancel.
 *
 * @interface CancelReport
 * @see https://report.cybertip.org/ispws/documentation/index.html#cancel-the-report
 */
export interface CancelReport {
  /** Report ID of the report to cancel. */
  id: number;
}

/**
 * Cancel Report endpoint response.
 *
 * The server’s response will indicate whether the cancel was successful and the report ID of the cancelled report.
 */
export interface CancelReportResponse {
  /** The response code returned from the submittal. Response code 0 indicates successful report cancellation, any non-zero number is an error code. */
  responseCode: ResponseCode | number;
  /** A description of the response code. */
  responseDescription: string;
  /** Report ID of the cancelled report. */
  reportId: number;
}
