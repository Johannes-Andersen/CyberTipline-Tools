import {
  type ClientConfig,
  Environment,
  type ResponseWrapper,
} from '../types/Client.js';
import type {
  CancelReport,
  CancelReportResponse,
  FinishReport,
  FinishReportResponse,
  GetStatusResponse,
  Report,
  ReportResponse,
  SubmitFileDetails,
  SubmitFileDetailsResponse,
  UploadFile,
  UploadFileResponse,
} from '../types/index.js';
import { makeApiRequest } from '../utils/apiRequest.js';
import {
  ensureDesiredReportState,
  ensureSuccessResponse,
} from '../utils/responseCode.js';
import { buildReport, buildSubmitFileDetails } from '../xmlBuilders/index.js';
import {
  parseCancelResponse,
  parseFinishResponse,
  parseGetStatus,
  parseResponseError,
  parseSubmitFileDetailsResponse,
  parseSubmitResponse,
  parseUploadResponse,
} from './responseParsers.js';

/**
 * Client for interacting with the CyberTipline API
 */
export class Client {
  private readonly baseUrl: string;
  private readonly auth: string;

  /**
   * Creates a new CyberTipline API client
   * @param config - Configuration options
   */
  constructor(config: ClientConfig) {
    // Set the base URL based on environment
    this.baseUrl =
      config.environment === Environment.Production
        ? 'https://report.cybertip.org/ispws'
        : 'https://exttest.cybertip.org/ispws';

    // Create basic auth header
    this.auth = Buffer.from(
      `${config.credentials.username}:${config.credentials.password}`,
    ).toString('base64');
  }

  /**
   * Verify that the client can connect to and authenticate with the server.
   * @returns Response indicating success/failure and user details
   * @throws Error if the request fails or if response indicates failure
   */
  async getStatus(): Promise<ResponseWrapper<GetStatusResponse>> {
    const response = await makeApiRequest<GetStatusResponse>(
      `${this.baseUrl}/status`,
      this.auth,
      { response: parseGetStatus, error: parseResponseError },
    );

    ensureSuccessResponse(response.data.responseCode);
    return response;
  }

  /**
   * Submit a new report to the CyberTipline
   * @param report - The report details to submit
   * @returns Response containing the report ID and status
   * @throws Error if the request fails or if response indicates failure
   */
  async submitReport(report: Report): Promise<ResponseWrapper<ReportResponse>> {
    const response = await makeApiRequest<ReportResponse>(
      `${this.baseUrl}/submit`,
      this.auth,
      { response: parseSubmitResponse, error: parseResponseError },
      {
        method: 'POST',
        body: buildReport(report),
      },
    );

    ensureSuccessResponse(response.data.responseCode);
    return response;
  }

  /**
   * Upload a file to be associated with a report
   * @param upload - The file upload details
   * @returns Response containing the file ID and status
   * @throws Error if the request fails or if response indicates failure
   */
  async uploadFile(
    upload: UploadFile,
  ): Promise<ResponseWrapper<UploadFileResponse>> {
    const formData = new FormData();

    formData.append('id', upload.id.toString());
    formData.append('file', upload.file);

    const response = await makeApiRequest<UploadFileResponse>(
      `${this.baseUrl}/upload`,
      this.auth,
      { response: parseUploadResponse, error: parseResponseError },
      {
        method: 'POST',
        body: formData,
      },
    );

    ensureSuccessResponse(response.data.responseCode);
    return response;
  }

  /**
   * Submit details about a previously uploaded file
   * @param details - The file details to submit
   * @returns Response indicating success/failure
   * @throws Error if the request fails or if response indicates failure
   */
  async submitFileDetails(
    details: SubmitFileDetails,
  ): Promise<ResponseWrapper<SubmitFileDetailsResponse>> {
    const response = await makeApiRequest<SubmitFileDetailsResponse>(
      `${this.baseUrl}/fileinfo`,
      this.auth,
      { response: parseSubmitFileDetailsResponse, error: parseResponseError },
      {
        method: 'POST',
        body: buildSubmitFileDetails(details),
      },
    );

    ensureSuccessResponse(response.data.responseCode);
    return response;
  }

  /**
   * Mark a report as finished, indicating no more files will be uploaded
   * @param finish - The finish report details
   * @returns Response indicating success/failure
   * @throws Error if the request fails or if response indicates failure
   */
  async finishReport(
    finish: FinishReport,
  ): Promise<ResponseWrapper<FinishReportResponse>> {
    const formData = new FormData();

    formData.append('id', finish.id.toString());

    const response = await makeApiRequest<FinishReportResponse>(
      `${this.baseUrl}/finish`,
      this.auth,
      { response: parseFinishResponse, error: parseResponseError },
      {
        method: 'POST',
        body: formData,
      },
    );

    ensureDesiredReportState(response.data.responseCode);
    return response;
  }

  /**
   * Cancel/retract a previously submitted report
   * @param cancel - The cancel report details
   * @returns Response indicating success/failure
   * @throws Error if the request fails or if response indicates failure
   */
  async cancelReport(
    cancel: CancelReport,
  ): Promise<ResponseWrapper<CancelReportResponse>> {
    const formData = new FormData();

    formData.append('id', cancel.id.toString());

    const response = await makeApiRequest<CancelReportResponse>(
      `${this.baseUrl}/retract`,
      this.auth,
      { response: parseCancelResponse, error: parseResponseError },
      {
        method: 'POST',
        body: formData,
      },
    );

    ensureDesiredReportState(response.data.responseCode);
    return response;
  }
}
