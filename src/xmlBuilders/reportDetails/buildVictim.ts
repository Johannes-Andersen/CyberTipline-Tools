import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { Victim } from '../../types';
import { buildDeviceId } from '../common/buildDeviceId';
import { buildEstimatedLocation } from '../common/buildEstimatedLocation';
import { buildIpCapture } from '../common/buildIpCapture';
import { buildPerson } from '../common/buildPerson';

const parser = new XMLParser({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  allowBooleanAttributes: true,
});

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildVictim = (victim: Victim, keyName = 'victim'): string => {
  const { estimatedLocation, deviceId, ipCaptureEvent, victimPerson } = victim;

  const deviceIds = deviceId?.map(
    (e) => parser.parse(buildDeviceId(e)).deviceId,
  );
  const ipCaptureEvents = ipCaptureEvent?.map(
    (e) => parser.parse(buildIpCapture(e)).ipCaptureEvent,
  );
  const estimatedLocations = estimatedLocation
    ? parser.parse(buildEstimatedLocation(estimatedLocation)).estimatedLocation
    : undefined;
  const person = parser.parse(buildPerson(victimPerson)).person;

  return builder.build({
    [keyName]: {
      victimPerson: person,
      espIdentifier: victim.espIdentifier,
      espService: victim.espService,
      screenName: victim.screenName,
      displayName: victim.displayName,
      profileUrl: victim.profileUrl,
      ipCaptureEvent: ipCaptureEvents,
      deviceId: deviceIds,
      schoolName: victim.schoolName,
      priorCTReports: victim.priorCTReports,
      estimatedLocation: estimatedLocations,
      additionalInfo: victim.additionalInfo,
    },
  });
};
