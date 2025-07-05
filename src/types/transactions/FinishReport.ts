import type { ResponseCode } from '../Constants/ResponseCode';

/**
 * POST properties for the Finish Report endpoint.
 *
 * @interface FinishReport
 * @see https://report.cybertip.org/ispws/documentation/index.html#finish-the-report
 */
export interface FinishReport {
  /** Report ID of the report to finish. */
  id: number;
}

/**
 * Response properties for the Finish Report endpoint.
 */
export interface FinishReportResponse {
  /** The response code returned from the submittal. Response code 0 indicates successful report finish, any non-zero number is an error code. */
  responseCode: ResponseCode | number;
  /** Report ID of the finished report. */
  reportId: number;
  /** File IDs of the finished report */
  fileIds: Array<string>;
}
