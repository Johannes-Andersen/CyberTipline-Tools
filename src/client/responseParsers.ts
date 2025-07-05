import type {
  CancelReportResponse,
  FinishReportResponse,
  GetStatusResponse,
  ReportResponse,
  SubmitFileDetailsResponse,
  UploadFileResponse,
} from '../types';
import { parseXmlResponse } from '../utils/xmlResponseParser';

/**
 * Parses the XML response from the CyberTipline Finish Report endpoint into a strongly typed object
 *
 * The XML response follows this structure:
 * ```xml
 *   <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 *   <reportDoneResponse>
 *       <responseCode>0</responseCode>
 *       <reportId>4564654</reportId>
 *       <files>
 *           <fileId>b0754af766b426f2928a02c651ed4b99</fileId>
 *       </files>
 *   </reportDoneResponse>
 * ```
 *
 * @param xmlData - Raw XML response string from the API
 * @returns Parsed reportDoneResponse object with response code, description, and report ID
 * @throws Error if the XML is malformed or missing required properties
 */
export const parseFinishResponse = (xmlData: string): FinishReportResponse => {
  return parseXmlResponse<FinishReportResponse>(xmlData, {
    rootKey: 'reportDoneResponse',
    rules: [
      { key: 'responseCode', type: 'number', required: true },
      { key: 'reportId', type: 'number', required: true },
    ],
  });
};

/**
 * Parses the XML response from the CyberTipline Status endpoint into a strongly typed object
 *
 * The XML response follows this structure:
 * ```xml
 *   <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 *   <reportResponse>
 *       <responseCode>0</responseCode>
 *       <responseDescription>
 *         Remote User : {username}, Remote Ip : {ip address}
 *       </responseDescription>
 *   </reportResponse>
 * ```
 *
 * @param xmlData - Raw XML response string from the API
 * @returns Parsed GetStatusResponse object with response code and description
 * @throws Error if the XML is malformed or missing required properties
 */
export const parseGetStatus = (xmlData: string): GetStatusResponse => {
  return parseXmlResponse<GetStatusResponse>(xmlData, {
    rootKey: 'reportResponse',
    rules: [
      { key: 'responseCode', type: 'number', required: true },
      { key: 'responseDescription', type: 'string', required: true },
    ],
  });
};

/**
 * Parses the XML response from the CyberTipline Status endpoint into a strongly typed object
 *
 * The XML response follows this structure:
 * ```xml
 *   <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 *   <reportResponse>
 *       <responseCode>0</responseCode>
 *       <responseDescription>
 *         Remote User : {username}, Remote Ip : {ip address}
 *       </responseDescription>
 *   </reportResponse>
 * ```
 *
 * @param xmlData - Raw XML response string from the API
 * @returns Parsed GetStatusResponse object with response code and description
 * @throws Error if the XML is malformed or missing required properties
 */
export const parseResponseError = (xmlData: string): GetStatusResponse => {
  return parseXmlResponse<GetStatusResponse>(xmlData, {
    rootKey: 'reportResponse',
    rules: [
      { key: 'responseCode', type: 'number', required: true },
      { key: 'responseDescription', type: 'string', required: true },
    ],
  });
};

/**
 * Parses the XML response from the CyberTipline Submit Report endpoint into a strongly typed object
 *
 * The XML response follows this structure:
 * ```xml
 *  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 *  <reportResponse>
 *      <responseCode>0</responseCode>
 *      <responseDescription>Success</responseDescription>
 *      <reportId>4564654</reportId>
 *  </reportResponse>
 * ```
 *
 * @param xmlData - Raw XML response string from the API
 * @returns Parsed ReportResponse object with response code, description, and report ID
 * @throws Error if the XML is malformed or missing required properties
 */
export const parseSubmitResponse = (xmlData: string): ReportResponse => {
  return parseXmlResponse<ReportResponse>(xmlData, {
    rootKey: 'reportResponse',
    rules: [
      { key: 'responseCode', type: 'number', required: true },
      { key: 'responseDescription', type: 'string', required: true },
      { key: 'reportId', type: 'number', required: true },
    ],
  });
};

/**
 * Parses the XML response from the CyberTipline Upload File endpoint into a strongly typed object
 *
 * The XML response follows this structure:
 * ```xml
 *  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 *  <reportResponse>
 *      <responseCode>0</responseCode>
 *      <responseDescription>Success</responseDescription>
 *      <reportId>4564654</reportId>
 *      <fileId>b0754af766b426f2928a02c651ed4b99</fileId>
 *      <hash>fafa5efeaf3cbe3b23b2748d13e629a1</hash>
 *  </reportResponse>
 * ```
 *
 * @param xmlData - Raw XML response string from the API
 * @returns Parsed ReportResponse object with response code, description, and report ID
 * @throws Error if the XML is malformed or missing required properties
 */
export const parseUploadResponse = (xmlData: string): UploadFileResponse => {
  return parseXmlResponse<UploadFileResponse>(xmlData, {
    rootKey: 'reportResponse',
    rules: [
      { key: 'responseCode', type: 'number', required: true },
      { key: 'responseDescription', type: 'string', required: true },
      { key: 'reportId', type: 'number', required: true },
      { key: 'fileId', type: 'string', required: true },
      { key: 'hash', type: 'string', required: false },
    ],
  });
};

/**
 * Parses the XML response from the CyberTipline Submit File Details endpoint into a strongly typed object
 *
 * The XML response follows this structure:
 * ```xml
 *  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 *  <reportResponse>
 *      <responseCode>0</responseCode>
 *      <responseDescription>Success</responseDescription>
 *      <reportId>4564654</reportId>
 *  </reportResponse>
 * ```
 *
 * @param xmlData - Raw XML response string from the API
 * @returns Parsed ReportResponse object with response code, description, and report ID
 * @throws Error if the XML is malformed or missing required properties
 */
export const parseSubmitFileDetailsResponse = (
  xmlData: string,
): SubmitFileDetailsResponse => {
  return parseXmlResponse<SubmitFileDetailsResponse>(xmlData, {
    rootKey: 'reportResponse',
    rules: [
      { key: 'responseCode', type: 'number', required: true },
      { key: 'responseDescription', type: 'string', required: true },
      { key: 'reportId', type: 'number', required: true },
    ],
  });
};

/**
 * Parses the XML response from the CyberTipline Upload File endpoint into a strongly typed object
 *
 * The XML response follows this structure:
 * ```xml
 *  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 *  <reportResponse>
 *      <responseCode>0</responseCode>
 *      <responseDescription>Success</responseDescription>
 *      <reportId>4564654</reportId>
 *  </reportResponse>
 * ```
 *
 * @param xmlData - Raw XML response string from the API
 * @returns Parsed ReportResponse object with response code, description, and report ID
 * @throws Error if the XML is malformed or missing required properties
 */
export const parseCancelResponse = (xmlData: string): CancelReportResponse => {
  return parseXmlResponse<CancelReportResponse>(xmlData, {
    rootKey: 'reportResponse',
    rules: [
      { key: 'responseCode', type: 'number', required: true },
      { key: 'responseDescription', type: 'string', required: true },
      { key: 'reportId', type: 'number', required: true },
    ],
  });
};
