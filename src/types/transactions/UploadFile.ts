import type { ResponseCode } from '../Constants/ResponseCode';

/**
 * Upload File endpoint response.
 *
 * @interface UploadFile
 * @see https://report.cybertip.org/ispws/documentation/index.html#upload-a-file
 */
export interface UploadFile {
  /** The report ID to which the uploaded file should be associated. */
  id: number;
  /** The actual file being uploaded */
  file: File;
}

/**
 * Upload File endpoint response
 *
 * The server’s response will indicate whether the file upload was successful and, if so, the file ID and MD5 hash of the uploaded file.
 *
 * The file ID is used to submit file details for the uploaded file. The MD5 hash can be used to verify that the complete file was received.
 */
export interface UploadFileResponse {
  /** The response code returned from the submittal. 0 is success, any non-zero number is an error code. */
  responseCode: ResponseCode | number;
  /** A description of the response code. */
  responseDescription: string;
  /** The report ID to which this response is related. */
  reportId: number;
  /** If a file was successfully uploaded, the file ID for the file. */
  fileId: string;
  /** If a file was successfully uploaded, the MD5 hash of the file. */
  hash?: string;
}
