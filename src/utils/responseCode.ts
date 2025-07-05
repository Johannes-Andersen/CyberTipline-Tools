import { ResponseCode } from '../types/Constants/ResponseCode';

/**
 * A mapping between `ResponseCode` value and their corresponding
 * descriptive message and a matching HTTP status code.
 */

export const errorDetailsByCode: Record<
  ResponseCode | number,
  { message: string; httpStatus: number }
> = {
  [ResponseCode.Success]: { message: 'Success', httpStatus: 200 },
  [ResponseCode.ServerError]: { message: 'Server error', httpStatus: 500 },
  [ResponseCode.SaveFailed]: { message: 'Save failed', httpStatus: 500 },
  [ResponseCode.UploadFailed]: { message: 'Upload failed', httpStatus: 500 },
  [ResponseCode.FileUploadFailed]: {
    message: 'File upload failed',
    httpStatus: 500,
  },
  [ResponseCode.ResourceNotFound]: {
    message: 'Resource not found',
    httpStatus: 404,
  },
  [ResponseCode.UpdateFailed]: { message: 'Update failed', httpStatus: 500 },
  [ResponseCode.AuthenticationRequired]: {
    message: 'Authentication required',
    httpStatus: 401,
  },
  [ResponseCode.NotAuthorized]: {
    message: 'User is not authorized to perform this action',
    httpStatus: 403,
  },
  [ResponseCode.NotAuthorizedForSubmissions]: {
    message: 'User does not have authorization to make submissions',
    httpStatus: 403,
  },
  [ResponseCode.NotAuthorizedForUpdates]: {
    message: 'User does not have authorization to make updates',
    httpStatus: 403,
  },
  [ResponseCode.InvalidRequest]: {
    message: 'Invalid request',
    httpStatus: 400,
  },
  [ResponseCode.ValidationFailed]: {
    message: 'Validation failed',
    httpStatus: 422,
  },
  [ResponseCode.MalformedXmlSubmittal]: {
    message: 'Malformed XML submittal',
    httpStatus: 400,
  },
  [ResponseCode.MalformedFileSubmittal]: {
    message: 'Malformed file submittal',
    httpStatus: 400,
  },
  [ResponseCode.ReportDoesNotExist]: {
    message: 'Report does not exist',
    httpStatus: 404,
  },
  [ResponseCode.FileDoesNotExist]: {
    message: 'File does not exist',
    httpStatus: 404,
  },
  [ResponseCode.ReportAlreadyRetracted]: {
    message: 'Report already retracted',
    httpStatus: 409,
  },
  [ResponseCode.ReportAlreadyFinished]: {
    message: 'Report already finished',
    httpStatus: 409,
  },
};

/**
 * Resolves a response code given by the API to a human-readable error messages
 *
 * @param {ResponseCode | number} responseCode - The response code to retrieve details for.
 * @returns {{ message: string; httpStatus: number }} An object containing the error message
 * with and a matching HTTP status code.
 */
export const resolveResponseCode = (
  responseCode: ResponseCode | number,
): { message: string; httpStatus: number } => {
  return (
    errorDetailsByCode[responseCode] || {
      message: 'Unknown error',
      httpStatus: 500,
    }
  );
};

/**
 * Throws an error if the response code is not `ResponseCode.Success`.
 *
 * @param {ResponseCode | number} responseCode - The response code to validate.
 */
export const ensureSuccessResponse = (
  responseCode: ResponseCode | number,
): void => {
  if (responseCode === ResponseCode.Success) return;

  const { message } = resolveResponseCode(responseCode);
  throw new Error(message);
};

/**
 * Throws an error if the an action isn't completed successfully.
 *
 * This allows `Report already finished` and `Report already retracted` to be treated as successful.
 * Since the report is already in the desired state, there would be no need to throw an error.
 *
 * @param {ResponseCode | number} responseCode - The response code to validate.
 */
export const ensureDesiredReportState = (
  responseCode: ResponseCode | number,
): void => {
  if (
    responseCode === ResponseCode.Success ||
    responseCode === ResponseCode.ReportAlreadyFinished ||
    responseCode === ResponseCode.ReportAlreadyRetracted
  )
    return;

  const { message } = resolveResponseCode(responseCode);
  throw new Error(message);
};
