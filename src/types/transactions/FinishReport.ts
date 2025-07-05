import type { ResponseCode } from '../Constants/ResponseCode';

/**
 * Finish Report endpoint request.
 *
 * Once all the files and file details are uploaded, the report must be finished to complete submission.
 * A request to finish a report requires the report ID of the report to finish.
 *
 * @interface FinishReport
 * @see https://report.cybertip.org/ispws/documentation/index.html#finish-the-report
 */
export interface FinishReport {
  /** Report ID of the report to finish. */
  id: number;
}

/**
 * Finish Report endpoint response.
 *
 * The server’s response will indicate whether the finish was successful, the report ID, and the list of file IDs for the report.
 */
export interface FinishReportResponse {
  /** The response code returned from the submittal. Response code 0 indicates successful report finish, any non-zero number is an error code. */
  responseCode: ResponseCode | number;
  /** Report ID of the finished report. */
  reportId: number;
  /** File IDs of the finished report */
  fileIds: Array<string>;
}
