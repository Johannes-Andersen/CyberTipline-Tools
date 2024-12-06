import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { IntendedRecipient } from '../../types';
import { buildDeviceId } from '../common/buildDeviceId';
import { buildEstimatedLocation } from '../common/buildEstimatedLocation';
import { buildIpCapture } from '../common/buildIpCapture';
import { buildPerson } from '../common/buildPerson';

const parser = new XMLParser({
  ignoreAttributes: false,
  allowBooleanAttributes: true,
  attributeNamePrefix: '@_',
});

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildIntendedRecipient = (
  intendedRecipient: IntendedRecipient,
  keyName = 'intendedRecipient',
): string => {
  const {
    estimatedLocation,
    deviceId,
    ipCaptureEvent,
    intendedRecipientPerson,
    accountPermanentlyDisabled,
    accountTemporarilyDisabled,
    ...rest
  } = intendedRecipient;

  const deviceIds = deviceId?.map(
    (e) => parser.parse(buildDeviceId(e)).deviceId,
  );
  const ipCaptureEvents = ipCaptureEvent?.map(
    (e) => parser.parse(buildIpCapture(e)).ipCaptureEvent,
  );
  const estimatedLocations = estimatedLocation
    ? parser.parse(buildEstimatedLocation(estimatedLocation)).estimatedLocation
    : undefined;
  const person = intendedRecipientPerson
    ? parser.parse(buildPerson(intendedRecipientPerson)).person
    : undefined;

  return builder.build({
    [keyName]: {
      deviceId: deviceIds,
      ipCaptureEvent: ipCaptureEvents,
      estimatedLocation: estimatedLocations,
      intendedRecipientPerson: person,
      accountPermanentlyDisabled: accountPermanentlyDisabled
        ? {
            '#text': !!accountPermanentlyDisabled,
            '@_disabledDate':
              typeof accountPermanentlyDisabled === 'object'
                ? accountPermanentlyDisabled?.disabledDate?.toISOString()
                : undefined,
          }
        : undefined,
      accountTemporarilyDisabled: accountTemporarilyDisabled
        ? {
            '#text': !!accountTemporarilyDisabled,
            '@_disabledDate':
              typeof accountTemporarilyDisabled === 'object'
                ? accountTemporarilyDisabled?.disabledDate?.toISOString()
                : undefined,
            '@_reenabledDate':
              typeof accountTemporarilyDisabled === 'object'
                ? accountTemporarilyDisabled.reenabledDate?.toISOString()
                : undefined,
          }
        : undefined,
      ...rest,
    },
  });
};