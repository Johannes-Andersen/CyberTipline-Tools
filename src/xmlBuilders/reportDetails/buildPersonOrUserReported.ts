import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { PersonOrUserReported } from '../../types';
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

export const buildPersonOrUserReported = (
  personOrUserReported: PersonOrUserReported,
  keyName = 'personOrUserReported',
): string => {
  const {
    estimatedLocation,
    personOrUserReportedPerson,
    deviceId,
    ipCaptureEvent,
    ...rest
  } = personOrUserReported;

  const deviceIds = deviceId?.map(
    (e) => parser.parse(buildDeviceId(e)).deviceId,
  );
  const ipCaptureEvents = ipCaptureEvent?.map(
    (e) => parser.parse(buildIpCapture(e)).ipCaptureEvent,
  );
  const estimatedLocations = estimatedLocation
    ? parser.parse(buildEstimatedLocation(estimatedLocation)).estimatedLocation
    : undefined;
  const person = personOrUserReportedPerson
    ? parser.parse(buildPerson(personOrUserReportedPerson)).person
    : undefined;

  return builder.build({
    [keyName]: {
      deviceId: deviceIds,
      ipCaptureEvent: ipCaptureEvents,
      estimatedLocation: estimatedLocations,
      personOrUserReportedPerson: person,
      ...rest,
    },
  });
};