import type { ResponseCode } from '../../index.js';
import type { FileAnnotations } from '../Constants/FileAnnotations.js';
import type { FileRelevance } from '../Constants/FileRelevance.js';
import type { IndustryClassification } from '../Constants/IndustryClassification.js';
import type { DeviceId } from '../common/DeviceId.js';
import type { IpCapture } from '../common/IpCapture.js';
import type { FileDetails } from '../fileDetails/FileDetails.js';
import type { OriginalFileHash } from '../fileDetails/OriginalFileHash.js';

/**
 * POST properties for the Submit File Details endpoint.
 *
 * @interface SubmitFileDetails
 * @see https://report.cybertip.org/ispws/documentation/index.html#submit-file-details
 */
export interface SubmitFileDetails {
  /** The report ID to which the uploaded file is associated. */
  reportId: number;
  /** The ID of the file to which the annotations should be associated. */
  fileId: string;
  /** The stored name of the file. */
  fileName?: string;
  /** The original filename associated with the file when it was uploaded to the company's servers by the reported user or person. */
  originalFileName?: string;
  /** The URL where file was originally located. */
  locationOfFile?: string;
  /** Whether the reporting company viewed the entire contents of the file being reported to NCMEC. */
  fileViewedByEsp?: boolean;
  /** Whether the reporting company viewed the EXIF for the file being reported to NCMEC. */
  exifViewedByEsp?: boolean;
  /** Whether the entire contents of the file were publicly accessible to online users. */
  publiclyAvailable?: boolean;
  /** The relevance or relation of the file to the report. Unless specified otherwise, a file is "Reported" by default. */
  fileRelevance?: FileRelevance;
  /** Tags to describe the file. */
  fileAnnotations?: Partial<Record<FileAnnotations, boolean>>;
  /** A categorization from the ESP-designated categorization scale. */
  industryClassification?: IndustryClassification;
  /** The original binary hash value of the file at the time it was uploaded by the reported user or person (prior to any potential modification by the reporter). */
  originalFileHash?: Array<OriginalFileHash>;
  /** An IP address associated with the file. */
  ipCaptureEvent?: IpCapture;
  /** IDs for devices associated with the file. */
  deviceId?: Array<DeviceId>;
  /** Metadata associated with the file. */
  details?: Array<FileDetails>;
  /** Additional information about this file not covered by any other section. */
  additionalInfo?: Array<string>;
}

/**
 * Response properties for the Submit File Details endpoint.
 */
export interface SubmitFileDetailsResponse {
  /** The response code returned from the submittal. 0 is success, any non-zero number is an error code. */
  responseCode: ResponseCode | number;
  /** A description of the response code. */
  responseDescription: string;
  /** The report ID to which this response is related. */
  reportId: number;
}
