import { XMLBuilder } from 'fast-xml-parser';
import type { DeviceId } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildDeviceId = (
  deviceId: DeviceId,
  keyName = 'deviceId',
): string =>
  builder.build({
    [keyName]: {
      idType: deviceId.idType,
      idValue: deviceId.idValue,
      eventName: deviceId.eventName,
      dateTime: deviceId.dateTime?.toISOString(),
    },
  });
