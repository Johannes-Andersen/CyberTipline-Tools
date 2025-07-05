import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { SubmitFileDetails } from '../../types';
import { buildDeviceId } from '../common/buildDeviceId';
import { buildIpCapture } from '../common/buildIpCapture';
import { buildFileDetails } from '../fileDetails/buildFileDetails';
import { buildOriginalFileHash } from '../fileDetails/buildOriginalFileHash';

const parser = new XMLParser({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  allowBooleanAttributes: true,
});

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
  suppressEmptyNode: true,
  processEntities: false,
});

export const buildSubmitFileDetails = (
  fileDetails: SubmitFileDetails,
  keyName = 'fileDetails',
): string => {
  const { originalFileHash, ipCaptureEvent, deviceId, details } = fileDetails;

  const originalFileHashes = originalFileHash?.map(
    (e) => parser.parse(buildOriginalFileHash(e)).originalFileHash,
  );
  const deviceIds = deviceId?.map(
    (e) => parser.parse(buildDeviceId(e)).deviceId,
  );
  const ipCaptureEvents = ipCaptureEvent
    ? parser.parse(buildIpCapture(ipCaptureEvent)).ipCaptureEvent
    : undefined;
  const detail = details?.map((e) => parser.parse(buildFileDetails(e)).details);

  return builder.build({
    '?xml': {
      '@_version': '1.0',
      '@_encoding': 'UTF-8',
    },
    [keyName]: {
      '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@_xsi:noNamespaceSchemaLocation':
        'https://report.cybertip.org/ispws/xsd',
      reportId: fileDetails.reportId,
      fileId: fileDetails.fileId,
      originalFileName: fileDetails.originalFileName,
      locationOfFile: fileDetails.locationOfFile,
      fileViewedByEsp: fileDetails.fileViewedByEsp,
      exifViewedByEsp: fileDetails.exifViewedByEsp,
      publiclyAvailable: fileDetails.publiclyAvailable,
      fileRelevance: fileDetails.fileRelevance,
      fileAnnotations: Object.fromEntries(
        Object.entries(fileDetails.fileAnnotations ?? {})
          .filter(([_, value]) => value)
          .map(([key]) => [key, '']),
      ),
      industryClassification: fileDetails.industryClassification,
      originalFileHash: originalFileHashes,
      ipCaptureEvent: ipCaptureEvents,
      deviceId: deviceIds,
      details: detail,
      additionalInfo: fileDetails.additionalInfo,
    },
  });
};
