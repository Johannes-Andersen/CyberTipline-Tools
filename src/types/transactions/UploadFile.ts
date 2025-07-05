import type { ResponseCode } from '../Constants/ResponseCode';

/**
 * POST properties for the Upload File endpoint.
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
 * Response properties for the Upload File endpoint.
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
