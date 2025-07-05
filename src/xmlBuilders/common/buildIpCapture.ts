import { XMLBuilder } from 'fast-xml-parser';
import type { IpCapture } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildIpCapture = (
  ipCapture: IpCapture,
  keyName = 'ipCaptureEvent',
): string =>
  builder.build({
    [keyName]: {
      ipAddress: ipCapture.ipAddress,
      eventName: ipCapture.eventName,
      dateTime: ipCapture.dateTime?.toISOString(),
      possibleProxy: ipCapture.possibleProxy,
      port: ipCapture.port,
    },
  });
