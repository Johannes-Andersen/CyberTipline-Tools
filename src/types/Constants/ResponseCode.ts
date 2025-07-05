/**
 * The response code returned from the submittal. 0 is success, any non-zero number is an error code.
 *
 * The following is a non-exhaustive list of possible error codes.
 * @see https://report.cybertip.org/ispws/documentation/index.html#report-response
 */
export enum ResponseCode {
  /** Success */
  Success = 0,
  /** Server error */
  ServerError = 1000,
  /** Save failed */
  SaveFailed = 1100,
  /** Upload failed */
  UploadFailed = 1110,
  /** File upload failed */
  FileUploadFailed = 1111,
  /** Resource not found */
  ResourceNotFound = 1210,
  /** Update failed */
  UpdateFailed = 1300,
  /** Authentication required */
  AuthenticationRequired = 2000,
  /** User is not authorized to perform this action */
  NotAuthorized = 3000,
  /** User does not have authorization to make submissions */
  NotAuthorizedForSubmissions = 3100,
  /** User does not have authorization to make updates */
  NotAuthorizedForUpdates = 3300,
  /** Invalid request */
  InvalidRequest = 4000,
  /** Validation failed */
  ValidationFailed = 4100,
  /** Malformed XML submittal */
  MalformedXmlSubmittal = 4110,
  /** Malformed file submittal */
  MalformedFileSubmittal = 4200,
  /** Report does not exist */
  ReportDoesNotExist = 5001,
  /** File does not exist */
  FileDoesNotExist = 5002,
  /** Report already retracted */
  ReportAlreadyRetracted = 5101,
  /** Report already finished */
  ReportAlreadyFinished = 5102,
}
